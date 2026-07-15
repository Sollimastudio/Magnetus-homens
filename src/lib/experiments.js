import {
  EXPERIMENTS,
  EXPERIMENT_STATUS,
  getActiveExperimentDefinition,
} from '../config/experiments.js';

const VISITOR_STORAGE_KEY = 'magnetus_experiment_visitor_v1';
const ASSIGNMENT_STORAGE_PREFIX = 'magnetus_experiment_assignment';
const MAX_CHECKOUT_TAG_LENGTH = 120;

function createId() {
  return globalThis.crypto?.randomUUID?.()
    ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function getBrowserStorage() {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function safeStorageGet(storage, key) {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeStorageSet(storage, key, value) {
  try {
    storage?.setItem(key, value);
  } catch {
    // A falha de armazenamento não pode interromper a página de vendas.
  }
}

function getOrCreateVisitorId(storage, idFactory) {
  const existingId = safeStorageGet(storage, VISITOR_STORAGE_KEY);
  if (existingId) return existingId;

  const visitorId = idFactory();
  safeStorageSet(storage, VISITOR_STORAGE_KEY, visitorId);
  return visitorId;
}

export function hashExperimentKey(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function chooseVariant(definition, bucket) {
  const variants = Object.entries(definition.variants);
  const totalWeight = variants.reduce((total, [, variant]) => total + variant.weight, 0);
  let cursor = 0;

  for (const [variantId, variant] of variants) {
    cursor += variant.weight / totalWeight;
    if (bucket < cursor) return variantId;
  }

  return variants.at(-1)?.[0] ?? null;
}

function getPreviewDefinition(search) {
  const parameters = new URLSearchParams(search);
  const experimentId = parameters.get('exp_preview');
  const variantId = parameters.get('exp_variant');
  const definition = EXPERIMENTS[experimentId];

  if (!definition || !definition.previewable || definition.status === EXPERIMENT_STATUS.blocked) {
    return null;
  }

  if (!variantId || !definition.variants[variantId]) return null;
  return { definition, variantId };
}

export function resolveActiveExperiment({
  search = typeof window === 'undefined' ? '' : window.location.search,
  storage = getBrowserStorage(),
  idFactory = createId,
} = {}) {
  const preview = getPreviewDefinition(search);
  const definition = preview?.definition ?? getActiveExperimentDefinition();
  if (!definition) return null;

  if (preview) {
    return {
      id: definition.id,
      version: definition.version,
      variant: preview.variantId,
      bucket: null,
      assignmentSource: 'preview',
      isPreview: true,
      values: definition.variants[preview.variantId].values,
    };
  }

  const visitorId = getOrCreateVisitorId(storage, idFactory);
  const bucket = hashExperimentKey(`${visitorId}:${definition.id}:v${definition.version}`) / 2 ** 32;
  const assignmentKey = `${ASSIGNMENT_STORAGE_PREFIX}:${definition.id}:v${definition.version}`;
  const storedVariant = safeStorageGet(storage, assignmentKey);
  const variant = definition.variants[storedVariant]
    ? storedVariant
    : chooseVariant(definition, bucket);

  if (!storedVariant && variant) safeStorageSet(storage, assignmentKey, variant);

  return {
    id: definition.id,
    version: definition.version,
    variant,
    bucket: Math.floor(bucket * 10_000),
    assignmentSource: storedVariant ? 'persisted' : 'deterministic',
    isPreview: false,
    values: definition.variants[variant].values,
  };
}

export function getExperimentAnalyticsContext(experiment) {
  if (!experiment) return {};

  return {
    experiment_id: experiment.id,
    experiment_variant: experiment.variant,
    experiment_version: experiment.version,
    experiment_bucket: experiment.bucket ?? -1,
    experiment_assignment: experiment.assignmentSource,
    experiment_preview: experiment.isPreview,
  };
}

export function getExperimentCheckoutTracking(experiment, currentTracking = {}) {
  if (!experiment || experiment.isPreview || currentTracking.s3) return {};

  const tag = `exp.${experiment.id}.v${experiment.version}.${experiment.variant}`;
  return { s3: tag.slice(0, MAX_CHECKOUT_TAG_LENGTH) };
}
