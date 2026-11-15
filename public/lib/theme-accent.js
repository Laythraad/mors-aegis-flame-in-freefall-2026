const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function normalizeHexColor(value) {
  if (typeof value !== 'string') return null;
  const match = value.trim().match(/^#?([\da-f]{3}|[\da-f]{6})$/i);
  if (!match) return null;
  const hex = match[1].length === 3 ? [...match[1]].map((x) => x + x).join('') : match[1];
  return `#${hex.toLowerCase()}`;
}

function rgb(hex) {
  return normalizeHexColor(hex).slice(1).match(/.{2}/g).map((part) => parseInt(part, 16) / 255);
}

function luminance(hex) {
  const channels = rgb(hex).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

function toHsl(hex) {
  const [r, g, b] = rgb(hex);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (delta) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = ((h * 60) + 360) % 360;
  }
  return [h, s, l];
}

function fromHsl(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return `#${[r, g, b].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('')}`;
}

export function accessibleAccent(value, surfaces) {
  const normalized = normalizeHexColor(value);
  if (!normalized || !Array.isArray(surfaces) || !surfaces.length) return null;
  const backgrounds = surfaces.map(normalizeHexColor);
  if (backgrounds.some((background) => !background)) return null;
  const passes = (color) => backgrounds.every((background) => contrast(color, background) >= 4.5);
  if (passes(normalized)) return normalized;

  const [h, s, l] = toHsl(normalized);
  const candidates = [];
  for (let lightness = 0.08; lightness <= 0.92; lightness += 0.005) {
    const saturation = s < 0.08 ? 0 : clamp(Math.max(s, 0.56), 0, 1);
    const candidate = fromHsl(h, saturation, lightness);
    if (passes(candidate)) candidates.push({ color: candidate, distance: Math.abs(lightness - l) });
  }
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates[0]?.color ?? null;
}
