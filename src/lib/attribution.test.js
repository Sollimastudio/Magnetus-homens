import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildCheckoutUrl,
  captureAttribution,
  extractTrackingParameters,
  getActiveTrackingParameters,
} from './attribution.js';

test('keeps only parameters accepted by Kiwify', () => {
  const parameters = extractTrackingParameters(
    '?utm_source=instagram&utm_campaign=lancamento&src=reels&gclid=ignored',
  );

  assert.deepEqual(parameters, {
    src: 'reels',
    utm_source: 'instagram',
    utm_campaign: 'lancamento',
  });
});

test('adds attribution parameters to the checkout URL', () => {
  const checkoutUrl = buildCheckoutUrl('https://pay.kiwify.com.br/TX2Ao2R', {
    src: 'bio',
    utm_source: 'instagram',
    utm_medium: 'organic',
    utm_campaign: 'magnetus_iii',
  });

  assert.equal(
    checkoutUrl,
    'https://pay.kiwify.com.br/TX2Ao2R?src=bio&utm_source=instagram&utm_medium=organic&utm_campaign=magnetus_iii',
  );
});

test('sanitizes empty and oversized tracking values', () => {
  const parameters = extractTrackingParameters(
    `?src=%20%20&utm_content=${'x'.repeat(180)}`,
  );

  assert.equal(parameters.src, undefined);
  assert.equal(parameters.utm_content.length, 120);
});

test('reuses the latest known attribution when the visitor returns without UTMs', () => {
  const storage = new Map();
  globalThis.window = {
    location: { search: '?utm_source=tiktok&utm_campaign=magnetus_video_01' },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
  };

  try {
    captureAttribution();
    globalThis.window.location.search = '';

    assert.deepEqual(getActiveTrackingParameters(), {
      utm_source: 'tiktok',
      utm_campaign: 'magnetus_video_01',
    });
  } finally {
    delete globalThis.window;
  }
});
