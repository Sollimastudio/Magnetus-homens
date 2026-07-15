import assert from 'node:assert/strict';
import test from 'node:test';
import handler from './funnel-event.js';

function createResponse() {
  return {
    body: null,
    headers: {},
    statusCode: 200,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    end() {
      return this;
    },
  };
}

test('accepts an allowlisted funnel event and removes unknown properties', () => {
  const request = {
    method: 'POST',
    headers: { 'x-vercel-id': 'test-request' },
    body: {
      event: 'cta_click',
      properties: {
        product: 'magnetus_iii',
        cta_location: 'offer_primary',
        email: 'must-not-be-logged@example.com',
      },
    },
  };
  const response = createResponse();
  const originalConsoleLog = console.log;
  let loggedEvent = '';
  console.log = (value) => {
    loggedEvent = value;
  };

  try {
    handler(request, response);
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(response.statusCode, 204);
  assert.match(loggedEvent, /offer_primary/);
  assert.doesNotMatch(loggedEvent, /must-not-be-logged/);
});

test('rejects unknown event names', () => {
  const request = {
    method: 'POST',
    headers: {},
    body: { event: 'arbitrary_event', properties: {} },
  };
  const response = createResponse();

  handler(request, response);

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, { error: 'invalid_event' });
});

test('accepts experiment exposure data without accepting arbitrary identity data', () => {
  const request = {
    method: 'POST',
    headers: {},
    body: {
      event: 'experiment_exposure',
      properties: {
        experiment_id: 'headline_presence_loss',
        experiment_variant: 'presence_loss',
        experiment_version: 1,
        experiment_preview: false,
        customer_name: 'must-not-be-logged',
      },
    },
  };
  const response = createResponse();
  const originalConsoleLog = console.log;
  let loggedEvent = '';
  console.log = (value) => {
    loggedEvent = value;
  };

  try {
    handler(request, response);
  } finally {
    console.log = originalConsoleLog;
  }

  assert.equal(response.statusCode, 204);
  assert.match(loggedEvent, /headline_presence_loss/);
  assert.match(loggedEvent, /presence_loss/);
  assert.doesNotMatch(loggedEvent, /must-not-be-logged/);
});
