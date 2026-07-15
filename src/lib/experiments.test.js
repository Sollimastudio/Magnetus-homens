import assert from 'node:assert/strict';
import test from 'node:test';
import { EXPERIMENTS, getActiveExperimentDefinition } from '../config/experiments.js';
import {
  getExperimentAnalyticsContext,
  getExperimentCheckoutTracking,
  resolveActiveExperiment,
} from './experiments.js';

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test('keeps exactly one experiment active', () => {
  const activeExperiment = getActiveExperimentDefinition();

  assert.equal(activeExperiment.id, 'headline_presence_loss');
  assert.equal(
    Object.values(EXPERIMENTS).filter((experiment) => experiment.status === 'active').length,
    1,
  );
});

test('persists a stable assignment for the same visitor', () => {
  const storage = createStorage();
  const options = { storage, idFactory: () => 'visitor-stable', search: '' };

  const firstAssignment = resolveActiveExperiment(options);
  const secondAssignment = resolveActiveExperiment(options);

  assert.equal(firstAssignment.variant, secondAssignment.variant);
  assert.equal(secondAssignment.assignmentSource, 'persisted');
  assert.equal(firstAssignment.id, 'headline_presence_loss');
});

test('allows explicit QA preview only for ready experiments and labels it as preview', () => {
  const preview = resolveActiveExperiment({
    storage: createStorage(),
    search: '?exp_preview=cta_protocol_vs_result&exp_variant=result',
  });

  assert.equal(preview.id, 'cta_protocol_vs_result');
  assert.equal(preview.variant, 'result');
  assert.equal(preview.isPreview, true);
  assert.equal(getExperimentAnalyticsContext(preview).experiment_preview, true);
});

test('does not allow blocked proof or discount experiments to be previewed', () => {
  const experiment = resolveActiveExperiment({
    storage: createStorage(),
    idFactory: () => 'visitor-fallback',
    search: '?exp_preview=offer_real_discount&exp_variant=discount',
  });

  assert.equal(experiment.id, 'headline_presence_loss');
  assert.equal(experiment.isPreview, false);
});

test('adds the experiment to Kiwify s3 only when the campaign has not occupied it', () => {
  const experiment = resolveActiveExperiment({
    storage: createStorage(),
    idFactory: () => 'visitor-checkout',
    search: '',
  });

  assert.match(getExperimentCheckoutTracking(experiment).s3, /^exp\.headline_presence_loss\.v1\./);
  assert.deepEqual(getExperimentCheckoutTracking(experiment, { s3: 'campaign-segment' }), {});
  assert.deepEqual(getExperimentCheckoutTracking({ ...experiment, isPreview: true }), {});
});
