import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const css = await readFile(path.join(root, 'public', 'app.css'), 'utf8');
const customizationCss = await readFile(path.join(root, 'public', 'theme-customization.css'), 'utf8');

function rgb(hex) {
  const expanded = hex.length === 4 ? `#${[...hex.slice(1)].map((channel) => `${channel}${channel}`).join('')}` : hex;
  return expanded
    .slice(1)
    .match(/[\da-f]{2}/gi)
    .slice(0, 3)
    .map((channel) => parseInt(channel, 16) / 255);
}

function luminance(hex) {
  const channels = rgb(hex).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a, b) {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

test('theme text color is recomputed where the selected body theme sets its variables', () => {
  assert.match(css, /body\{margin:0;background:var\(--bg\);color:var\(--ink\)\}/);
  assert.match(css, /\.theme-space\{[^}]*--ink:#e5f1fa/);
});

test('dark-theme body and muted text meet WCAG AA contrast on content surfaces', () => {
  const space = css.match(/\.theme-space\{([^}]+)\}/)?.[1];
  assert.ok(space, 'Deep Space theme variables must exist');
  const token = (name) => space.match(new RegExp(`${name}:(#[\\da-f]{6})`, 'i'))?.[1];
  const ink = token('--ink');
  const muted = token('--muted');
  for (const background of [token('--bg'), token('--surface'), token('--surface2')]) {
    assert.ok(contrast(ink, background) >= 7, `primary text contrast must be at least 7:1 on ${background}`);
    assert.ok(contrast(muted, background) >= 4.5, `secondary text contrast must be at least 4.5:1 on ${background}`);
  }
});

test('Black Hole theme text, muted text and cyan accent retain readable contrast', () => {
  const blackhole = customizationCss.match(/body\.theme-blackhole\s*\{([^}]+)\}/)?.[1];
  assert.ok(blackhole, 'Black Hole theme variables must exist');
  const token = (name) => blackhole.match(new RegExp(`${name}:(#[\\da-f]{6})`, 'i'))?.[1];
  const ink = token('--ink');
  const muted = token('--muted');
  for (const background of [token('--bg'), token('--surface'), token('--surface2')]) {
    assert.ok(contrast(ink, background) >= 7, `primary text contrast must be at least 7:1 on ${background}`);
    assert.ok(contrast(muted, background) >= 4.5, `secondary text contrast must be at least 4.5:1 on ${background}`);
  }
  for (const accent of [token('--accent'), token('--link'), token('--eyebrow')]) {
    assert.ok(contrast(accent, token('--surface')) >= 4.5, `accent ${accent} must contrast with the dark surface`);
  }
});

test('links and accent text meet WCAG AA on every supported content surface', () => {
  const themes = [
    css.match(/:root\{([^}]+)\}/)?.[1],
    css.match(/\.theme-space\{([^}]+)\}/)?.[1],
    css.match(/\.theme-observatory\{([^}]+)\}/)?.[1],
  ];
  assert.ok(themes.every(Boolean));
  for (const theme of themes) {
    const token = (name) => theme.match(new RegExp(`${name}:(#[\\da-f]{3}(?:[\\da-f]{3})?)`, 'i'))?.[1];
    for (const text of [token('--accent'), token('--link'), token('--eyebrow')]) {
      assert.ok(text, 'each theme must define accessible accent and link colors');
      for (const background of [token('--surface'), token('--surface2')]) {
        assert.ok(contrast(text, background) >= 4.5, `${text} must contrast with ${background} at 4.5:1`);
      }
    }
  }
  assert.match(css, /a\{color:var\(--link\);text-underline-offset:2px\}/);
});

test('illustration badges retain readable contrast in light and dark themes', () => {
  const lightBadge = css.match(/\.badge-sim\{([^}]+)\}/)?.[1];
  const darkBadge = css.match(/\.theme-space \.badge-sim\{([^}]+)\}/)?.[1];
  const colors = (rule) => ({
    text: rule.match(/color:(#[\da-f]{6})/i)?.[1],
    background: rule.match(/background:(#[\da-f]{6})/i)?.[1],
  });
  for (const badge of [colors(lightBadge), colors(darkBadge)]) {
    assert.ok(badge.text && badge.background);
    assert.ok(contrast(badge.text, badge.background) >= 4.5);
  }
});
