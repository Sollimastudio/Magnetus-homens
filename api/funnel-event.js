const ALLOWED_EVENTS = new Set([
  'landing_view',
  'section_view',
  'cta_click',
  'faq_open',
  'experiment_exposure',
]);

const ALLOWED_PROPERTIES = new Set([
  'product',
  'product_name',
  'product_price',
  'currency',
  'path',
  'session_id',
  'cta_location',
  'destination',
  'section',
  'faq_index',
  'faq_question',
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
  'experiment_id',
  'experiment_variant',
  'experiment_version',
  'experiment_bucket',
  'experiment_assignment',
  'experiment_preview',
  'checkout_experiment_tagged',
]);

const MAX_BODY_BYTES = 8_192;
const MAX_STRING_LENGTH = 160;

function sanitizeProperties(properties) {
  if (!properties || typeof properties !== 'object' || Array.isArray(properties)) return {};

  return Object.entries(properties).reduce((sanitized, [key, value]) => {
    if (!ALLOWED_PROPERTIES.has(key)) return sanitized;
    if (!['string', 'number', 'boolean'].includes(typeof value)) return sanitized;

    sanitized[key] = typeof value === 'string'
      ? value.slice(0, MAX_STRING_LENGTH)
      : value;
    return sanitized;
  }, {});
}

export default function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'method_not_allowed' });
  }

  const contentLength = Number(request.headers['content-length'] ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return response.status(413).json({ error: 'payload_too_large' });
  }

  let payload = request.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return response.status(400).json({ error: 'invalid_json' });
    }
  }

  if (!payload || !ALLOWED_EVENTS.has(payload.event)) {
    return response.status(400).json({ error: 'invalid_event' });
  }

  const properties = sanitizeProperties(payload.properties);
  console.log(JSON.stringify({
    level: 'info',
    message: 'magnetus_funnel_event',
    event: payload.event,
    request_id: request.headers['x-vercel-id'] ?? null,
    ...properties,
  }));

  return response.status(204).end();
}
