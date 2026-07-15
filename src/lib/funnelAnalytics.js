import { track } from '@vercel/analytics';
import { PRODUCT } from '../config/product';
import { captureAttribution, getActiveTrackingParameters } from './attribution';

const SESSION_STORAGE_KEY = 'magnetus_session_id_v1';
const EXPOSURE_STORAGE_PREFIX = 'magnetus_experiment_exposure';
const viewedSections = new Set();
let initialized = false;
let activeExperimentContext = {};

function getSessionId() {
  if (typeof window === 'undefined') return 'server';

  try {
    const existingSessionId = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existingSessionId) return existingSessionId;

    const sessionId = window.crypto?.randomUUID?.()
      ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    return sessionId;
  } catch {
    return 'storage_unavailable';
  }
}

function getBaseProperties() {
  return {
    product: PRODUCT.id,
    product_name: PRODUCT.canonicalName,
    product_price: PRODUCT.price,
    currency: PRODUCT.currency,
    path: typeof window === 'undefined' ? '/' : window.location.pathname,
    session_id: getSessionId(),
    ...getActiveTrackingParameters(),
    ...activeExperimentContext,
  };
}

function sendFirstPartyLog(event, properties) {
  if (typeof window === 'undefined' || !import.meta.env.PROD) return;

  const body = JSON.stringify({ event, properties });

  if (window.navigator.sendBeacon) {
    const queued = window.navigator.sendBeacon(
      '/api/funnel-event',
      new Blob([body], { type: 'application/json' }),
    );
    if (queued) return;
  }

  window.fetch('/api/funnel-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Measurement failure must not interrupt navigation or checkout.
  });
}

export function trackFunnelEvent(event, properties = {}) {
  const eventProperties = { ...getBaseProperties(), ...properties };

  try {
    track(event, eventProperties);
  } catch {
    // Ad blockers and network failures must not break the sales page.
  }

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...eventProperties });
  }

  sendFirstPartyLog(event, eventProperties);

  if (import.meta.env.DEV) {
    console.info('[funnel]', event, eventProperties);
  }
}

function trackExperimentExposure() {
  const experimentId = activeExperimentContext.experiment_id;
  if (!experimentId || typeof window === 'undefined') return;

  const exposureKey = `${EXPOSURE_STORAGE_PREFIX}:${experimentId}:v${activeExperimentContext.experiment_version}:${activeExperimentContext.experiment_variant}:${activeExperimentContext.experiment_preview}`;

  try {
    if (window.sessionStorage.getItem(exposureKey)) return;
    window.sessionStorage.setItem(exposureKey, '1');
  } catch {
    // Sem sessionStorage, a exposição ainda é registrada nesta visualização.
  }

  trackFunnelEvent('experiment_exposure');
}

export function initializeFunnelAnalytics(experimentContext = {}) {
  activeExperimentContext = experimentContext;
  captureAttribution();

  if (!initialized) {
    initialized = true;
    trackFunnelEvent('landing_view');
  }

  trackExperimentExposure();
}

export function trackCtaClick({ location, destination, checkoutExperimentTagged }) {
  trackFunnelEvent('cta_click', {
    cta_location: location,
    destination,
    ...(typeof checkoutExperimentTagged === 'boolean'
      ? { checkout_experiment_tagged: checkoutExperimentTagged }
      : {}),
  });
}

export function trackFaqOpened({ index, question }) {
  trackFunnelEvent('faq_open', {
    faq_index: index,
    faq_question: question.slice(0, 120),
  });
}

export function observeFunnelSections(sectionIds) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || viewedSections.has(entry.target.id)) return;
        viewedSections.add(entry.target.id);
        trackFunnelEvent('section_view', { section: entry.target.id });
      });
    },
    { threshold: 0.35 },
  );

  sectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) observer.observe(section);
  });

  return () => observer.disconnect();
}
