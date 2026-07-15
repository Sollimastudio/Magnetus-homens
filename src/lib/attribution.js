const ATTRIBUTION_STORAGE_KEY = 'magnetus_attribution_v1';
const MAX_PARAMETER_LENGTH = 120;

export const KIWIFY_TRACKING_PARAMETERS = Object.freeze([
  'src',
  'sck',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  's1',
  's2',
  's3',
]);

const hasParameters = (parameters) => Object.keys(parameters).length > 0;

const sanitizeParameter = (value) => value.trim().slice(0, MAX_PARAMETER_LENGTH);

export function extractTrackingParameters(search = '') {
  const searchParameters = new URLSearchParams(search);

  return KIWIFY_TRACKING_PARAMETERS.reduce((parameters, key) => {
    const value = searchParameters.get(key);
    if (!value) return parameters;

    const sanitizedValue = sanitizeParameter(value);
    if (sanitizedValue) parameters[key] = sanitizedValue;
    return parameters;
  }, {});
}

function readStoredAttribution() {
  if (typeof window === 'undefined') return null;

  try {
    const storedValue = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
}

function writeStoredAttribution(attribution) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Measurement must never block the purchase journey.
  }
}

export function captureAttribution() {
  if (typeof window === 'undefined') return { firstTouch: {}, lastTouch: {} };

  const currentParameters = extractTrackingParameters(window.location.search);
  const storedAttribution = readStoredAttribution();
  const hasCurrentParameters = hasParameters(currentParameters);

  const attribution = {
    firstTouch: hasParameters(storedAttribution?.firstTouch ?? {})
      ? storedAttribution.firstTouch
      : currentParameters,
    lastTouch: hasCurrentParameters
      ? currentParameters
      : storedAttribution?.lastTouch ?? storedAttribution?.firstTouch ?? {},
    firstCapturedAt:
      storedAttribution?.firstCapturedAt ?? (hasCurrentParameters ? new Date().toISOString() : null),
    lastCapturedAt: hasCurrentParameters
      ? new Date().toISOString()
      : storedAttribution?.lastCapturedAt ?? null,
  };

  if (hasCurrentParameters || storedAttribution) writeStoredAttribution(attribution);
  return attribution;
}

export function getActiveTrackingParameters() {
  const attribution = captureAttribution();
  return hasParameters(attribution.lastTouch) ? attribution.lastTouch : attribution.firstTouch;
}

export function buildCheckoutUrl(baseUrl, trackingParameters = getActiveTrackingParameters()) {
  const checkoutUrl = new URL(baseUrl);

  KIWIFY_TRACKING_PARAMETERS.forEach((key) => {
    const value = trackingParameters[key];
    if (value) checkoutUrl.searchParams.set(key, sanitizeParameter(String(value)));
  });

  return checkoutUrl.toString();
}
