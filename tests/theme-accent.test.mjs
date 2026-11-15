import test from 'node:test';
import assert from 'node:assert/strict';
import { accessibleAccent, normalizeHexColor } from '../public/lib/theme-accent.js';

const surfaces = {
  arctic: ['#ffffff', '#f4f9fc'],
  space: ['#10223a', '#132a43'],
  observatory: ['#f8f8f3', '#eeeFE8'],
};

function luminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

test('custom accent colors normalize safely and reject malformed input', () => {
  assert.equal(normalizeHexColor(' #AbC '), '#aabbcc');
  assert.equal(normalizeHexColor('#123456'), '#123456');
  assert.equal(normalizeHexColor('red'), null);
  assert.equal(normalizeHexColor('#12'), null);
});

test('selected accent meets WCAG AA contrast on every theme content surface', () => {
  for (const requested of ['#ffffff', '#ffeb3b', '#16d6bb', '#2546f0', '#111111']) {
    for (const background of Object.values(surfaces)) {
      const adjusted = accessibleAccent(requested, background);
      assert.ok(adjusted, `expected an accessible shade for ${requested}`);
      for (const surface of background) assert.ok(contrast(adjusted, surface) >= 4.5, `${adjusted} against ${surface}`);
    }
  }
});

test('accent resolver rejects invalid colors and surface lists', () => {
  assert.equal(accessibleAccent('#fff', ['not-color']), null);
  assert.equal(accessibleAccent('red', surfaces.arctic), null);
  assert.equal(accessibleAccent('#fff', []), null);
});

test('neutral accent selections stay neutral when contrast requires adjustment', () => {
  const adjusted = accessibleAccent('#ffffff', surfaces.arctic);
  const [red, green, blue] = adjusted.slice(1).match(/.{2}/g).map((x) => parseInt(x, 16));
  assert.equal(red, green);
  assert.equal(green, blue);
});
