import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { flameVolumeParameters } from '../public/lib/flame-volume.js';
import { bindFlameScene3d } from '../public/lib/flame-scene3d.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const modelsDir = path.join(root, 'public', 'models');
const [catalog, descriptions] = await Promise.all([
  readFile(path.join(modelsDir, 'catalog.json'), 'utf8').then(JSON.parse),
  readFile(path.join(modelsDir, 'descriptions.json'), 'utf8').then(JSON.parse),
]);

test('every listed 3D model has an existing GLB and a complete bilingual explanation', async () => {
  assert.equal(catalog.length, 41);
  assert.equal(new Set(catalog.map((model) => model.file)).size, catalog.length);
  assert.deepEqual(Object.keys(descriptions).sort(), catalog.map((model) => model.file).sort());

  for (const model of catalog) {
    assert.equal(path.basename(model.file), model.file, `${model.file} must be a direct catalogue filename`);
    const file = await stat(path.join(modelsDir, model.file));
    assert.ok(file.isFile(), `${model.file} must exist`);
    assert.equal(file.size, model.sizeBytes, `${model.file} size must match the catalogue`);
    const description = descriptions[model.file];
    for (const field of ['categoryEn', 'categoryAr', 'purposeEn', 'purposeAr', 'valueEn', 'valueAr'])
      assert.ok(description[field]?.trim(), `${model.file} needs ${field}`);
  }
});

test('gravity, fan, source, mist, and oxygen scene states affect the renderer', async () => {
  const css = await readFile(path.join(root, 'public', '3d-experience.css'), 'utf8');
  const markup = await readFile(path.join(root, 'public', 'lib', 'flame-scene3d.js'), 'utf8');

  assert.match(markup, /class="scene3d-room" data-fire="on" data-gravity="earth" data-air="on" data-mist="off"/);
  for (const selector of [
    '.scene3d-room[data-gravity=micro] .scene-flame',
    '.scene3d-room[data-air=on] .scene-flame',
    '.scene3d-room[data-fire=off] .scene-flame',
    '.scene3d-room[data-mist=on] .scene-droplets',
  ])
    assert.ok(css.includes(selector), `missing visual response for ${selector}`);
  assert.ok(!css.includes('.scene-room['), 'scene selectors must match the rendered .scene3d-room element');
  assert.match(markup, /<canvas class="scene-flame-volume"/);
  assert.match(css, /\.scene3d-room\.scene-volume-ready \.scene-flame-volume/);
  assert.match(markup, /data-motion="paused"/);
  assert.match(markup, /data-scene-motion/);
  const volume = await readFile(path.join(root, 'public', 'lib', 'flame-volume.js'), 'utf8');
  assert.match(volume, /gl\.disable\(gl\.BLEND\)/);
  assert.doesNotMatch(volume, /gl\.blendFunc\(/);
});

test('the volumetric flame renderer receives independent gravity, fan, mist, fire, and camera states', () => {
  const scene = { dataset: { fire: 'on', gravity: 'earth', air: 'on', mist: 'off', oxygen: '21' } };
  assert.deepEqual(flameVolumeParameters(scene, { rx: -16, ry: -28 }), {
    time: 0,
    gravity: 0,
    air: 1,
    mist: 0,
    fire: 1,
    oxygen: 9 / 22,
    yaw: (-28 * Math.PI) / 180,
    pitch: (-16 * Math.PI) / 180,
  });

  scene.dataset.gravity = 'micro';
  scene.dataset.air = 'off';
  scene.dataset.mist = 'on';
  scene.dataset.fire = 'off';
  scene.dataset.oxygen = '34';
  assert.deepEqual(flameVolumeParameters(scene), {
    time: 0,
    gravity: 1,
    air: 0,
    mist: 1,
    fire: 0,
    oxygen: 1,
    yaw: 0,
    pitch: 0,
  });
});

test('the scene state note remains usable in both languages when WebGL is unavailable', () => {
  for (const lang of ['en', 'ar']) {
    const listeners = new Map();
    const buttons = [
      'fire:on',
      'fire:off',
      'gravity:earth',
      'gravity:micro',
      'air:on',
      'air:off',
      'mist:on',
      'mist:off',
    ].map((value) => {
      const [key, selected] = value.split(':');
      return {
        dataset: { sceneKey: key, sceneValue: selected },
        addEventListener(type, handler) {
          listeners.set(`${key}:${selected}:${type}`, handler);
        },
        setAttribute() {},
        classList: { toggle() {} },
      };
    });
    const note = { textContent: '' };
    const reset = { addEventListener() {} };
    const motion = {
      textContent: '',
      addEventListener(type, handler) {
        listeners.set(`motion:${type}`, handler);
      },
    };
    const scene = {
      querySelector(selector) {
        return selector === '.scene-state-note'
          ? note
          : selector === '[data-scene-reset]'
            ? reset
            : selector === '[data-scene-motion]'
              ? motion
              : null;
      },
      querySelectorAll() {
        return buttons;
      },
    };
    const room = {
      dataset: { fire: 'on', gravity: 'earth', air: 'on', mist: 'off', motion: 'paused' },
      style: { setProperty() {} },
      classList: { add() {}, remove() {} },
      addEventListener(type, handler) {
        listeners.set(`room:${type}`, handler);
      },
    };
    const stage = {
      closest() {
        return scene;
      },
      querySelector() {
        return {};
      },
      addEventListener() {},
      focus() {},
    };
    const root = {
      querySelector(selector) {
        return selector === '.scene3d-stage' ? stage : selector === '.scene3d-room' ? room : null;
      },
    };

    bindFlameScene3d(root, lang);
    assert.equal(room.dataset.motion, 'running');
    assert.equal(motion.textContent, lang === 'ar' ? 'إيقاف الحركة' : 'Pause animation');
    listeners.get('motion:click')();
    assert.equal(room.dataset.motion, 'paused');
    assert.equal(motion.textContent, lang === 'ar' ? 'استئناف الحركة' : 'Resume animation');
    assert.match(note.textContent, lang === 'ar' ? /عارض WebGL غير متاح/ : /WebGL viewer unavailable/);
    listeners.get('fire:off:click')();
    assert.match(note.textContent, lang === 'ar' ? /المصدر متوقف/ : /Source off/);
  }
});

test('the selected model label follows the scenario controls before the model catalogue', async () => {
  const gallery = await readFile(path.join(root, 'public', 'lib', 'model-gallery.js'), 'utf8');
  assert.ok(gallery.indexOf('id="modelScenarioSelection"') < gallery.indexOf('Browse every model'));
  assert.match(gallery, /scenarioSelection\.textContent = `\$\{t\.scenarioFor\}: \$\{title\}`/);
});
