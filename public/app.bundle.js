(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // public/lib/dom.js
  var $ = (s) => document.querySelector(s);
  var esc = (s) => String(s != null ? s : "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
  function toast(s) {
    const x = $("#toast");
    x.textContent = s;
    x.classList.add("show");
    setTimeout(() => x.classList.remove("show"), 2400);
  }
  function pageHead(title, desc) {
    return `<div class="section-title" style="margin-top:0"><div><h2>${title}</h2><p>${desc}</p></div></div>`;
  }
  function stat(label, value, detail, icon) {
    return `<article class="card metric"><span class="metric-icon">${icon}</span><div class="label">${label}</div><strong>${value}</strong><small>${detail}</small></article>`;
  }
  function download(name, data, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], { type }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
  }

  // public/lib/api.js
  async function get(url) {
    const r = await fetch(url);
    const j = await r.json();
    if (!r.ok) throw new Error(j.note || j.error || `HTTP ${r.status}`);
    return j;
  }
  async function post(url, data = {}) {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const j = await r.json();
    if (!r.ok && r.status !== 424) throw new Error(j.note || j.error || `HTTP ${r.status}`);
    return j;
  }

  // public/lib/evidence-coverage.js
  var profiles = {
    "PSI-20": { flame: "partial", conditions: "direct" },
    "PSI-21": { flame: "partial", conditions: "direct" },
    "PSI-22": { flame: "partial", conditions: "direct" },
    "PSI-23": { flame: "partial", conditions: "direct" },
    "PSI-25": { material: "direct", suppression: "partial", conditions: "direct" },
    "PSI-26": { material: "conditions", suppression: "conditions", conditions: "partial" },
    "PSI-39": { flame: "conditions", conditions: "direct" },
    "PSI-47": { smoke: "partial", conditions: "partial" },
    "PSI-68": { flame: "conditions", suppression: "conditions", conditions: "direct" },
    "PSI-69": { flame: "direct", suppression: "direct", conditions: "direct" },
    "PSI-98": { material: "partial", conditions: "partial" },
    "PSI-99": { material: "partial", conditions: "partial" },
    "PSI-100": { material: "conditions", conditions: "direct" },
    "PSI-101": { smoke: "direct", conditions: "direct" },
    "PSI-102": { material: "direct", smoke: "partial", conditions: "partial" },
    "PSI-107": { flame: "partial", conditions: "direct" }
  };
  var labels = {
    en: {
      title: "Evidence coverage by investigation",
      sub: "A quick map of what the bundled source tables contain. Statuses reflect the source review, not safety performance.",
      study: "NASA PSI investigation",
      flame: "Flame / ignition",
      material: "Materials / fires",
      smoke: "Smoke / aerosol",
      suppression: "Extinction / suppression",
      conditions: "Test conditions",
      direct: "Measured values or source outcomes",
      partial: "Limited or indirect rows",
      conditionsOnly: "Conditions / metadata only",
      none: "No bundled evidence in this domain",
      directShort: "Measured",
      partialShort: "Limited",
      conditionsShort: "Conditions",
      noneShort: "\u2014",
      source: "NASA PSI record \u2197",
      note: "Rows stay within their own investigation; a cell is not a cross-study score."
    },
    ar: {
      title: "\u062E\u0631\u064A\u0637\u0629 \u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0623\u062F\u0644\u0629 \u062D\u0633\u0628 \u0627\u0644\u062A\u062D\u0642\u064A\u0642",
      sub: "\u0645\u0644\u062E\u0635 \u0633\u0631\u064A\u0639 \u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629. \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0645\u0628\u0646\u064A\u0629 \u0639\u0644\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0644\u0627 \u062A\u0645\u062B\u0644 \u0623\u062F\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629.",
      study: "\u062A\u062D\u0642\u064A\u0642 NASA PSI",
      flame: "\u0627\u0644\u0644\u0647\u0628 / \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644",
      material: "\u0627\u0644\u0645\u0648\u0627\u062F / \u0627\u0644\u062D\u0631\u0627\u0626\u0642",
      smoke: "\u0627\u0644\u062F\u062E\u0627\u0646 / \u0627\u0644\u0647\u0628\u0627\u0621",
      suppression: "\u0627\u0644\u0627\u0646\u0637\u0641\u0627\u0621 / \u0627\u0644\u0625\u062E\u0645\u0627\u062F",
      conditions: "\u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631",
      direct: "\u0642\u064A\u0645 \u0645\u0642\u0627\u0633\u0629 \u0623\u0648 \u0646\u062A\u0627\u0626\u062C \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631",
      partial: "\u0635\u0641\u0648\u0641 \u0645\u062D\u062F\u0648\u062F\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0645\u0628\u0627\u0634\u0631\u0629",
      conditionsOnly: "\u0638\u0631\u0648\u0641 / \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637",
      none: "\u0644\u0627 \u062F\u0644\u064A\u0644 \u0645\u0631\u0641\u0642 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0627\u0644",
      directShort: "\u0645\u0642\u0627\u0633",
      partialShort: "\u0645\u062D\u062F\u0648\u062F",
      conditionsShort: "\u0638\u0631\u0648\u0641",
      noneShort: "\u2014",
      source: "\u0633\u062C\u0644 NASA PSI \u2197",
      note: "\u062A\u0628\u0642\u0649 \u0627\u0644\u0635\u0641\u0648\u0641 \u0636\u0645\u0646 \u062A\u062D\u0642\u064A\u0642\u0647\u0627\u061B \u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u0644\u064A\u0633\u062A \u062F\u0631\u062C\u0629 \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u064A\u0646 \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A."
    }
  };
  function renderEvidenceCoverage(investigations, lang2 = "en") {
    const l = labels[lang2 === "ar" ? "ar" : "en"];
    const columns = ["flame", "material", "smoke", "suppression", "conditions"];
    const table = investigations.map((study) => {
      const p = profiles[study.id] || {};
      const cells = columns.map((key) => {
        const status = p[key] || "none";
        const name = status === "direct" ? l.direct : status === "partial" ? l.partial : status === "conditions" ? l.conditionsOnly : l.none;
        const short = status === "direct" ? l.directShort : status === "partial" ? l.partialShort : status === "conditions" ? l.conditionsShort : l.noneShort;
        return `<td><span class="coverage-cell coverage-${status}" title="${esc(name)}" aria-label="${esc(name)}">${esc(short)}</span></td>`;
      }).join("");
      return `<tr><th scope="row"><a href="${esc(study.sourceUrl)}" target="_blank" rel="noreferrer">${esc(study.id)} \xB7 ${esc(study.title)} \u2197</a></th>${cells}</tr>`;
    }).join("");
    return `<section class="card evidence-coverage" aria-labelledby="coverage-title"><div class="card-head"><div><h3 id="coverage-title">${l.title}</h3><p class="sub">${l.sub}</p></div><span class="tag">${investigations.length} ${lang2 === "ar" ? "\u062C\u062F\u0627\u0648\u0644" : "bundled tables"}</span></div><div class="table-wrap"><table><thead><tr><th scope="col">${l.study}</th>${columns.map((key) => `<th scope="col">${l[key]}</th>`).join("")}</tr></thead><tbody>${table}</tbody></table></div><div class="coverage-legend"><span><i class="coverage-swatch coverage-direct"></i>${l.direct}</span><span><i class="coverage-swatch coverage-partial"></i>${l.partial}</span><span><i class="coverage-swatch coverage-conditions"></i>${l.conditionsOnly}</span><span><i class="coverage-swatch coverage-none"></i>${l.none}</span></div><p class="sub">${l.note}</p></section>`;
  }

  // public/lib/flame-volume.js
  var VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
  var FRAGMENT_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_gravity;
uniform float u_air;
uniform float u_mist;
uniform float u_fire;
uniform float u_oxygen;
uniform float u_yaw;
uniform float u_pitch;

vec3 rotateVolume(vec3 p) {
  float cy = cos(u_yaw), sy = sin(u_yaw);
  float cx = cos(u_pitch), sx = sin(u_pitch);
  p.xz = mat2(cy, -sy, sy, cy) * p.xz;
  p.yz = mat2(cx, -sx, sx, cx) * p.yz;
  return p;
}

float turbulence(vec3 p) {
  float a = sin(p.x * 13.0 + p.y * 4.0 + u_time * 3.2);
  float b = cos(p.y * 11.0 - p.z * 7.0 - u_time * 2.7);
  float c = sin(p.z * 15.0 + p.x * 5.0 + u_time * 2.1);
  return (a * b + c) * 0.055;
}

void main() {
  vec2 uv = (v_uv - 0.5) * 2.0;
  uv.x *= u_resolution.x / u_resolution.y;
  vec3 origin = vec3(0.0, 0.0, 2.45);
  vec3 direction = normalize(vec3(uv * 0.88, -2.2));
  vec4 accumulated = vec4(0.0);

  for (int stepIndex = 0; stepIndex < 56; stepIndex++) {
    float distanceAlongRay = float(stepIndex) * 0.062;
    vec3 p = rotateVolume(origin + direction * distanceAlongRay);
    float noise = turbulence(p);
    float radial = 0.0;
    float density = 0.0;

    if (u_gravity < 0.5) {
      float heightFromBase = p.y + 0.72;
      float height01 = clamp(heightFromBase / 1.52, 0.0, 1.0);
      float heightMask = smoothstep(-0.08, 0.06, heightFromBase)
        * (1.0 - smoothstep(1.30, 1.54, heightFromBase));
      float width = mix(0.29, 0.018, height01) * mix(0.72, 1.0, u_oxygen) * (1.0 + noise * 1.5);
      heightMask *= mix(0.48, 1.0, u_oxygen);
      float centreShift = u_air * 0.38 * height01 * height01;
      radial = length(vec2((p.x - centreShift) / max(width, 0.025), p.z / max(width * 0.78, 0.02)));
      density = heightMask * (1.0 - smoothstep(0.64, 1.18, radial + noise));
    } else {
      float envelopeScale = mix(0.72, 1.0, u_oxygen);
      vec3 ellipsoid = vec3(p.x / (0.58 * envelopeScale), p.y / (0.49 * envelopeScale), p.z / (0.58 * envelopeScale));
      ellipsoid.x -= u_air * p.y * 0.34;
      radial = length(ellipsoid);
      // A diffusion-flame shell around a fuel source; the hollow center is intentional.
      density = (1.0 - smoothstep(0.12, 0.34, abs(radial - 0.92))) * (1.0 + noise * 1.7);
    }

    density *= u_fire * (1.0 - 0.12 * u_mist);
    density *= mix(0.35, 1.0, u_oxygen);
    float core = 1.0 - smoothstep(0.02, 0.86, radial);
    vec3 edgeColor = mix(vec3(1.0, 0.25, 0.035), vec3(0.20, 0.64, 1.0), u_gravity);
    vec3 hotColor = mix(vec3(1.0, 0.84, 0.40), vec3(0.78, 0.91, 1.0), u_gravity);
    vec3 sampleColor = mix(edgeColor, hotColor, core);
    sampleColor = mix(sampleColor, vec3(0.58, 0.83, 1.0), u_mist * 0.16);
    float alpha = density * (u_gravity > 0.5 ? 0.24 : 0.16);
    float dropletRadius = length(p);
    if (u_gravity > 0.5 && dropletRadius < 0.105) {
      float light = 0.35 + 0.65 * max(dot(normalize(p + vec3(0.0001)), normalize(vec3(-0.45, 0.5, 0.75))), 0.0);
      sampleColor = mix(vec3(0.035, 0.055, 0.075), vec3(0.46, 0.34, 0.19), light);
      alpha = 0.98;
    }
    accumulated.rgb += (1.0 - accumulated.a) * sampleColor * alpha;
    accumulated.a += (1.0 - accumulated.a) * alpha;
    if (accumulated.a > 0.96) break;
  }

  // The ray marcher accumulates premultiplied light internally. Convert it to
  // straight-alpha output for the transparent canvas compositor.
  gl_FragColor = vec4(accumulated.rgb / max(accumulated.a, 0.0001), accumulated.a);
}`;
  function flameVolumeParameters(scene, { time = 0, rx = 0, ry = 0 } = {}) {
    const oxygenPercent = Number(scene.dataset.oxygen || 21);
    return {
      time,
      gravity: scene.dataset.gravity === "micro" ? 1 : 0,
      air: scene.dataset.air === "on" ? 1 : 0,
      mist: scene.dataset.mist === "on" ? 1 : 0,
      fire: scene.dataset.fire === "on" ? 1 : 0,
      oxygen: Math.max(0, Math.min(1, (oxygenPercent - 12) / 22)),
      yaw: ry * Math.PI / 180,
      pitch: rx * Math.PI / 180
    };
  }
  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
  function bindFlameVolume(canvas, scene) {
    var _a;
    if (!(canvas == null ? void 0 : canvas.getContext)) return null;
    let gl;
    try {
      gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });
    } catch (e) {
      return null;
    }
    if (!gl) return null;
    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return null;
    }
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return null;
    }
    const buffer = gl.createBuffer();
    if (!buffer) return null;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = Object.fromEntries(
      ["u_resolution", "u_time", "u_gravity", "u_air", "u_mist", "u_fire", "u_oxygen", "u_yaw", "u_pitch"].map((name) => [
        name,
        gl.getUniformLocation(program, name)
      ])
    );
    gl.disable(gl.BLEND);
    let rotation = { rx: 0, ry: 0 };
    let elapsed = 0;
    let lastFrame = 0;
    let frame = 0;
    let paused = Boolean((_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)").matches);
    let observer;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uniforms.u_resolution, width, height);
      draw();
    };
    const draw = () => {
      if (gl.isContextLost()) return;
      const state = flameVolumeParameters(scene, __spreadValues({ time: elapsed }, rotation));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uniforms.u_time, state.time);
      gl.uniform1f(uniforms.u_gravity, state.gravity);
      gl.uniform1f(uniforms.u_air, state.air);
      gl.uniform1f(uniforms.u_mist, state.mist);
      gl.uniform1f(uniforms.u_fire, state.fire);
      gl.uniform1f(uniforms.u_oxygen, state.oxygen);
      gl.uniform1f(uniforms.u_yaw, state.yaw);
      gl.uniform1f(uniforms.u_pitch, state.pitch);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const render = (now) => {
      if (!canvas.isConnected || paused) {
        frame = 0;
        return;
      }
      if (now - lastFrame >= 40) {
        lastFrame = now;
        elapsed = now / 1e3;
        draw();
      }
      frame = requestAnimationFrame(render);
    };
    observer = typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    observer == null ? void 0 : observer.observe(canvas);
    resize();
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      scene.classList.remove("scene-volume-ready");
    });
    if (!paused) frame = requestAnimationFrame(render);
    return {
      setRotation(rx, ry) {
        rotation = { rx, ry };
        if (paused) draw();
      },
      update() {
        draw();
      },
      pause() {
        paused = true;
        cancelAnimationFrame(frame);
        frame = 0;
        draw();
      },
      resume() {
        if (!paused) return;
        paused = false;
        frame = requestAnimationFrame(render);
      }
    };
  }

  // public/lib/flame-scene3d.js
  function flameScene3d(lang2 = "en") {
    const ar = lang2 === "ar";
    const labels2 = ar ? {
      title: "\u0645\u0634\u0647\u062F \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0644\u062A\u063A\u064A\u0651\u0631 \u0627\u0644\u0644\u0647\u0628 \u0648\u0627\u0644\u062C\u0631\u064A\u0627\u0646",
      intro: "\u063A\u064A\u0651\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0648\u0627\u0644\u0647\u0648\u0627\u0621 \u0648\u0627\u0644\u0631\u0630\u0627\u0630\u060C \u062B\u0645 \u0627\u0633\u062D\u0628 \u0627\u0644\u0645\u0634\u0647\u062F \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0623\u0633\u0647\u0645 \u0644\u062A\u062F\u0648\u064A\u0631\u0647.",
      source: "\u0645\u0635\u062F\u0631 \u0627\u0644\u0644\u0647\u0628",
      on: "\u062A\u0634\u063A\u064A\u0644",
      off: "\u0625\u064A\u0642\u0627\u0641",
      gravity: "\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629",
      earth: "\u0623\u0631\u0636\u064A\u0629",
      micro: "\u0635\u063A\u0631\u0649",
      airflow: "\u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0642\u0633\u0631\u064A",
      mist: "\u0631\u0630\u0627\u0630 \u0627\u0644\u0645\u0627\u0621",
      reset: "\u0625\u0639\u0627\u062F\u0629 \u0632\u0627\u0648\u064A\u0629 \u0627\u0644\u0639\u0631\u0636",
      stage: "\u0645\u0634\u0647\u062F \u062A\u0641\u0633\u064A\u0631\u064A \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F\u060C \u0627\u0633\u062D\u0628 \u0644\u062A\u062F\u0648\u064A\u0631\u0647",
      earthLabel: "\u0637\u0641\u0648 \xB7 \u062D\u0645\u0644 \u0637\u0628\u064A\u0639\u064A \u0635\u0627\u0639\u062F",
      microLabel: "\u0627\u0646\u062A\u0634\u0627\u0631 \xB7 \u062D\u0645\u0644 \u0637\u0628\u064A\u0639\u064A \u0623\u0636\u0639\u0641",
      note: "\u0645\u0634\u0647\u062F \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u064A\u0639\u0631\u0636 \u063A\u0644\u0627\u0641 \u0644\u0647\u0628 \u0627\u0646\u062A\u0634\u0627\u0631\u064A \u0623\u0632\u0631\u0642 \u062D\u0648\u0644 \u0642\u0637\u0631\u0629 \u0648\u0642\u0648\u062F\u061B \u064A\u0628\u062F\u0644 O\u2082 \u0627\u0644\u062D\u062C\u0645 \u0627\u0644\u0628\u0635\u0631\u064A \u0641\u0642\u0637. \u0644\u0627 \u064A\u062D\u0633\u0628 \u0642\u0637\u0631 \u0627\u0644\u0644\u0647\u0628 \u0623\u0648 \u0627\u0644\u0625\u062E\u0645\u0627\u062F.",
      boundary: "\u0631\u0633\u0645 \u0645\u0641\u0627\u0647\u064A\u0645\u064A \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0637\u0628\u0642\u0627\u062A\u060C \u0628\u0644\u0627 \u0645\u0642\u064A\u0627\u0633 \u0643\u0645\u064A. \u0644\u064A\u0633 \u0645\u062D\u0627\u0643\u0627\u0629 CFD \u0648\u0644\u0627 \u0635\u0648\u0631\u0629 \u0645\u0646 NASA \u0648\u0644\u0627 \u0646\u062A\u064A\u062C\u0629 \u062A\u062C\u0631\u0628\u0629. \u0644\u0627 \u064A\u0633\u062A\u0646\u062A\u062C \u0625\u062E\u0645\u0627\u062F \u0627\u0644\u062D\u0631\u064A\u0642 \u0623\u0648 \u0623\u062F\u0627\u0621 \u0623\u064A \u062C\u0647\u0627\u0632.",
      rendererReady: "\u0644\u0647\u0628 \u062D\u062C\u0645\u064A \u062A\u0641\u0627\u0639\u0644\u064A \xB7 \u062A\u0645\u062B\u064A\u0644 \u0646\u0648\u0639\u064A",
      rendererFallback: "\u0639\u0627\u0631\u0636 WebGL \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \xB7 \u0639\u0631\u0636 \u0637\u0628\u0642\u064A \u0627\u062D\u062A\u064A\u0627\u0637\u064A",
      pauseMotion: "\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062D\u0631\u0643\u0629",
      resumeMotion: "\u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062D\u0631\u0643\u0629",
      motionPaused: "\u0627\u0644\u062D\u0631\u0643\u0629 \u0645\u062A\u0648\u0642\u0641\u0629",
      motionRunning: "\u0627\u0644\u062D\u0631\u0643\u0629 \u062A\u0639\u0645\u0644"
    } : {
      title: "3D flame and transport scene",
      intro: "Change the source, gravity, airflow, and mist state, then drag or use arrow keys to rotate the volume.",
      source: "Flame source",
      on: "On",
      off: "Off",
      gravity: "Gravity",
      earth: "Earth",
      micro: "Microgravity",
      airflow: "Forced airflow",
      mist: "Water mist",
      reset: "Reset view",
      stage: "Interactive 3D explanatory scene; drag to rotate",
      earthLabel: "BUOYANCY \xB7 UPWARD NATURAL CONVECTION",
      microLabel: "DIFFUSION \xB7 WEAKER NATURAL CONVECTION",
      note: "The microgravity view shows a blue diffusion-flame shell around a fuel droplet. O\u2082 changes only the illustrative envelope; flame diameter and extinction are not calculated.",
      boundary: "Layered conceptual rendering with no quantitative scale. It is not CFD, NASA imagery, or an experiment result. It does not predict extinction or device performance.",
      rendererReady: "Interactive volumetric flame \xB7 qualitative rendering",
      rendererFallback: "WebGL viewer unavailable \xB7 layered fallback rendering",
      pauseMotion: "Pause animation",
      resumeMotion: "Resume animation",
      motionPaused: "motion paused",
      motionRunning: "motion running"
    };
    const group = (key, title, values, selected) => `<div class="scene-control-group" role="group" aria-label="${title}"><span>${title}</span><div>${values.map(
      ([value, label]) => `<button type="button" class="outline-btn${value === selected ? " active" : ""}" data-scene-key="${key}" data-scene-value="${value}" aria-pressed="${value === selected}">${label}</button>`
    ).join("")}</div></div>`;
    return `<article class="card flame-scene-card"><div class="card-head"><div><h2>${labels2.title}</h2><p class="sub">${labels2.intro}</p></div><span class="badge-sim">${ar ? "\u062A\u0648\u0636\u064A\u062D\u064A \xB7 \u0644\u064A\u0633 \u0642\u064A\u0627\u0633\u0627\u064B" : "ILLUSTRATIVE \xB7 NOT MEASURED"}</span></div>
    <div class="scene-controls" aria-label="${ar ? "\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0634\u0647\u062F" : "Scene conditions"}">
      ${group(
      "fire",
      labels2.source,
      [
        ["on", labels2.on],
        ["off", labels2.off]
      ],
      "on"
    )}
      ${group(
      "gravity",
      labels2.gravity,
      [
        ["earth", labels2.earth],
        ["micro", labels2.micro]
      ],
      "earth"
    )}
      ${group(
      "air",
      labels2.airflow,
      [
        ["on", labels2.on],
        ["off", labels2.off]
      ],
      "on"
    )}
      ${group(
      "mist",
      labels2.mist,
      [
        ["on", labels2.on],
        ["off", labels2.off]
      ],
      "off"
    )}
      <button type="button" class="quiet-btn" data-scene-motion>${labels2.pauseMotion}</button>
      <button type="button" class="quiet-btn" data-scene-reset>${labels2.reset}</button>
    </div>
    <div class="scene3d-stage" tabindex="0" role="group" aria-label="${labels2.stage}">
      <div class="scene3d-room" data-fire="on" data-gravity="earth" data-air="on" data-mist="off" data-motion="paused">
        <div class="scene-cube" aria-hidden="true"><i class="cube-face cube-front"></i><i class="cube-face cube-back"></i><i class="cube-face cube-left"></i><i class="cube-face cube-right"></i><i class="cube-face cube-top"></i><i class="cube-face cube-bottom"></i></div>
        <div class="scene-plume" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="scene-streams" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <canvas class="scene-flame-volume" width="320" height="360" aria-hidden="true"></canvas>
        <div class="scene-flame" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="scene-source" aria-hidden="true"><i></i><b></b><span>${ar ? "\u0645\u0635\u062F\u0631" : "SOURCE"}</span></div>
        <div class="scene-droplets" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="scene-fan" aria-hidden="true"><div class="scene-fan-rotor"><b></b><b></b><b></b></div><span></span></div>
        <div class="scene-caption scene-label-earth">${labels2.earthLabel}</div>
        <div class="scene-caption scene-label-micro">${labels2.microLabel}</div>
      </div>
    </div>
    <p class="sub scene-state-note" aria-live="polite">${labels2.note}</p>
    <div class="callout">${labels2.boundary} <a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noopener noreferrer">NASA fire-safety research \u2197</a></div></article>`;
  }
  function bindFlameScene3d(root, lang2 = "en") {
    var _a, _b;
    const stage = root.querySelector(".scene3d-stage");
    const room = root.querySelector(".scene3d-room");
    const scene = stage == null ? void 0 : stage.closest(".flame-scene-card");
    const note = scene == null ? void 0 : scene.querySelector(".scene-state-note");
    if (!stage || !room || !scene) return;
    const prefersReducedMotion = typeof window !== "undefined" && Boolean((_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)").matches);
    let motionPaused = prefersReducedMotion;
    const motionButton = scene.querySelector("[data-scene-motion]");
    const motionLabels = lang2 === "ar" ? { pause: "\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062D\u0631\u0643\u0629", resume: "\u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062D\u0631\u0643\u0629", paused: "\u0627\u0644\u062D\u0631\u0643\u0629 \u0645\u062A\u0648\u0642\u0641\u0629", running: "\u0627\u0644\u062D\u0631\u0643\u0629 \u062A\u0639\u0645\u0644" } : { pause: "Pause animation", resume: "Resume animation", paused: "motion paused", running: "motion running" };
    const rendererReady = lang2 === "ar" ? "\u0644\u0647\u0628 \u062D\u062C\u0645\u064A \u062A\u0641\u0627\u0639\u0644\u064A \xB7 \u062A\u0645\u062B\u064A\u0644 \u0646\u0648\u0639\u064A" : "Interactive volumetric flame \xB7 qualitative rendering";
    const rendererFallback = lang2 === "ar" ? "\u0639\u0627\u0631\u0636 WebGL \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \xB7 \u0639\u0631\u0636 \u0637\u0628\u0642\u064A \u0627\u062D\u062A\u064A\u0627\u0637\u064A" : "WebGL viewer unavailable \xB7 layered fallback rendering";
    const volume = bindFlameVolume(stage.querySelector(".scene-flame-volume"), room);
    if (volume) room.classList.add("scene-volume-ready");
    let rx = -16;
    let ry = -28;
    let dragging = false;
    let sx = 0;
    let sy = 0;
    const applyRotation = () => {
      room.style.setProperty("--rx", `${rx}deg`);
      room.style.setProperty("--ry", `${ry}deg`);
      room.style.setProperty("--rx-inverse", `${-rx}deg`);
      room.style.setProperty("--ry-inverse", `${-ry}deg`);
      volume == null ? void 0 : volume.setRotation(rx, ry);
    };
    const updateState = () => {
      const ar = lang2 === "ar";
      const state = {
        fire: room.dataset.fire === "on" ? ar ? "\u0645\u0634\u063A\u0651\u0644" : "on" : ar ? "\u0645\u062A\u0648\u0642\u0641" : "off",
        gravity: room.dataset.gravity === "earth" ? ar ? "\u0623\u0631\u0636\u064A\u0629" : "Earth" : ar ? "\u0635\u063A\u0631\u0649" : "microgravity",
        air: room.dataset.air === "on" ? ar ? "\u0645\u0641\u0639\u0644" : "on" : ar ? "\u0645\u062A\u0648\u0642\u0641" : "off",
        mist: room.dataset.mist === "on" ? ar ? "\u0638\u0627\u0647\u0631" : "shown" : ar ? "\u063A\u064A\u0631 \u0638\u0627\u0647\u0631" : "off",
        motion: motionPaused ? motionLabels.paused : motionLabels.running
      };
      if (note)
        note.textContent = ar ? `\u0627\u0644\u0645\u0635\u062F\u0631 ${state.fire} \xB7 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 ${state.gravity} \xB7 \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0642\u0633\u0631\u064A ${state.air} \xB7 \u0627\u0644\u0631\u0630\u0627\u0630 ${state.mist} \xB7 ${state.motion}. \u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0631\u0633\u0645 \u0646\u0648\u0639\u064A\u0627\u064B \u0641\u0642\u0637\u061B \u0644\u0627 \u064A\u062D\u0633\u0628 \u0627\u0644\u0625\u062E\u0645\u0627\u062F. ${volume ? rendererReady : rendererFallback}` : `Source ${state.fire} \xB7 gravity ${state.gravity} \xB7 forced airflow ${state.air} \xB7 mist ${state.mist} \xB7 ${state.motion}. The illustration is qualitative; extinction is not calculated. ${volume ? rendererReady : rendererFallback}`;
      volume == null ? void 0 : volume.update();
      for (const button of scene.querySelectorAll("[data-scene-key]")) {
        const active = room.dataset[button.dataset.sceneKey] === button.dataset.sceneValue;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      }
    };
    const applyMotion = () => {
      room.dataset.motion = motionPaused ? "paused" : "running";
      if (motionButton) motionButton.textContent = motionPaused ? motionLabels.resume : motionLabels.pause;
      if (motionPaused) volume == null ? void 0 : volume.pause();
      else volume == null ? void 0 : volume.resume();
    };
    applyRotation();
    applyMotion();
    updateState();
    room.addEventListener("flame-input", updateState);
    scene.querySelectorAll("[data-scene-key]").forEach((button) => {
      button.addEventListener("click", () => {
        room.dataset[button.dataset.sceneKey] = button.dataset.sceneValue;
        updateState();
      });
    });
    motionButton == null ? void 0 : motionButton.addEventListener("click", () => {
      motionPaused = !motionPaused;
      applyMotion();
      updateState();
    });
    (_b = scene.querySelector("[data-scene-reset]")) == null ? void 0 : _b.addEventListener("click", () => {
      rx = -16;
      ry = -28;
      applyRotation();
      stage.focus();
    });
    stage.addEventListener("pointerdown", (event) => {
      dragging = true;
      sx = event.clientX;
      sy = event.clientY;
      stage.setPointerCapture(event.pointerId);
    });
    stage.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      ry += (event.clientX - sx) * 0.45;
      rx = Math.max(-65, Math.min(30, rx - (event.clientY - sy) * 0.35));
      sx = event.clientX;
      sy = event.clientY;
      applyRotation();
    });
    const stopDrag = () => {
      dragging = false;
    };
    stage.addEventListener("pointerup", stopDrag);
    stage.addEventListener("pointercancel", stopDrag);
    stage.addEventListener("lostpointercapture", stopDrag);
    stage.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 12 : 5;
      if (event.key === "ArrowLeft") ry -= step;
      else if (event.key === "ArrowRight") ry += step;
      else if (event.key === "ArrowUp") rx = Math.max(-65, rx - step);
      else if (event.key === "ArrowDown") rx = Math.min(30, rx + step);
      else return;
      event.preventDefault();
      applyRotation();
    });
  }

  // public/lib/interactive-charts.js
  var NS = "http://www.w3.org/2000/svg";
  var COLORS = ["#1688be", "#d59a3d", "#39a77e", "#7d73d3", "#d36d7c", "#5077a8"];
  function linearFit(points) {
    if (points.length < 3) return null;
    const meanX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
    const meanY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
    const variance = points.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0);
    if (!variance) return null;
    const slope = points.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0) / variance;
    const intercept = meanY - slope * meanX;
    const total = points.reduce((sum, point) => sum + (point.y - meanY) ** 2, 0);
    const residual = points.reduce((sum, point) => sum + (point.y - intercept - slope * point.x) ** 2, 0);
    return { slope, intercept, r2: total ? 1 - residual / total : 1 };
  }
  function tick(value, digits = 3) {
    return Number(value.toFixed(digits)).toString();
  }
  function shouldDismissChartTooltip(pointerType, pinned) {
    return pointerType !== "touch" && !pinned;
  }
  function chartTooltipPosition({ clientX, clientY, viewportRect, tooltipRect, offset = 12, padding = 4 }) {
    const availableWidth = Math.max(0, viewportRect.width - padding * 2);
    const availableHeight = Math.max(0, viewportRect.height - padding * 2);
    const width = Math.min(tooltipRect.width || 240, availableWidth);
    const height = Math.min(tooltipRect.height || 64, availableHeight);
    const relativeX = clientX - viewportRect.left;
    const relativeY = clientY - viewportRect.top;
    let left = relativeX + offset;
    let top = relativeY + offset;
    if (left + width > viewportRect.width - padding) left = relativeX - width - offset;
    if (top + height > viewportRect.height - padding) top = relativeY - height - offset;
    return {
      left: Math.max(padding, Math.min(viewportRect.width - width - padding, left)),
      top: Math.max(padding, Math.min(viewportRect.height - height - padding, top))
    };
  }
  function clampChartView(next, original) {
    const width = Math.max(original.width / 8, Math.min(original.width * 8, next.width));
    const height = Math.max(original.height / 8, Math.min(original.height * 8, next.height));
    const minX = Math.min(original.x, original.x + original.width - width);
    const maxX = Math.max(original.x, original.x + original.width - width);
    const minY = Math.min(original.y, original.y + original.height - height);
    const maxY = Math.max(original.y, original.y + original.height - height);
    return {
      x: Math.max(minX, Math.min(maxX, next.x)),
      y: Math.max(minY, Math.min(maxY, next.y)),
      width,
      height
    };
  }
  function zoomChartView(current2, factor, anchorX, anchorY, original) {
    const scale = Math.max(1 / 8, Math.min(8, current2.width / original.width * factor));
    const width = original.width * scale;
    const height = original.height * scale;
    const rx = (anchorX - current2.x) / current2.width;
    const ry = (anchorY - current2.y) / current2.height;
    return clampChartView(
      {
        x: anchorX - width * rx,
        y: anchorY - height * ry,
        width,
        height
      },
      original
    );
  }
  function panChartView(current2, deltaX, deltaY, original) {
    return clampChartView(__spreadProps(__spreadValues({}, current2), { x: current2.x + deltaX, y: current2.y + deltaY }), original);
  }
  function pointerDeltaToChart({ deltaX, deltaY, rect, view }) {
    const viewRatio = view.width / view.height;
    const rectRatio = rect.width / rect.height;
    const contentWidth = rectRatio > viewRatio ? rect.height * viewRatio : rect.width;
    const contentHeight = rectRatio > viewRatio ? rect.height : rect.width / viewRatio;
    return {
      x: deltaX * view.width / contentWidth,
      y: deltaY * view.height / contentHeight
    };
  }
  function scientificScatter({
    rows,
    xKey,
    yKey,
    xLabel,
    yLabel,
    xUnit = "",
    yUnit = "",
    xFactor = 1,
    yFactor = 1,
    groupKey = "fuel",
    labels: labels2
  }) {
    const points = rows.filter((row) => Number.isFinite(row[xKey]) && Number.isFinite(row[yKey])).map((row) => ({
      row,
      x: row[xKey] * xFactor,
      y: row[yKey] * yFactor,
      group: String(row[groupKey] || "Unreported")
    }));
    if (!points.length) return '<div class="empty">No source rows contain both measurements.</div>';
    const base = { x: 0, y: 0, width: 800, height: 400 };
    const plot2 = { left: 86, right: 26, top: 24, bottom: 67 };
    const xMin = Math.min(...points.map((point) => point.x));
    const xMax = Math.max(...points.map((point) => point.x));
    const yMin = Math.min(0, ...points.map((point) => point.y));
    const yMax = Math.max(...points.map((point) => point.y));
    const xPad = (xMax - xMin) * 0.04 || Math.max(Math.abs(xMin) * 0.04, 0.01);
    const yPad = (yMax - yMin) * 0.06 || Math.max(Math.abs(yMax) * 0.06, 0.01);
    const domain = { xMin: xMin - xPad, xMax: xMax + xPad, yMin, yMax: yMax + yPad };
    const sx = (value) => plot2.left + (value - domain.xMin) / (domain.xMax - domain.xMin) * (base.width - plot2.left - plot2.right);
    const sy = (value) => base.height - plot2.bottom - (value - domain.yMin) / (domain.yMax - domain.yMin || 1) * (base.height - plot2.top - plot2.bottom);
    const groups = [...new Set(points.map((point) => point.group))];
    const colorByGroup = new Map(groups.map((group, index) => [group, COLORS[index % COLORS.length]]));
    const fits = groups.map((group) => [group, linearFit(points.filter((point) => point.group === group))]);
    const grid = Array.from({ length: 6 }, (_, index) => {
      const x = domain.xMin + (domain.xMax - domain.xMin) * index / 5;
      const y = domain.yMin + (domain.yMax - domain.yMin) * index / 5;
      return `<line x1="${sx(x)}" y1="${plot2.top}" x2="${sx(x)}" y2="${base.height - plot2.bottom}" class="chart-gridline"/><line x1="${plot2.left}" y1="${sy(y)}" x2="${base.width - plot2.right}" y2="${sy(y)}" class="chart-gridline"/><text x="${sx(x)}" y="${base.height - plot2.bottom + 19}" class="chart-tick" text-anchor="middle">${tick(x)}</text><text x="${plot2.left - 10}" y="${sy(y) + 4}" class="chart-tick" text-anchor="end">${tick(y)}</text>`;
    }).join("");
    const marks = points.map(({ row, x, y, group }) => {
      var _a;
      const info = `${row.id || `Test ${row.test}`} \xB7 ${row.fuel || "Fuel unreported"} \xB7 ${xLabel}: ${tick(x)} ${xUnit} \xB7 ${yLabel}: ${tick(y)} ${yUnit} \xB7 O\u2082 ${(row.oxygen_mole_fraction * 100).toFixed(1)}% \xB7 ${(_a = row.pressure_mmHg) != null ? _a : "\u2014"} mmHg \xB7 ${row.test_end || "End state unreported"}`;
      return `<circle class="chart-point" cx="${sx(x)}" cy="${sy(y)}" r="5" fill="${colorByGroup.get(group)}" fill-opacity=".82" tabindex="0" role="button" aria-label="${esc(info)}" data-info="${esc(info)}"><title>${esc(info)}</title></circle>`;
    }).join("");
    const legend = groups.map((group) => `<span><i style="--legend-color:${colorByGroup.get(group)}"></i>${esc(group)}</span>`).join("");
    const fitted = fits.filter(([, fit]) => fit);
    const fitSummary = fitted.length ? `${labels2.fit}: ${fitted.map(([group, fit]) => `${group}: y = ${tick(fit.intercept)} + ${tick(fit.slope)}x, R\xB2 = ${fit.r2.toFixed(3)} (n=${points.filter((point) => point.group === group).length})`).join(" \xB7 ")}` : `${labels2.fitUnavailable}`;
    const trend = fitted.map(
      ([group, fit]) => `<line class="chart-trendline" stroke="${colorByGroup.get(group)}" x1="${sx(domain.xMin)}" y1="${sy(fit.intercept + fit.slope * domain.xMin)}" x2="${sx(domain.xMax)}" y2="${sy(fit.intercept + fit.slope * domain.xMax)}" visibility="hidden"/>`
    ).join("");
    return `<section class="scientific-chart" data-chart-panel><div class="chart-toolbar" role="group" aria-label="${esc(labels2.controls)}"><button type="button" data-chart-action="zoom-in" aria-label="${esc(labels2.zoomIn)}">\uFF0B</button><button type="button" data-chart-action="zoom-out" aria-label="${esc(labels2.zoomOut)}">\u2212</button><button type="button" data-chart-action="reset">${esc(labels2.reset)}</button>${fitted.length ? `<button type="button" data-chart-action="fit" aria-pressed="false">${esc(labels2.fitLine)}</button>` : ""}<button type="button" data-chart-action="draw" aria-pressed="false" data-idle-label="${esc(labels2.drawLine)}" data-active-label="${esc(labels2.drawLineActive)}">${esc(labels2.drawLine)}</button><button type="button" data-chart-action="undo">${esc(labels2.undo)}</button></div><p class="chart-interaction-hint">${esc(labels2.interactionHint || "")}</p><div class="chart-viewport"><svg class="scientific-plot" viewBox="${base.x} ${base.y} ${base.width} ${base.height}" role="group" aria-label="${esc(`${xLabel} versus ${yLabel}`)}"><g class="chart-grid">${grid}</g><line x1="${plot2.left}" y1="${base.height - plot2.bottom}" x2="${base.width - plot2.right}" y2="${base.height - plot2.bottom}" class="chart-axis"/><line x1="${plot2.left}" y1="${plot2.top}" x2="${plot2.left}" y2="${base.height - plot2.bottom}" class="chart-axis"/><g class="chart-trend">${trend}</g><g class="chart-annotations"></g><g>${marks}</g><text x="${(plot2.left + base.width - plot2.right) / 2}" y="${base.height - 12}" class="chart-axis-label" text-anchor="middle">${esc(xLabel)}${xUnit ? ` (${esc(xUnit)})` : ""}</text><text transform="translate(18 ${(plot2.top + base.height - plot2.bottom) / 2}) rotate(-90)" class="chart-axis-label" text-anchor="middle">${esc(yLabel)}${yUnit ? ` (${esc(yUnit)})` : ""}</text></svg><div class="chart-tooltip" aria-hidden="true" hidden></div></div><div class="chart-selection" role="status" aria-live="polite" hidden><b>${esc(labels2.selectedPoint)}</b><span data-chart-selection-text></span></div><div class="chart-legend">${legend}</div><p class="sub chart-caption">${esc(labels2.rows)}: n=${points.length}/${rows.length} \xB7 ${esc(labels2.fitNote)} ${esc(fitSummary)}</p></section>`;
  }
  function chartControlLabels(lang2 = "en") {
    const ar = lang2 === "ar";
    return {
      controls: ar ? "\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0645\u062E\u0637\u0637" : "Chart controls",
      interactionHint: ar ? "\u0627\u0646\u0642\u0631 \u0646\u0642\u0637\u0629 \u0644\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644\u0647\u0627 \xB7 \u0627\u0633\u062D\u0628 \u0645\u0633\u0627\u062D\u0629 \u0641\u0627\u0631\u063A\u0629 \u0644\u0644\u062A\u062D\u0631\u064A\u0643 \xB7 \u0627\u0633\u062A\u062E\u062F\u0645 +/\u2212 \u0623\u0648 \u0627\u0644\u0639\u062C\u0644\u0629 \u0644\u0644\u062A\u0643\u0628\u064A\u0631 \xB7 \u0627\u062E\u062A\u0631 \u0631\u0633\u0645 \u062E\u0637 \u062B\u0645 \u0627\u0633\u062D\u0628 \u062E\u0637\u0627\u064B \u0625\u0631\u0634\u0627\u062F\u064A\u0627\u064B." : "Click a point for details \xB7 drag empty plot space to pan \xB7 use +/\u2212 or the wheel to zoom \xB7 choose Draw guide line, then drag.",
      zoomIn: ar ? "\u062A\u0643\u0628\u064A\u0631" : "Zoom in",
      zoomOut: ar ? "\u062A\u0635\u063A\u064A\u0631" : "Zoom out",
      reset: ar ? "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0639\u0631\u0636" : "Reset view",
      fitLine: ar ? "\u062E\u0637 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629" : "Linear fit",
      drawLine: ar ? "\u0627\u0631\u0633\u0645 \u062E\u0637\u0627\u064B \u0625\u0631\u0634\u0627\u062F\u064A\u0627\u064B" : "Draw guide line",
      drawLineActive: ar ? "\u0627\u0633\u062D\u0628 \u0644\u0631\u0633\u0645 \u0627\u0644\u062E\u0637 \xB7 \u0627\u0636\u063A\u0637 \u0644\u0644\u0625\u064A\u0642\u0627\u0641" : "Drag to draw \xB7 tap to stop",
      undo: ar ? "\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0627\u0644\u062E\u0637" : "Undo line",
      selectedPoint: ar ? "\u062A\u0641\u0627\u0635\u064A\u0644 \u0646\u0642\u0637\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0645\u062D\u062F\u062F\u0629" : "Selected source point details",
      fit: ar ? "\u0645\u0644\u0627\u0621\u0645\u0629 \u062E\u0637\u064A\u0629 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A\u0629" : "Exploratory linear fit",
      fitUnavailable: ar ? "\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629 (\u064A\u0644\u0632\u0645 3 \u0646\u0642\u0627\u0637 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644)" : "Fit unavailable (need at least 3 points)",
      fitNote: ar ? "\u0627\u0631\u062A\u0628\u0627\u0637 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A \u0641\u0642\u0637\u061B \u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0633\u0628\u0628\u064A\u0629." : "Exploratory association only; it does not show causation.",
      rows: ar ? "\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0635\u0627\u0644\u062D\u0629" : "Valid source rows",
      points: ar ? "\u0627\u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629" : "Plotted points",
      reference: ar ? "\u062E\u0637 \u0645\u0631\u062C\u0639\u064A" : "Reference line",
      zeroReference: ar ? "\u0635\u0641\u0631 \u0627\u0644\u062A\u063A\u064A\u0631" : "Zero-change reference",
      binRows: ar ? "\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0636\u0645\u0646 \u0627\u0644\u0641\u0626\u0629" : "Source rows in bin"
    };
  }
  function scientificSourceScatter({
    points,
    xLabel,
    yLabel,
    xUnit = "",
    yUnit = "",
    categories = null,
    identityReference = false,
    zeroReference = false,
    labels: labels2,
    sourceRowCount,
    validRowCount,
    captionNote = ""
  }) {
    if (!points.length) return '<div class="empty">No compatible numeric source rows for this plot.</div>';
    const base = { width: 800, height: 400 };
    const plot2 = { left: 86, right: 26, top: 24, bottom: 67 };
    const categoriesList = Array.isArray(categories) ? categories : null;
    const rawXMin = Math.min(...points.map((point) => point.x));
    const rawXMax = Math.max(...points.map((point) => point.x));
    const xPad = (rawXMax - rawXMin) * 0.04 || Math.max(Math.abs(rawXMin) * 0.04, 0.01);
    const yDataMin = Math.min(...points.map((point) => point.y));
    const yDataMax = Math.max(...points.map((point) => point.y));
    const yPad = (yDataMax - yDataMin) * 0.06 || Math.max(Math.abs(yDataMin) * 0.06, 0.01);
    const domain = {
      xMin: categoriesList ? -0.5 : rawXMin - xPad,
      xMax: categoriesList ? categoriesList.length - 0.5 : rawXMax + xPad,
      yMin: zeroReference ? Math.min(0, yDataMin - yPad) : yDataMin - yPad,
      yMax: zeroReference ? Math.max(0, yDataMax + yPad) : yDataMax + yPad
    };
    const sx = (value) => plot2.left + (value - domain.xMin) / (domain.xMax - domain.xMin) * (base.width - plot2.left - plot2.right);
    const sy = (value) => base.height - plot2.bottom - (value - domain.yMin) / (domain.yMax - domain.yMin || 1) * (base.height - plot2.top - plot2.bottom);
    const groups = [...new Set(points.map((point) => point.group).filter(Boolean))];
    const colors = ["#1688be", "#d59a3d", "#39a77e", "#7d73d3", "#d36d7c", "#5077a8"];
    const groupColor = new Map(groups.map((group, index) => [group, colors[index % colors.length]]));
    const xTicks = categoriesList ? categoriesList.map((label, index) => ({ value: index, label })) : Array.from({ length: 6 }, (_, index) => {
      const value = domain.xMin + (domain.xMax - domain.xMin) * index / 5;
      return { value, label: Number(value.toFixed(3)).toString() };
    });
    const yTicks = Array.from({ length: 6 }, (_, index) => {
      const value = domain.yMin + (domain.yMax - domain.yMin) * index / 5;
      return { value, label: Number(value.toFixed(3)).toString() };
    });
    const grid = xTicks.map(
      ({ value, label }) => [
        '<line x1="',
        sx(value),
        '" y1="',
        plot2.top,
        '" x2="',
        sx(value),
        '" y2="',
        base.height - plot2.bottom,
        '" class="chart-gridline"/>',
        '<text x="',
        sx(value),
        '" y="',
        base.height - plot2.bottom + 19,
        '" class="chart-tick" text-anchor="middle">',
        esc(label),
        "</text>"
      ].join("")
    ).join("") + yTicks.map(
      ({ value, label }) => [
        '<line x1="',
        plot2.left,
        '" y1="',
        sy(value),
        '" x2="',
        base.width - plot2.right,
        '" y2="',
        sy(value),
        '" class="chart-gridline"/>',
        '<text x="',
        plot2.left - 10,
        '" y="',
        sy(value) + 4,
        '" class="chart-tick" text-anchor="end">',
        esc(label),
        "</text>"
      ].join("")
    ).join("");
    const marks = points.map((point) => {
      const radius = Math.min(12, 4 + Math.sqrt(Math.max(1, point.count || 1)) * 1.25);
      const info = point.info + " \xB7 " + xLabel + ": " + point.xDisplay + (xUnit ? " " + xUnit : "") + " \xB7 " + yLabel + ": " + Number(point.y.toFixed(4)) + (yUnit ? " " + yUnit : "");
      const fill = groupColor.get(point.group) || "#1688be";
      return [
        '<circle class="chart-point" cx="',
        sx(point.x),
        '" cy="',
        sy(point.y),
        '" r="',
        radius,
        '" fill="',
        fill,
        '" fill-opacity=".82" tabindex="0" role="button" aria-label="',
        esc(info),
        '" data-info="',
        esc(info),
        '"><title>',
        esc(info),
        "</title></circle>"
      ].join("");
    }).join("");
    const groupLegend = groups.map(
      (group) => ['<span><i style="--legend-color:', groupColor.get(group), '"></i>', esc(group), "</span>"].join("")
    ).join("");
    let reference = "";
    let referenceLegend = "";
    if (identityReference) {
      const start = Math.max(domain.xMin, domain.yMin);
      const end = Math.min(domain.xMax, domain.yMax);
      if (end > start) {
        reference = '<line class="chart-reference-line" x1="' + sx(start) + '" y1="' + sy(start) + '" x2="' + sx(end) + '" y2="' + sy(end) + '"/>';
        referenceLegend = '<span class="chart-reference-key"><i></i>' + esc(labels2.reference) + " \xB7 y=x</span>";
      }
    }
    if (zeroReference && domain.yMin <= 0 && domain.yMax >= 0) {
      reference += '<line class="chart-reference-line" x1="' + plot2.left + '" y1="' + sy(0) + '" x2="' + (base.width - plot2.right) + '" y2="' + sy(0) + '"/>';
      referenceLegend += '<span class="chart-reference-key"><i></i>' + esc(labels2.zeroReference) + "</span>";
    }
    const legend = groupLegend + referenceLegend;
    const caption = labels2.rows + ": n=" + validRowCount + "/" + sourceRowCount + " \xB7 " + labels2.points + ": " + points.length + (captionNote ? " \xB7 " + captionNote : "");
    return [
      '<section class="scientific-chart" data-chart-panel>',
      '<div class="chart-toolbar" role="group" aria-label="',
      esc(labels2.controls),
      '">',
      '<button type="button" data-chart-action="zoom-in" aria-label="',
      esc(labels2.zoomIn),
      '">\uFF0B</button>',
      '<button type="button" data-chart-action="zoom-out" aria-label="',
      esc(labels2.zoomOut),
      '">\u2212</button>',
      '<button type="button" data-chart-action="reset">',
      esc(labels2.reset),
      "</button>",
      '<button type="button" data-chart-action="draw" aria-pressed="false" data-idle-label="',
      esc(labels2.drawLine),
      '" data-active-label="',
      esc(labels2.drawLineActive),
      '">',
      esc(labels2.drawLine),
      "</button>",
      '<button type="button" data-chart-action="undo">',
      esc(labels2.undo),
      "</button></div>",
      '<p class="chart-interaction-hint">',
      esc(labels2.interactionHint),
      "</p>",
      '<div class="chart-viewport"><svg class="scientific-plot" viewBox="0 0 800 400" role="group" aria-label="',
      esc(xLabel + " versus " + yLabel),
      '">',
      '<g class="chart-grid">',
      grid,
      "</g>",
      '<line class="chart-axis" x1="',
      plot2.left,
      '" y1="',
      plot2.top,
      '" x2="',
      plot2.left,
      '" y2="',
      base.height - plot2.bottom,
      '"/>',
      '<line class="chart-axis" x1="',
      plot2.left,
      '" y1="',
      base.height - plot2.bottom,
      '" x2="',
      base.width - plot2.right,
      '" y2="',
      base.height - plot2.bottom,
      '"/>',
      reference,
      '<g class="chart-annotations"></g>',
      marks,
      '<text x="',
      (plot2.left + base.width - plot2.right) / 2,
      '" y="',
      base.height - 12,
      '" class="chart-axis-label" text-anchor="middle">',
      esc(xLabel),
      xUnit ? " (" + esc(xUnit) + ")" : "",
      "</text>",
      '<text transform="translate(18 ',
      (plot2.top + base.height - plot2.bottom) / 2,
      ') rotate(-90)" class="chart-axis-label" text-anchor="middle">',
      esc(yLabel),
      yUnit ? " (" + esc(yUnit) + ")" : "",
      "</text>",
      '</svg><div class="chart-tooltip" aria-hidden="true" hidden></div></div>',
      '<div class="chart-selection" role="status" aria-live="polite" hidden><b>',
      esc(labels2.selectedPoint),
      "</b><span data-chart-selection-text></span></div>",
      legend ? '<div class="chart-legend">' + legend + "</div>" : "",
      '<p class="sub chart-caption">',
      esc(caption),
      "</p></section>"
    ].join("");
  }
  function scientificHistogram({ rows, key, label, unit = "", labels: labels2, idField = "id" }) {
    const data = rows.map((row) => ({ row, value: row[key] })).filter((point) => Number.isFinite(point.value));
    if (!data.length) return '<div class="empty">No measured values for ' + esc(label) + ".</div>";
    const min = Math.min(...data.map((point) => point.value));
    const max = Math.max(...data.map((point) => point.value));
    const bins = Math.max(5, Math.min(18, Math.ceil(Math.sqrt(data.length))));
    const span = max - min || Math.max(Math.abs(min) * 0.1, 1);
    const xMin = max === min ? min - span / 2 : min;
    const xMax = max === min ? max + span / 2 : max;
    const binWidth = (xMax - xMin) / bins;
    const groups = Array.from({ length: bins }, (_, index) => ({
      min: xMin + index * binWidth,
      max: xMin + (index + 1) * binWidth,
      rows: []
    }));
    data.forEach(({ row, value }) => {
      const index = Math.min(bins - 1, Math.max(0, Math.floor((value - xMin) / binWidth)));
      groups[index].rows.push(row);
    });
    const maxCount = Math.max(...groups.map((group) => group.rows.length), 1);
    const base = { width: 800, height: 400 };
    const plot2 = { left: 86, right: 26, top: 24, bottom: 67 };
    const yMax = maxCount * 1.14;
    const sx = (value) => plot2.left + (value - xMin) / (xMax - xMin) * (base.width - plot2.left - plot2.right);
    const sy = (value) => base.height - plot2.bottom - value / yMax * (base.height - plot2.top - plot2.bottom);
    const xTicks = Array.from({ length: 6 }, (_, index) => xMin + (xMax - xMin) * index / 5);
    const yTicks = Array.from({ length: 6 }, (_, index) => yMax * index / 5);
    const grid = xTicks.map(
      (value) => [
        '<line x1="',
        sx(value),
        '" y1="',
        plot2.top,
        '" x2="',
        sx(value),
        '" y2="',
        base.height - plot2.bottom,
        '" class="chart-gridline"/>',
        '<text x="',
        sx(value),
        '" y="',
        base.height - plot2.bottom + 19,
        '" class="chart-tick" text-anchor="middle">',
        Number(value.toFixed(3)).toString(),
        "</text>"
      ].join("")
    ).join("") + yTicks.map(
      (value) => [
        '<line x1="',
        plot2.left,
        '" y1="',
        sy(value),
        '" x2="',
        base.width - plot2.right,
        '" y2="',
        sy(value),
        '" class="chart-gridline"/>',
        '<text x="',
        plot2.left - 10,
        '" y="',
        sy(value) + 4,
        '" class="chart-tick" text-anchor="end">',
        Math.round(value),
        "</text>"
      ].join("")
    ).join("");
    const bars = groups.map((group) => {
      if (!group.rows.length) return "";
      const ids = group.rows.map((row) => row[idField] || row.test || "source row").slice(0, 6).join(", ");
      const remainder = group.rows.length > 6 ? ", +" + (group.rows.length - 6) : "";
      const info = label + ": " + Number(group.min.toFixed(4)) + "\u2013" + Number(group.max.toFixed(4)) + (unit ? " " + unit : "") + " \xB7 " + labels2.binRows + ": " + group.rows.length + " \xB7 " + ids + remainder;
      const left = sx(group.min);
      const right = sx(group.max);
      return [
        '<rect class="chart-point chart-histogram-bin" x="',
        left + 1,
        '" y="',
        sy(group.rows.length),
        '" width="',
        Math.max(1, right - left - 2),
        '" height="',
        base.height - plot2.bottom - sy(group.rows.length),
        '" fill="#1688be" fill-opacity=".78" tabindex="0" role="button" aria-label="',
        esc(info),
        '" data-info="',
        esc(info),
        '"><title>',
        esc(info),
        "</title></rect>"
      ].join("");
    }).join("");
    const caption = labels2.rows + ": n=" + data.length + "/" + rows.length + " \xB7 " + labels2.points + ": " + bins;
    return [
      '<section class="scientific-chart" data-chart-panel><div class="chart-toolbar" role="group" aria-label="',
      esc(labels2.controls),
      '">',
      '<button type="button" data-chart-action="zoom-in" aria-label="',
      esc(labels2.zoomIn),
      '">\uFF0B</button>',
      '<button type="button" data-chart-action="zoom-out" aria-label="',
      esc(labels2.zoomOut),
      '">\u2212</button>',
      '<button type="button" data-chart-action="reset">',
      esc(labels2.reset),
      "</button>",
      '<button type="button" data-chart-action="draw" aria-pressed="false" data-idle-label="',
      esc(labels2.drawLine),
      '" data-active-label="',
      esc(labels2.drawLineActive),
      '">',
      esc(labels2.drawLine),
      "</button>",
      '<button type="button" data-chart-action="undo">',
      esc(labels2.undo),
      "</button></div>",
      '<p class="chart-interaction-hint">',
      esc(labels2.interactionHint),
      "</p>",
      '<div class="chart-viewport"><svg class="scientific-plot" viewBox="0 0 800 400" role="group" aria-label="',
      esc(label + " distribution"),
      '">',
      '<g class="chart-grid">',
      grid,
      "</g>",
      '<line class="chart-axis" x1="',
      plot2.left,
      '" y1="',
      plot2.top,
      '" x2="',
      plot2.left,
      '" y2="',
      base.height - plot2.bottom,
      '"/>',
      '<line class="chart-axis" x1="',
      plot2.left,
      '" y1="',
      base.height - plot2.bottom,
      '" x2="',
      base.width - plot2.right,
      '" y2="',
      base.height - plot2.bottom,
      '"/>',
      '<g class="chart-annotations"></g>',
      bars,
      '<text x="',
      (plot2.left + base.width - plot2.right) / 2,
      '" y="',
      base.height - 12,
      '" class="chart-axis-label" text-anchor="middle">',
      esc(label),
      unit ? " (" + esc(unit) + ")" : "",
      "</text>",
      '<text transform="translate(18 ',
      (plot2.top + base.height - plot2.bottom) / 2,
      ') rotate(-90)" class="chart-axis-label" text-anchor="middle">',
      esc(labels2.binRows),
      "</text>",
      '</svg><div class="chart-tooltip" aria-hidden="true" hidden></div></div>',
      '<div class="chart-selection" role="status" aria-live="polite" hidden><b>',
      esc(labels2.selectedPoint),
      "</b><span data-chart-selection-text></span></div>",
      '<p class="sub chart-caption">',
      esc(caption),
      "</p></section>"
    ].join("");
  }
  function bindInteractiveCharts(root) {
    root.querySelectorAll("[data-chart-panel]").forEach((panel) => {
      if (panel.dataset.bound === "true") return;
      panel.dataset.bound = "true";
      const svg = panel.querySelector("svg");
      const tooltip = panel.querySelector(".chart-tooltip");
      const selection = panel.querySelector(".chart-selection");
      const selectionText = panel.querySelector("[data-chart-selection-text]");
      const initial = svg.viewBox.baseVal;
      const original = { x: initial.x, y: initial.y, width: initial.width, height: initial.height };
      const annotations = svg.querySelector(".chart-annotations");
      let drawing = false;
      let drag = null;
      let lineStart = null;
      let tooltipPinned = false;
      const view = () => svg.viewBox.baseVal;
      const setView = (next) => {
        const bounded = clampChartView(next, original);
        svg.setAttribute("viewBox", `${bounded.x} ${bounded.y} ${bounded.width} ${bounded.height}`);
      };
      const showPoint = (mark, event, persistent = false) => {
        tooltip.textContent = mark.dataset.info;
        tooltip.hidden = false;
        if (persistent && selection && selectionText) {
          selectionText.textContent = mark.dataset.info;
          selection.hidden = false;
        }
        const box = panel.querySelector(".chart-viewport").getBoundingClientRect();
        const keyboardClick = event.type === "click" && event.detail === 0;
        const bounds = chartTooltipPosition({
          clientX: keyboardClick ? box.left + box.width / 2 : event.clientX,
          clientY: keyboardClick ? box.top + box.height / 2 : event.clientY,
          viewportRect: box,
          tooltipRect: tooltip.getBoundingClientRect()
        });
        tooltip.style.left = `${bounds.left}px`;
        tooltip.style.top = `${bounds.top}px`;
      };
      const point = (event) => {
        const p = svg.createSVGPoint();
        p.x = event.clientX;
        p.y = event.clientY;
        return p.matrixTransform(svg.getScreenCTM().inverse());
      };
      const zoom = (factor, anchorX = view().x + view().width / 2, anchorY = view().y + view().height / 2) => {
        const current2 = view();
        setView(zoomChartView(current2, factor, anchorX, anchorY, original));
      };
      panel.querySelectorAll("[data-chart-action]").forEach((button) => {
        button.addEventListener("click", () => {
          var _a;
          const action = button.dataset.chartAction;
          if (action === "zoom-in") zoom(0.78);
          if (action === "zoom-out") zoom(1.28);
          if (action === "reset") setView(original);
          if (action === "fit") {
            const lines = [...svg.querySelectorAll(".chart-trendline")];
            const visible = lines.some((line) => line.getAttribute("visibility") !== "visible");
            lines.forEach((line) => line.setAttribute("visibility", visible ? "visible" : "hidden"));
            button.setAttribute("aria-pressed", String(visible));
          }
          if (action === "draw") {
            drawing = !drawing;
            button.setAttribute("aria-pressed", String(drawing));
            button.textContent = drawing ? button.dataset.activeLabel : button.dataset.idleLabel;
            svg.classList.toggle("drawing-line", drawing);
            lineStart = null;
          }
          if (action === "undo") (_a = annotations.lastElementChild) == null ? void 0 : _a.remove();
        });
      });
      svg.addEventListener(
        "wheel",
        (event) => {
          event.preventDefault();
          const p = point(event);
          zoom(event.deltaY < 0 ? 0.88 : 1.14, p.x, p.y);
        },
        { passive: false }
      );
      svg.addEventListener("pointerdown", (event) => {
        if (event.target.closest(".chart-point")) {
          tooltipPinned = true;
          showPoint(event.target.closest(".chart-point"), event, true);
          return;
        }
        tooltipPinned = false;
        tooltip.hidden = true;
        if (selection) selection.hidden = true;
        const p = point(event);
        if (drawing) {
          lineStart = p;
          const line = document.createElementNS(NS, "line");
          line.setAttribute("class", "chart-user-line");
          line.setAttribute("x1", p.x);
          line.setAttribute("y1", p.y);
          line.setAttribute("x2", p.x);
          line.setAttribute("y2", p.y);
          annotations.append(line);
          drag = { kind: "draw", pointerId: event.pointerId, line };
        } else {
          drag = { kind: "pan", pointerId: event.pointerId, x: event.clientX, y: event.clientY, view: __spreadValues({}, view()) };
        }
        svg.setPointerCapture(event.pointerId);
        event.preventDefault();
      });
      svg.addEventListener("pointermove", (event) => {
        var _a, _b;
        const mark = (_b = (_a = event.target).closest) == null ? void 0 : _b.call(_a, ".chart-point");
        if (mark && event.pointerType !== "touch") {
          tooltipPinned = false;
          showPoint(mark, event);
        }
        if (!drag || drag.pointerId !== event.pointerId) return;
        if (drag.kind === "draw") {
          const p = point(event);
          drag.line.setAttribute("x2", p.x);
          drag.line.setAttribute("y2", p.y);
        } else {
          const rect = svg.getBoundingClientRect();
          const delta = pointerDeltaToChart({
            deltaX: event.clientX - drag.x,
            deltaY: event.clientY - drag.y,
            rect,
            view: drag.view
          });
          setView(panChartView(drag.view, -delta.x, -delta.y, original));
          if (tooltip) tooltip.hidden = true;
        }
      });
      const stop = (event) => {
        if (!drag || drag.pointerId !== event.pointerId) return;
        if (drag.kind === "draw" && lineStart) {
          const end = point(event);
          if (Math.hypot(end.x - lineStart.x, end.y - lineStart.y) < 4) drag.line.remove();
        }
        drag = null;
        lineStart = null;
      };
      svg.addEventListener("pointerup", stop);
      svg.addEventListener("pointercancel", stop);
      svg.addEventListener("click", (event) => {
        var _a, _b;
        const mark = (_b = (_a = event.target).closest) == null ? void 0 : _b.call(_a, ".chart-point");
        if (!mark) return;
        tooltipPinned = true;
        showPoint(mark, event, true);
      });
      svg.addEventListener("keydown", (event) => {
        var _a, _b;
        if (event.key === "Escape") {
          tooltipPinned = false;
          tooltip.hidden = true;
          if (selection) selection.hidden = true;
          return;
        }
        const mark = (_b = (_a = event.target).closest) == null ? void 0 : _b.call(_a, ".chart-point");
        if (mark && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          tooltipPinned = true;
          showPoint(mark, __spreadProps(__spreadValues({}, event), { type: "click", detail: 0 }), true);
        }
      });
      svg.addEventListener("pointerleave", (event) => {
        if (tooltip && shouldDismissChartTooltip(event.pointerType, tooltipPinned)) tooltip.hidden = true;
      });
    });
  }

  // public/lib/source-chart-guide.js
  var bilingual = (en, ar) => ({ en, ar });
  function plot(id, studyId, xField, yField, xUnit, yUnit, title, question, purpose, limit, extra = {}) {
    return __spreadValues({
      id,
      studyId,
      xField,
      yField,
      xUnit,
      yUnit,
      title,
      question,
      purpose,
      limit
    }, extra);
  }
  var SOURCE_STUDY_CHARTS = [
    plot(
      "psi20-ignitions-burner-size",
      "PSI-20",
      "Burner Size (mm)",
      "Flames Ignited",
      "mm",
      "reported daily count",
      bilingual("Reported ignitions by burner size", "\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u062D\u0633\u0628 \u062D\u062C\u0645 \u0627\u0644\u0645\u0648\u0642\u062F"),
      bilingual(
        "How do the source-day ignition counts sit across the listed burner sizes?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0639\u0644\u0649 \u0623\u062D\u062C\u0627\u0645 \u0627\u0644\u0645\u0648\u0627\u0642\u062F \u0627\u0644\u0645\u062F\u0631\u062C\u0629\u061F"
      ),
      bilingual("Inspect reported day summaries by burner size.", "\u0642\u0627\u0631\u0646 \u0645\u0644\u062E\u0635\u0627\u062A \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u062D\u0633\u0628 \u062D\u062C\u0645 \u0627\u0644\u0645\u0648\u0642\u062F."),
      bilingual(
        "Rows summarize days, not individual trials. Oxygen mixtures and chamber pressure vary and are not paired to each count.",
        "\u0627\u0644\u0635\u0641\u0648\u0641 \u062A\u0644\u062E\u0635 \u0623\u064A\u0627\u0645\u0627\u064B \u0644\u0627 \u062A\u062C\u0627\u0631\u0628 \u0645\u0646\u0641\u0631\u062F\u0629. \u062A\u062E\u062A\u0644\u0641 \u0645\u062E\u0627\u0644\u064A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0636\u063A\u0637 \u0627\u0644\u062D\u062C\u0631\u0629 \u0648\u0644\u0627 \u062A\u0631\u062A\u0628\u0637 \u0643\u0644 \u0642\u064A\u0645\u0629 \u0645\u0646\u0647\u0627 \u0628\u0639\u062F\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644."
      ),
      {
        groupField: "Fuel Bottle",
        rowIdField: "Date",
        detailFields: ["Year", "Month", "Fuel Bottle", "Oxygen Conc (percent)"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi20-ignitions-year",
      "PSI-20",
      "Year",
      "Flames Ignited",
      "year",
      "reported daily count",
      bilingual("Reported ignition counts across recorded years", "\u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0628\u0631 \u0627\u0644\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u0648\u0627\u0631\u062F\u0629"),
      bilingual(
        "How do the daily ignition summaries sit across the years listed in the source?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u0645\u0644\u062E\u0635\u0627\u062A \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u0645\u062F\u0631\u062C\u0629 \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631\u061F"
      ),
      bilingual(
        "Inspect the time coverage and year-to-year source summaries by fuel label.",
        "\u0627\u0641\u062D\u0635 \u0627\u0644\u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u0648\u0645\u0644\u062E\u0635\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0633\u0646\u0648\u064A\u0629 \u0628\u062D\u0633\u0628 \u062A\u0633\u0645\u064A\u0629 \u0627\u0644\u0648\u0642\u0648\u062F."
      ),
      bilingual(
        "Rows summarize source days; year, fuel, oxygen mixture, and chamber pressure vary together. This is not a controlled performance trend.",
        "\u062A\u0644\u062E\u0635 \u0627\u0644\u0635\u0641\u0648\u0641 \u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0635\u062F\u0631\u061B \u0648\u062A\u062A\u063A\u064A\u0631 \u0627\u0644\u0633\u0646\u0629 \u0648\u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0645\u0632\u064A\u062C \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0636\u063A\u0637 \u0627\u0644\u062D\u062C\u0631\u0629 \u0645\u0639\u0627\u064B. \u0644\u0627 \u064A\u0645\u062B\u0644 \u0630\u0644\u0643 \u0627\u062A\u062C\u0627\u0647\u0627\u064B \u0645\u0636\u0628\u0648\u0637\u0627\u064B \u0644\u0644\u0623\u062F\u0627\u0621."
      ),
      {
        groupField: "Fuel Bottle",
        rowIdField: "Date",
        detailFields: ["Month", "Date", "Fuel Bottle", "Oxygen Conc (percent)"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi21-ignitions-fuel-mfc",
      "PSI-21",
      "Fuel MFC",
      "Flames ignited",
      "source units not stated",
      "reported test-day count",
      bilingual("Reported ignitions by fuel MFC setting", "\u0627\u0644\u0625\u0634\u0639\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u062D\u0633\u0628 \u0625\u0639\u062F\u0627\u062F \u0645\u062A\u062D\u0643\u0645 \u062A\u062F\u0641\u0642 \u0627\u0644\u0648\u0642\u0648\u062F"),
      bilingual(
        "How are test-day ignition counts distributed across the source fuel-MFC settings?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0639\u0644\u0649 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u062A\u062D\u0643\u0645 \u0627\u0644\u0648\u0642\u0648\u062F \u0643\u0645\u0627 \u0648\u0631\u062F\u062A \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631\u061F"
      ),
      bilingual(
        "Inspect the recorded settings and counts; values retain the source field and unit convention.",
        "\u0627\u0641\u062D\u0635 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0645\u0639 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 \u062A\u0633\u0645\u064A\u0629 \u0627\u0644\u062D\u0642\u0644 \u0648\u0648\u062D\u062F\u062A\u0647 \u0643\u0645\u0627 \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631."
      ),
      bilingual(
        "Rows are test-day summaries. The source does not state MFC units here; fuel, nitrogen setting, and procedure also vary.",
        "\u0627\u0644\u0635\u0641\u0648\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u0644\u0627 \u064A\u062D\u062F\u062F \u0627\u0644\u0645\u0635\u062F\u0631 \u0647\u0646\u0627 \u0648\u062D\u062F\u0627\u062A MFC\u061B \u0643\u0645\u0627 \u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621."
      ),
      {
        groupField: "Fuel Bottle",
        rowIdField: "Test Day",
        detailFields: ["Test Type", "Fuel Bottle", "N2 MFC", "Fuel conc. Range"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi21-ignitions-n2-mfc",
      "PSI-21",
      "N2 MFC",
      "Flames ignited",
      "source units not stated",
      "reported test-day count",
      bilingual("Reported ignitions by nitrogen MFC setting", "\u0627\u0644\u0625\u0634\u0639\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u062D\u0633\u0628 \u0625\u0639\u062F\u0627\u062F \u0645\u062A\u062D\u0643\u0645 \u062A\u062F\u0641\u0642 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646"),
      bilingual(
        "How are test-day ignition counts distributed across the source nitrogen-MFC settings?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0639\u0644\u0649 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u062A\u062D\u0643\u0645 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631\u061F"
      ),
      bilingual(
        "Inspect the recorded nitrogen settings and counts without inferring a unit.",
        "\u0627\u0641\u062D\u0635 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0648\u0627\u0644\u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0645\u0646 \u062F\u0648\u0646 \u0627\u0641\u062A\u0631\u0627\u0636 \u0648\u062D\u062F\u0629 \u0642\u064A\u0627\u0633."
      ),
      bilingual(
        "Rows are test-day summaries and do not isolate nitrogen flow from fuel, concentration, or procedure.",
        "\u0627\u0644\u0635\u0641\u0648\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0644\u0627 \u062A\u0639\u0632\u0644 \u062A\u062F\u0641\u0642 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0639\u0646 \u0627\u0644\u0648\u0642\u0648\u062F \u0623\u0648 \u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0623\u0648 \u0627\u0644\u0625\u062C\u0631\u0627\u0621."
      ),
      {
        groupField: "Fuel Bottle",
        rowIdField: "Test Day",
        detailFields: ["Test Type", "Fuel Bottle", "Fuel MFC", "Fuel conc. Range"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi21-ignitions-test-day",
      "PSI-21",
      "Test Day",
      "Flames ignited",
      "source test-day label",
      "reported test-day count",
      bilingual("Reported ignition counts across PSI-21 test days", "\u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0628\u0631 \u0623\u064A\u0627\u0645 \u0627\u062E\u062A\u0628\u0627\u0631 PSI-21"),
      bilingual(
        "How do the ignition summaries vary over the listed test-day sequence?",
        "\u0643\u064A\u0641 \u062A\u062E\u062A\u0644\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0639\u0628\u0631 \u062A\u0633\u0644\u0633\u0644 \u0623\u064A\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u062F\u0631\u062C\u061F"
      ),
      bilingual(
        "Review coverage and recorded counts by day, with fuel bottle shown separately.",
        "\u0631\u0627\u062C\u0639 \u062A\u063A\u0637\u064A\u0629 \u0648\u0639\u062F\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644\u0627\u062A \u0628\u062D\u0633\u0628 \u0627\u0644\u064A\u0648\u0645 \u0645\u0639 \u0625\u0638\u0647\u0627\u0631 \u0639\u0628\u0648\u0629 \u0627\u0644\u0648\u0642\u0648\u062F \u0645\u0646\u0641\u0635\u0644\u0629."
      ),
      bilingual(
        "These are day summaries, not independent flames. Fuel, nitrogen flow, concentration, and procedures change across days.",
        "\u0647\u0630\u0647 \u0645\u0644\u062E\u0635\u0627\u062A \u0623\u064A\u0627\u0645 \u0648\u0644\u064A\u0633\u062A \u0623\u0644\u0633\u0646\u0629 \u0644\u0647\u0628 \u0645\u0633\u062A\u0642\u0644\u0629. \u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u062A\u062F\u0641\u0642 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0648\u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0628\u064A\u0646 \u0627\u0644\u0623\u064A\u0627\u0645."
      ),
      {
        groupField: "Fuel Bottle",
        rowIdField: "Test Day",
        detailFields: ["Test Type", "Fuel Bottle", "Fuel MFC", "N2 MFC", "Fuel conc. Range"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi22-ignitions-fuel-concentration",
      "PSI-22",
      "Fuel Conc",
      "Flames Ignited",
      "as labelled in source",
      "reported count",
      bilingual("Reported ignitions by fuel concentration label", "\u0627\u0644\u0625\u0634\u0639\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u062D\u0633\u0628 \u062A\u0633\u0645\u064A\u0629 \u062A\u0631\u0643\u064A\u0632 \u0627\u0644\u0648\u0642\u0648\u062F"),
      bilingual(
        "What ignition counts were reported for each source concentration label and mesh polarity?",
        "\u0645\u0627 \u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0644\u0643\u0644 \u062A\u0633\u0645\u064A\u0629 \u062A\u0631\u0643\u064A\u0632 \u0648\u0642\u0637\u0628\u064A\u0629 \u0634\u0628\u0643\u0629 \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631\u061F"
      ),
      bilingual(
        "Compare the observed day summaries by concentration label; colors separate mesh polarity.",
        "\u0642\u0627\u0631\u0646 \u0645\u0644\u062E\u0635\u0627\u062A \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629 \u0628\u062D\u0633\u0628 \u062A\u0633\u0645\u064A\u0629 \u0627\u0644\u062A\u0631\u0643\u064A\u0632\u061B \u0648\u064A\u0641\u0635\u0644 \u0627\u0644\u0644\u0648\u0646 \u0642\u0637\u0628\u064A\u0629 \u0627\u0644\u0634\u0628\u0643\u0629."
      ),
      bilingual(
        "Only 21 rows have a numeric ignition count. These are day summaries, not per-flame outcomes or a controlled concentration-only test.",
        "\u064A\u0648\u062C\u062F \u0639\u062F\u062F \u0625\u0634\u0639\u0627\u0644 \u0631\u0642\u0645\u064A \u0641\u064A 21 \u0635\u0641\u0627\u064B \u0641\u0642\u0637. \u0647\u0630\u0647 \u0645\u0644\u062E\u0635\u0627\u062A \u0623\u064A\u0627\u0645 \u0648\u0644\u064A\u0633\u062A \u0646\u062A\u0627\u0626\u062C \u0644\u0643\u0644 \u0644\u0647\u0628 \u0623\u0648 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u064B \u0645\u0636\u0628\u0648\u0637\u0627\u064B \u0644\u0644\u062A\u0631\u0643\u064A\u0632 \u0648\u062D\u062F\u0647."
      ),
      {
        xCategory: true,
        groupField: "Mesh Polarity",
        rowIdField: "Test Day",
        detailFields: ["Mesh Polarity", "Fuel Bottle", "Fuel Conc"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi22-ignitions-test-day",
      "PSI-22",
      "Test Day",
      "Flames Ignited",
      "source test-day label",
      "reported count",
      bilingual("Reported ignition counts across PSI-22 test days", "\u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0628\u0631 \u0623\u064A\u0627\u0645 \u0627\u062E\u062A\u0628\u0627\u0631 PSI-22"),
      bilingual(
        "How do the daily ignition summaries vary across the PSI-22 source sequence?",
        "\u0643\u064A\u0641 \u062A\u062E\u062A\u0644\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0639\u0628\u0631 \u062A\u0633\u0644\u0633\u0644 PSI-22 \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631\u061F"
      ),
      bilingual(
        "Inspect reported day coverage and retain mesh polarity as a color group.",
        "\u0627\u0641\u062D\u0635 \u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0645\u0639 \u062A\u0645\u064A\u064A\u0632 \u0642\u0637\u0628\u064A\u0629 \u0627\u0644\u0634\u0628\u0643\u0629 \u0628\u0627\u0644\u0623\u0644\u0648\u0627\u0646."
      ),
      bilingual(
        "These are daily summaries; fuel concentration, mesh polarity, and other conditions vary. They are not per-flame outcomes.",
        "\u0647\u0630\u0647 \u0645\u0644\u062E\u0635\u0627\u062A \u064A\u0648\u0645\u064A\u0629\u061B \u0648\u064A\u062A\u063A\u064A\u0631 \u062A\u0631\u0643\u064A\u0632 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0642\u0637\u0628\u064A\u0629 \u0627\u0644\u0634\u0628\u0643\u0629 \u0648\u0638\u0631\u0648\u0641 \u0623\u062E\u0631\u0649. \u0644\u064A\u0633\u062A \u0646\u062A\u0627\u0626\u062C \u0644\u0643\u0644 \u0644\u0647\u0628."
      ),
      {
        groupField: "Mesh Polarity",
        rowIdField: "Test Day",
        detailFields: ["Mesh Polarity", "Fuel Bottle", "Fuel Conc"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi23-ignitions-test-day",
      "PSI-23",
      "Test Day*",
      "Flames Ignited*",
      "source test-day label",
      "reported daily count",
      bilingual("Reported ignitions by PSI-23 test-day label", "\u0627\u0644\u0625\u0634\u0639\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u062D\u0633\u0628 \u062A\u0633\u0645\u064A\u0629 \u064A\u0648\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 PSI-23"),
      bilingual(
        "How do the reported ignition counts vary across the source test-day labels?",
        "\u0643\u064A\u0641 \u062A\u062E\u062A\u0644\u0641 \u0623\u0639\u062F\u0627\u062F \u0627\u0644\u0625\u0634\u0639\u0627\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0628\u0631 \u062A\u0633\u0645\u064A\u0627\u062A \u0623\u064A\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631\u061F"
      ),
      bilingual(
        "Inspect the source-day sequence with atmosphere labels in each point detail.",
        "\u0627\u0633\u062A\u0639\u0631\u0636 \u062A\u0633\u0644\u0633\u0644 \u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u0635\u062F\u0631 \u0645\u0639 \u062A\u0633\u0645\u064A\u0629 \u0627\u0644\u062C\u0648 \u062F\u0627\u062E\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0643\u0644 \u0646\u0642\u0637\u0629."
      ),
      bilingual(
        "The asterisked fields and source notation are preserved. Test-day labels are not elapsed time, and the table does not report flame structure or extinction rate.",
        "\u0623\u064F\u0628\u0642\u064A\u062A \u0627\u0644\u062D\u0642\u0648\u0644 \u0630\u0627\u062A \u0627\u0644\u0646\u062C\u0645\u0629 \u0648\u062A\u062F\u0648\u064A\u0646 \u0627\u0644\u0645\u0635\u062F\u0631 \u0643\u0645\u0627 \u0647\u064A. \u062A\u0633\u0645\u064A\u0627\u062A \u064A\u0648\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0644\u064A\u0633\u062A \u0632\u0645\u0646\u0627\u064B \u0645\u0646\u0642\u0636\u064A\u0627\u064B\u060C \u0648\u0627\u0644\u062C\u062F\u0648\u0644 \u0644\u0627 \u064A\u0633\u062C\u0644 \u0628\u0646\u064A\u0629 \u0627\u0644\u0644\u0647\u0628 \u0623\u0648 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u0646\u0637\u0641\u0627\u0621."
      ),
      { rowIdField: "Test Day*", detailFields: ["Atmosphere*", "Fuel Bottle"], aggregateDuplicates: true }
    ),
    plot(
      "psi25-o2-initial-final",
      "PSI-25",
      "Calibrated  initial O2 % by vol",
      "Calibrated final O2 % by vol",
      "% by volume",
      "% by volume",
      bilingual("Initial versus final oxygen readings", "\u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629"),
      bilingual(
        "Which source records show a change between the initial and final O\u2082 readings?",
        "\u0623\u064A \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u062A\u0638\u0647\u0631 \u0641\u0631\u0642\u0627\u064B \u0628\u064A\u0646 \u0642\u0631\u0627\u0621\u062A\u064A O\u2082 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629\u061F"
      ),
      bilingual(
        "The dashed 1:1 line marks equal readings; select a point to inspect its test and material.",
        "\u064A\u0645\u062B\u0644 \u0627\u0644\u062E\u0637 \u0627\u0644\u0645\u062A\u0642\u0637\u0639 1:1 \u062A\u0633\u0627\u0648\u064A \u0627\u0644\u0642\u0631\u0627\u0621\u062A\u064A\u0646\u061B \u0627\u062E\u062A\u0631 \u0646\u0642\u0637\u0629 \u0644\u0641\u062D\u0635 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0627\u0644\u0645\u0627\u062F\u0629."
      ),
      bilingual(
        "This is a paired sensor-reading comparison, not a controlled oxygen-effect or flame-spread analysis. Missing final readings are omitted.",
        "\u0647\u0630\u0647 \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u064A\u0646 \u0642\u0631\u0627\u0621\u062A\u064A\u0646 \u0644\u0644\u062D\u0633\u0627\u0633 \u0641\u064A \u0627\u0644\u0633\u062C\u0644 \u0646\u0641\u0633\u0647\u060C \u0648\u0644\u064A\u0633\u062A \u062A\u062D\u0644\u064A\u0644\u0627\u064B \u0645\u0636\u0628\u0648\u0637\u0627\u064B \u0644\u0623\u062B\u0631 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0648 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628. \u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0627\u0644\u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629."
      ),
      {
        rowIdField: "Test #",
        detailFields: ["Date", "Fuel Sample Material"],
        aggregateDuplicates: true,
        identityReference: true
      }
    ),
    plot(
      "psi25-o2-change",
      "PSI-25",
      "Calibrated  initial O2 % by vol",
      "Calibrated final O2 % by vol",
      "% by volume",
      "percentage points",
      bilingual("Within-record oxygen change", "\u0627\u0644\u062A\u063A\u064A\u0631 \u0641\u064A \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u062F\u0627\u062E\u0644 \u0633\u062C\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631"),
      bilingual(
        "How large and in which direction is the final-minus-initial O\u2082 change in each paired record?",
        "\u0645\u0627 \u0645\u0642\u062F\u0627\u0631 \u0648\u0627\u062A\u062C\u0627\u0647 \u0641\u0631\u0642 O\u2082 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0646\u0627\u0642\u0635 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A \u0641\u064A \u0643\u0644 \u0633\u062C\u0644 \u0645\u0632\u062F\u0648\u062C\u061F"
      ),
      bilingual(
        "The zero line separates records with no net change from positive or negative changes; select a point to inspect both readings.",
        "\u064A\u0641\u0635\u0644 \u0627\u0644\u0635\u0641\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0628\u0644\u0627 \u062A\u063A\u064A\u0631 \u0635\u0627\u0641\u064D \u0639\u0646 \u0627\u0644\u062A\u063A\u064A\u0631 \u0627\u0644\u0645\u0648\u062C\u0628 \u0623\u0648 \u0627\u0644\u0633\u0627\u0644\u0628\u061B \u0627\u062E\u062A\u0631 \u0646\u0642\u0637\u0629 \u0644\u0641\u062D\u0635 \u0627\u0644\u0642\u0631\u0627\u0621\u062A\u064A\u0646."
      ),
      bilingual(
        "The paired difference is descriptive for this test record. Conditions and material vary, and it does not establish a suppression effect.",
        "\u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0645\u0632\u062F\u0648\u062C \u0648\u0635\u0641 \u0644\u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061B \u062A\u062E\u062A\u0644\u0641 \u0627\u0644\u0638\u0631\u0648\u0641 \u0648\u0627\u0644\u0645\u0627\u062F\u0629 \u0648\u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062B\u0631 \u0627\u0644\u0625\u062E\u0645\u0627\u062F."
      ),
      {
        yDeltaFrom: "Calibrated  initial O2 % by vol",
        zeroReference: true,
        yAxisLabel: bilingual("\u0394 O\u2082 (final \u2212 initial)", "\u0394 O\u2082 (\u0627\u0644\u0646\u0647\u0627\u0626\u064A \u2212 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A)"),
        yAxisUnit: "percentage points",
        rowIdField: "Test #",
        detailFields: ["Date", "Fuel Sample Material", "Calibrated  initial O2 % by vol", "Calibrated final O2 % by vol"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi25-co2-initial-final",
      "PSI-25",
      "Initial CO2 % by vol",
      "Final CO2 % by vol",
      "% by volume",
      "% by volume",
      bilingual("Initial versus final carbon-dioxide readings", "\u0642\u0631\u0627\u0621\u0627\u062A \u062B\u0627\u0646\u064A \u0623\u0643\u0633\u064A\u062F \u0627\u0644\u0643\u0631\u0628\u0648\u0646 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629"),
      bilingual(
        "Which source records differ between initial and final CO\u2082 readings?",
        "\u0623\u064A \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u062A\u062E\u062A\u0644\u0641 \u0641\u064A\u0647\u0627 \u0642\u0631\u0627\u0621\u0629 CO\u2082 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 \u0639\u0646 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629\u061F"
      ),
      bilingual(
        "The dashed 1:1 line marks equal readings; select a point to inspect its test and material.",
        "\u064A\u0645\u062B\u0644 \u0627\u0644\u062E\u0637 \u0627\u0644\u0645\u062A\u0642\u0637\u0639 1:1 \u062A\u0633\u0627\u0648\u064A \u0627\u0644\u0642\u0631\u0627\u0621\u062A\u064A\u0646\u061B \u0627\u062E\u062A\u0631 \u0646\u0642\u0637\u0629 \u0644\u0641\u062D\u0635 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0627\u0644\u0645\u0627\u062F\u0629."
      ),
      bilingual(
        "Values are paired source readings; material, ventilation display, and test conditions vary. Missing cells remain missing.",
        "\u0627\u0644\u0642\u064A\u0645 \u0642\u0631\u0627\u0621\u0627\u062A \u0645\u0635\u062F\u0631 \u0645\u0632\u062F\u0648\u062C\u0629\u061B \u0648\u062A\u062E\u062A\u0644\u0641 \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0639\u0631\u0636 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u062A\u0628\u0642\u0649 \u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629 \u0645\u0641\u0642\u0648\u062F\u0629."
      ),
      {
        rowIdField: "Test #",
        detailFields: ["Date", "Fuel Sample Material"],
        aggregateDuplicates: true,
        identityReference: true
      }
    ),
    plot(
      "psi25-co2-change",
      "PSI-25",
      "Initial CO2 % by vol",
      "Final CO2 % by vol",
      "% by volume",
      "percentage points",
      bilingual("Within-record carbon-dioxide change", "\u0627\u0644\u062A\u063A\u064A\u0631 \u0641\u064A \u062B\u0627\u0646\u064A \u0623\u0643\u0633\u064A\u062F \u0627\u0644\u0643\u0631\u0628\u0648\u0646 \u062F\u0627\u062E\u0644 \u0633\u062C\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631"),
      bilingual(
        "What final-minus-initial CO\u2082 change is recorded for each paired observation?",
        "\u0645\u0627 \u0641\u0631\u0642 CO\u2082 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0646\u0627\u0642\u0635 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A \u0627\u0644\u0645\u0633\u062C\u0644 \u0644\u0643\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0632\u062F\u0648\u062C\u0629\u061F"
      ),
      bilingual(
        "Inspect the signed paired change and read both original concentrations from a selected point.",
        "\u0627\u0641\u062D\u0635 \u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0645\u0632\u062F\u0648\u062C \u0628\u0625\u0634\u0627\u0631\u062A\u0647 \u0648\u0627\u0642\u0631\u0623 \u0627\u0644\u062A\u0631\u0643\u064A\u0632\u064A\u0646 \u0627\u0644\u0623\u0635\u0644\u064A\u064A\u0646 \u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0646\u0642\u0637\u0629."
      ),
      bilingual(
        "The table combines different material and test conditions. A paired change is not a causal material or ventilation effect.",
        "\u064A\u062C\u0645\u0639 \u0627\u0644\u062C\u062F\u0648\u0644 \u0645\u0648\u0627\u062F \u0648\u0638\u0631\u0648\u0641 \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u062E\u062A\u0644\u0641\u0629\u061B \u0648\u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0645\u0632\u062F\u0648\u062C \u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062B\u0631\u0627\u064B \u0633\u0628\u0628\u064A\u0627\u064B \u0644\u0644\u0645\u0627\u062F\u0629 \u0623\u0648 \u0627\u0644\u062A\u0647\u0648\u064A\u0629."
      ),
      {
        yDeltaFrom: "Initial CO2 % by vol",
        zeroReference: true,
        yAxisLabel: bilingual("\u0394 CO\u2082 (final \u2212 initial)", "\u0394 CO\u2082 (\u0627\u0644\u0646\u0647\u0627\u0626\u064A \u2212 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A)"),
        yAxisUnit: "percentage points",
        rowIdField: "Test #",
        detailFields: ["Date", "Fuel Sample Material", "Initial CO2 % by vol", "Final CO2 % by vol"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi25-co-initial-final",
      "PSI-25",
      "Initial CO (ppm)",
      "Final CO (ppm)",
      "ppm",
      "ppm",
      bilingual("Initial versus final carbon-monoxide readings", "\u0642\u0631\u0627\u0621\u0627\u062A \u0623\u0648\u0644 \u0623\u0643\u0633\u064A\u062F \u0627\u0644\u0643\u0631\u0628\u0648\u0646 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629"),
      bilingual(
        "Which source records differ between initial and final CO readings?",
        "\u0623\u064A \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u062A\u062E\u062A\u0644\u0641 \u0641\u064A\u0647\u0627 \u0642\u0631\u0627\u0621\u0629 CO \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 \u0639\u0646 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629\u061F"
      ),
      bilingual(
        "The dashed 1:1 line marks equal readings; negative values are retained as published.",
        "\u064A\u0645\u062B\u0644 \u0627\u0644\u062E\u0637 \u0627\u0644\u0645\u062A\u0642\u0637\u0639 1:1 \u062A\u0633\u0627\u0648\u064A \u0627\u0644\u0642\u0631\u0627\u0621\u062A\u064A\u0646\u061B \u0648\u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0633\u0627\u0644\u0628\u0629 \u0643\u0645\u0627 \u0646\u064F\u0634\u0631\u062A."
      ),
      bilingual(
        "NASA reports initial and final CO readings from a 0\u20131,000 ppm sensor in the 250-L MSG working volume; these are endpoints, not time-resolved peaks or cabin-wide concentrations. One test exceeded the sensor range. NASA\u2019s ~1.5 ppm U.S. Lab value is a dilution estimate, not an in-situ reading. This plot does not estimate a material effect; missing cells remain missing.",
        "\u0647\u0630\u0647 \u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 \u0648\u0646\u0647\u0627\u0626\u064A\u0629 \u0628\u062D\u0633\u0627\u0633 CO \u0645\u062F\u0627\u0647 0\u20131,000 ppm \u062F\u0627\u062E\u0644 \u062D\u062C\u0631\u0629 MSG \u062D\u062C\u0645\u0647\u0627 250 \u0644\u062A\u0631\u060C \u0648\u0644\u064A\u0633\u062A \u0642\u064A\u0627\u0633\u0627\u064B \u0632\u0645\u0646\u064A\u0627\u064B \u0644\u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0627\u0644\u0630\u0631\u0648\u0629 \u0623\u0648 \u062A\u0631\u0643\u064A\u0632\u0627\u064B \u0644\u0644\u0645\u062D\u0637\u0629 \u0643\u0644\u0647\u0627. \u062A\u062C\u0627\u0648\u0632 \u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0627\u062D\u062F \u0645\u062F\u0649 \u0627\u0644\u062D\u0633\u0627\u0633\u061B \u0648\u062A\u0642\u062F\u064A\u0631 NASA \u0628\u0646\u062D\u0648 1.5 ppm \u0628\u0639\u062F \u0627\u0644\u062A\u062E\u0641\u064A\u0641 \u0641\u064A \u0645\u062E\u062A\u0628\u0631 ISS \u0627\u0644\u0623\u0645\u064A\u0631\u0643\u064A \u062D\u0633\u0627\u0628\u064C \u0644\u0627 \u0642\u0631\u0627\u0621\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u0644\u0645\u0642\u0635\u0648\u0631\u0629. \u0644\u0627 \u064A\u0642\u062F\u0651\u0631 \u0627\u0644\u0631\u0633\u0645 \u0623\u062B\u0631 \u0627\u0644\u0645\u0627\u062F\u0629\u060C \u0648\u062A\u0628\u0642\u0649 \u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629 \u0645\u0641\u0642\u0648\u062F\u0629."
      ),
      {
        rowIdField: "Test #",
        detailFields: ["Date", "Fuel Sample Material"],
        aggregateDuplicates: true,
        identityReference: true,
        reportUrl: "https://ntrs.nasa.gov/citations/20210011385"
      }
    ),
    plot(
      "psi25-co-change",
      "PSI-25",
      "Initial CO (ppm)",
      "Final CO (ppm)",
      "ppm",
      "ppm",
      bilingual("Within-record carbon-monoxide change", "\u0627\u0644\u062A\u063A\u064A\u0631 \u0641\u064A \u0623\u0648\u0644 \u0623\u0643\u0633\u064A\u062F \u0627\u0644\u0643\u0631\u0628\u0648\u0646 \u062F\u0627\u062E\u0644 \u0633\u062C\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631"),
      bilingual(
        "What final-minus-initial CO change is recorded for each paired observation?",
        "\u0645\u0627 \u0641\u0631\u0642 CO \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0646\u0627\u0642\u0635 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A \u0627\u0644\u0645\u0633\u062C\u0644 \u0644\u0643\u0644 \u0645\u0644\u0627\u062D\u0638\u0629 \u0645\u0632\u062F\u0648\u062C\u0629\u061F"
      ),
      bilingual(
        "Compare the signed change directly; selected-point details retain the raw source readings.",
        "\u0642\u0627\u0631\u0646 \u0645\u0642\u062F\u0627\u0631 \u0627\u0644\u062A\u063A\u064A\u0631 \u0648\u0625\u0634\u0627\u0631\u062A\u0647 \u0645\u0628\u0627\u0634\u0631\u0629\u061B \u0648\u062A\u062D\u062A\u0641\u0638 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0646\u0642\u0637\u0629 \u0628\u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631."
      ),
      bilingual(
        "The change is computed from initial and final CO readings from a 0\u20131,000 ppm sensor in the 250-L MSG working volume, not a time series or cabin-wide peak. One test exceeded the sensor range. NASA\u2019s ~1.5 ppm U.S. Lab value is a dilution estimate, not an in-situ reading. Negative values stay as published; this does not isolate a material effect.",
        "\u064A\u062D\u0633\u0628 \u0627\u0644\u0641\u0631\u0642 \u0645\u0646 \u0642\u0631\u0627\u0621\u062A\u064A\u0646 \u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 \u0648\u0646\u0647\u0627\u0626\u064A\u0629 \u0628\u062D\u0633\u0627\u0633 CO \u0645\u062F\u0627\u0647 0\u20131,000 ppm \u062F\u0627\u062E\u0644 \u062D\u062C\u0631\u0629 MSG \u062D\u062C\u0645\u0647\u0627 250 \u0644\u062A\u0631\u060C \u0648\u0644\u064A\u0633 \u0645\u0646 \u0633\u062C\u0644 \u0632\u0645\u0646\u064A \u0644\u0644\u0630\u0631\u0648\u0629 \u0623\u0648 \u062A\u0631\u0643\u064A\u0632 \u0627\u0644\u0645\u062D\u0637\u0629 \u0643\u0644\u0647\u0627. \u062A\u062C\u0627\u0648\u0632 \u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0627\u062D\u062F \u0645\u062F\u0649 \u0627\u0644\u062D\u0633\u0627\u0633\u061B \u0648\u062A\u0642\u062F\u064A\u0631 NASA \u0628\u0646\u062D\u0648 1.5 ppm \u0628\u0639\u062F \u0627\u0644\u062A\u062E\u0641\u064A\u0641 \u0641\u064A \u0645\u062E\u062A\u0628\u0631 ISS \u0627\u0644\u0623\u0645\u064A\u0631\u0643\u064A \u062D\u0633\u0627\u0628\u064C \u0644\u0627 \u0642\u0631\u0627\u0621\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u0644\u0645\u0642\u0635\u0648\u0631\u0629. \u062A\u0628\u0642\u0649 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0633\u0627\u0644\u0628\u0629 \u0643\u0645\u0627 \u0646\u064F\u0634\u0631\u062A \u0648\u0644\u0627 \u062A\u064F\u0642\u0635\u060C \u0648\u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0641\u0631\u0642 \u0623\u062B\u0631 \u0627\u0644\u0645\u0627\u062F\u0629."
      ),
      {
        yDeltaFrom: "Initial CO (ppm)",
        zeroReference: true,
        yAxisLabel: bilingual("\u0394 CO (final \u2212 initial)", "\u0394 CO (\u0627\u0644\u0646\u0647\u0627\u0626\u064A \u2212 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A)"),
        yAxisUnit: "ppm",
        rowIdField: "Test #",
        detailFields: ["Date", "Fuel Sample Material", "Initial CO (ppm)", "Final CO (ppm)"],
        aggregateDuplicates: true,
        reportUrl: "https://ntrs.nasa.gov/citations/20210011385"
      }
    ),
    plot(
      "psi39-oxygen-helium-conditions",
      "PSI-39",
      "Oxygen",
      "Helium",
      "source units not stated",
      "source units not stated",
      bilingual("Recorded oxygen and helium condition values", "\u0642\u064A\u0645 \u0638\u0631\u0648\u0641 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0647\u064A\u0644\u064A\u0648\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629"),
      bilingual(
        "Which oxygen\u2013helium value combinations appear in the PSI-39 condition records?",
        "\u0645\u0627 \u062A\u0631\u0627\u0643\u064A\u0628 \u0642\u064A\u0645 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0647\u064A\u0644\u064A\u0648\u0645 \u0627\u0644\u0638\u0627\u0647\u0631\u0629 \u0641\u064A \u0633\u062C\u0644\u0627\u062A \u0638\u0631\u0648\u0641 PSI-39\u061F"
      ),
      bilingual(
        "Colors separate nitrogen values; larger circles indicate more source rows with the same combination.",
        "\u062A\u0641\u0635\u0644 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0642\u064A\u0645 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646\u061B \u0648\u062A\u0634\u064A\u0631 \u0627\u0644\u062F\u0648\u0627\u0626\u0631 \u0627\u0644\u0623\u0643\u0628\u0631 \u0625\u0644\u0649 \u0635\u0641\u0648\u0641 \u0645\u0635\u062F\u0631 \u0623\u0643\u062B\u0631 \u0628\u0627\u0644\u0642\u064A\u0645 \u0646\u0641\u0633\u0647\u0627."
      ),
      bilingual(
        "The source table does not state units in these headers. This plots reported conditions, not combustion outcomes or a flammability limit.",
        "\u0644\u0627 \u064A\u0630\u0643\u0631 \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u062D\u062F\u0627\u062A \u0647\u0630\u0647 \u0627\u0644\u062D\u0642\u0648\u0644. \u064A\u0639\u0631\u0636 \u0627\u0644\u0631\u0633\u0645 \u0638\u0631\u0648\u0641\u0627\u064B \u0645\u0633\u062C\u0644\u0629 \u0644\u0627 \u0646\u0648\u0627\u062A\u062C \u0627\u062D\u062A\u0631\u0627\u0642 \u0623\u0648 \u062D\u062F\u0648\u062F \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0634\u062A\u0639\u0627\u0644."
      ),
      {
        groupField: "Nitrogen",
        rowIdField: "Flex Number",
        detailFields: ["Flex Number", "Nitrogen", "Pressure", "Fuel"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi69-oxygen-burning-rate",
      "PSI-69",
      "O initial ambient composition; mole fraction",
      "Burning rate; mm",
      "mole fraction",
      "mm\xB2/s",
      bilingual("Recorded oxygen fraction and droplet burning-rate constant", "\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629"),
      bilingual(
        "How are FLEX droplet burning-rate constants distributed across the oxygen fractions reported in each test?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u062B\u0648\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0642\u0637\u0631\u0627\u062A FLEX \u0639\u0628\u0631 \u0646\u0633\u0628 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0644\u0643\u0644 \u0627\u062E\u062A\u0628\u0627\u0631\u061F"
      ),
      bilingual(
        "Each point retains its source test and can be inspected with fuel, pressure, and diluent values.",
        "\u062A\u062D\u062A\u0641\u0638 \u0643\u0644 \u0646\u0642\u0637\u0629 \u0628\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u064A\u0645\u0643\u0646 \u0641\u062D\u0635 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u062E\u0641\u0641\u0629 \u0645\u0639\u0647\u0627."
      ),
      bilingual(
        "Fuel, pressure, and other diluents vary together. This descriptive plot does not isolate oxygen or establish a flammability threshold.",
        "\u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u062E\u0641\u0641\u0629 \u0645\u0639\u0627\u064B\u061B \u0627\u0644\u0631\u0633\u0645 \u0648\u0635\u0641\u064A \u0648\u0644\u0627 \u064A\u0639\u0632\u0644 \u0623\u062B\u0631 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0648 \u064A\u062D\u062F\u062F \u062D\u062F \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0634\u062A\u0639\u0627\u0644."
      ),
      {
        groupField: "Fuel",
        rowIdField: "FLEX Test #",
        detailFields: [
          "Fuel",
          "Ambient pressure; mmHg",
          "N initial ambient composition; mole fraction",
          "CO initial ambient composition; mole fraction",
          "He initial ambient composition; mole fraction"
        ],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi69-nitrogen-burning-rate",
      "PSI-69",
      "N initial ambient composition; mole fraction",
      "Burning rate; mm",
      "mole fraction",
      "mm\xB2/s",
      bilingual("Recorded nitrogen fraction and droplet burning rate", "\u0646\u0633\u0628\u0629 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629"),
      bilingual(
        "How do recorded droplet burning-rate constants sit across the nitrogen fractions in FLEX tests?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u062B\u0648\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629 \u0639\u0628\u0631 \u0646\u0633\u0628 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0641\u064A \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A FLEX\u061F"
      ),
      bilingual(
        "Inspect measured conditions and outcomes by fuel; source points remain individual test records.",
        "\u0627\u0641\u062D\u0635 \u0627\u0644\u0638\u0631\u0648\u0641 \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u0642\u0627\u0633\u0629 \u0628\u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u0648\u062F\u061B \u0648\u062A\u0645\u062B\u0644 \u0627\u0644\u0646\u0642\u0627\u0637 \u0633\u062C\u0644\u0627\u062A \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631."
      ),
      bilingual(
        "Pressure, fuel, oxygen and other diluents also vary. This descriptive view cannot isolate nitrogen or establish causality.",
        "\u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u062E\u0641\u0641\u0629 \u0627\u0644\u0623\u062E\u0631\u0649 \u0623\u064A\u0636\u0627\u064B\u061B \u0644\u0630\u0644\u0643 \u0644\u0627 \u064A\u0639\u0632\u0644 \u0647\u0630\u0627 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0648\u0635\u0641\u064A \u0623\u062B\u0631 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0648\u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0633\u0628\u0628\u064A\u0629."
      ),
      {
        groupField: "Fuel",
        rowIdField: "FLEX Test #",
        detailFields: [
          "Fuel",
          "Ambient pressure; mmHg",
          "O initial ambient composition; mole fraction",
          "CO initial ambient composition; mole fraction",
          "He initial ambient composition; mole fraction"
        ],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi69-carbon-monoxide-burning-rate",
      "PSI-69",
      "CO initial ambient composition; mole fraction",
      "Burning rate; mm",
      "mole fraction",
      "mm\xB2/s",
      bilingual(
        "Recorded carbon-monoxide fraction and droplet burning rate",
        "\u0646\u0633\u0628\u0629 \u0623\u0648\u0644 \u0623\u0643\u0633\u064A\u062F \u0627\u0644\u0643\u0631\u0628\u0648\u0646 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629"
      ),
      bilingual(
        "What burning-rate constants are recorded across tests with different CO fractions?",
        "\u0645\u0627 \u062B\u0648\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0628\u0631 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u062A\u062E\u062A\u0644\u0641 \u0641\u064A\u0647\u0627 \u0646\u0633\u0628\u0629 CO\u061F"
      ),
      bilingual(
        "Review the recorded diluent conditions alongside each measured test result.",
        "\u0631\u0627\u062C\u0639 \u0638\u0631\u0648\u0641 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0625\u0644\u0649 \u062C\u0627\u0646\u0628 \u0646\u062A\u064A\u062C\u0629 \u0643\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0642\u0627\u0633\u0629."
      ),
      bilingual(
        "Fuel, pressure, oxygen and helium vary across tests. The pattern is descriptive and does not establish a CO effect.",
        "\u064A\u062E\u062A\u0644\u0641 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0647\u064A\u0644\u064A\u0648\u0645 \u0628\u064A\u0646 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A\u061B \u0648\u0627\u0644\u0646\u0645\u0637 \u0648\u0635\u0641\u064A \u0648\u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062B\u0631 CO."
      ),
      {
        groupField: "Fuel",
        rowIdField: "FLEX Test #",
        detailFields: [
          "Fuel",
          "Ambient pressure; mmHg",
          "O initial ambient composition; mole fraction",
          "N initial ambient composition; mole fraction",
          "He initial ambient composition; mole fraction"
        ],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi69-helium-burning-rate",
      "PSI-69",
      "He initial ambient composition; mole fraction",
      "Burning rate; mm",
      "mole fraction",
      "mm\xB2/s",
      bilingual("Recorded helium fraction and droplet burning rate", "\u0646\u0633\u0628\u0629 \u0627\u0644\u0647\u064A\u0644\u064A\u0648\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629"),
      bilingual(
        "How do recorded burning-rate constants distribute across tests with varying helium fraction?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u062B\u0648\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0628\u0631 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u062A\u062E\u062A\u0644\u0641 \u0641\u064A\u0647\u0627 \u0646\u0633\u0628\u0629 \u0627\u0644\u0647\u064A\u0644\u064A\u0648\u0645\u061F"
      ),
      bilingual(
        "Inspect test-level values by fuel, with other reported composition and pressure in the point details.",
        "\u0627\u0641\u062D\u0635 \u0627\u0644\u0642\u064A\u0645 \u0639\u0644\u0649 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u0648\u062F\u060C \u0645\u0639 \u0628\u0642\u064A\u0629 \u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u062C\u0648 \u0648\u0627\u0644\u0636\u063A\u0637 \u0641\u064A \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644."
      ),
      bilingual(
        "Oxygen, pressure, fuel, nitrogen and CO also vary. This does not isolate helium or define a safe limit.",
        "\u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0648CO \u0623\u064A\u0636\u0627\u064B\u061B \u0648\u0644\u0627 \u064A\u0639\u0632\u0644 \u0647\u0630\u0627 \u0623\u062B\u0631 \u0627\u0644\u0647\u064A\u0644\u064A\u0648\u0645 \u0648\u0644\u0627 \u064A\u062D\u062F\u062F \u062D\u062F\u0627\u064B \u0622\u0645\u0646\u0627\u064B."
      ),
      {
        groupField: "Fuel",
        rowIdField: "FLEX Test #",
        detailFields: [
          "Fuel",
          "Ambient pressure; mmHg",
          "O initial ambient composition; mole fraction",
          "N initial ambient composition; mole fraction",
          "CO initial ambient composition; mole fraction"
        ],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi98-sample-burn-time",
      "PSI-98",
      "Sample Number",
      "Burn Time (s)",
      "source sample label",
      "s",
      bilingual("Burn time for PSI-98 material-fire samples", "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0644\u0639\u064A\u0646\u0627\u062A \u062D\u0631\u0627\u0626\u0642 \u0627\u0644\u0645\u0648\u0627\u062F PSI-98"),
      bilingual(
        "What burn times are listed for the S-number material-fire samples?",
        "\u0645\u0627 \u0623\u0632\u0645\u0646\u0629 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u062F\u0631\u062C\u0629 \u0644\u0639\u064A\u0646\u0627\u062A \u062D\u0631\u0627\u0626\u0642 \u0627\u0644\u0645\u0648\u0627\u062F \u0630\u0627\u062A \u0627\u0644\u0631\u0645\u0632 S\u061F"
      ),
      bilingual(
        "Each point is one S# sample; flow-visualisation references are excluded.",
        "\u0643\u0644 \u0646\u0642\u0637\u0629 \u0639\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u0628\u0631\u0645\u0632 S\u061B \u0648\u0627\u0633\u062A\u064F\u0628\u0639\u062F\u062A \u0645\u0631\u0627\u062C\u0639 \u062A\u0635\u0648\u064A\u0631 \u0627\u0644\u062C\u0631\u064A\u0627\u0646."
      ),
      bilingual(
        "Only two material-fire samples are present. Their difference does not establish a reliable material or flow-direction effect.",
        "\u062A\u0648\u062C\u062F \u0639\u064A\u0646\u062A\u0627 \u062D\u0631\u064A\u0642 \u0645\u0648\u0627\u062F \u0641\u0642\u0637. \u0648\u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u062E\u062A\u0644\u0627\u0641\u0647\u0645\u0627 \u0623\u062B\u0631\u0627\u064B \u0645\u0648\u062B\u0648\u0642\u0627\u064B \u0644\u0644\u0645\u0627\u062F\u0629 \u0623\u0648 \u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062C\u0631\u064A\u0627\u0646."
      ),
      {
        xCategory: true,
        rowIdField: "Sample Number",
        detailFields: ["Material", "Air Flow (cm/s)", "Percent O2", "Flow Direction"],
        rowFilter: "sample-only"
      }
    ),
    plot(
      "psi101-inlet-velocity-rt-r0",
      "PSI-101",
      "Inlet velocity (cm/s)",
      "Rt/R0",
      "cm/s",
      "ratio as published",
      bilingual("Inlet velocity and reported Rt/R0", "\u0633\u0631\u0639\u0629 \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0646\u0633\u0628\u0629 Rt/R0 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629"),
      bilingual(
        "How are source inlet-velocity settings distributed alongside Rt/R0 readings?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0633\u0631\u0639\u0629 \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0625\u0644\u0649 \u062C\u0627\u0646\u0628 \u0642\u0631\u0627\u0621\u0627\u062A Rt/R0\u061F"
      ),
      bilingual(
        "Select a point to inspect sample type and source description; repeated records are combined into larger bubbles.",
        "\u0627\u062E\u062A\u0631 \u0646\u0642\u0637\u0629 \u0644\u0641\u062D\u0635 \u0646\u0648\u0639 \u0627\u0644\u0639\u064A\u0646\u0629 \u0648\u0648\u0635\u0641 \u0627\u0644\u0645\u0635\u062F\u0631\u061B \u0648\u062A\u064F\u062C\u0645\u0639 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629 \u0641\u064A \u062F\u0648\u0627\u0626\u0631 \u0623\u0643\u0628\u0631."
      ),
      bilingual(
        "This is smoke/aerosol measurement evidence, not flame spread. Test identifiers repeat, so points are source records and not independent burns.",
        "\u0647\u0630\u0647 \u0623\u062F\u0644\u0629 \u0642\u064A\u0627\u0633 \u062F\u062E\u0627\u0646/\u0647\u0628\u0627\u0621 \u0648\u0644\u064A\u0633\u062A \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628. \u062A\u062A\u0643\u0631\u0631 \u0645\u0639\u0631\u0651\u0641\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u060C \u0644\u0630\u0627 \u062A\u0645\u062B\u0644 \u0627\u0644\u0646\u0642\u0627\u0637 \u0633\u062C\u0644\u0627\u062A \u0645\u0635\u062F\u0631 \u0644\u0627 \u062D\u0631\u0627\u0626\u0642 \u0645\u0633\u062A\u0642\u0644\u0629."
      ),
      {
        groupField: "Sample Type",
        rowIdField: "SAME Test #",
        detailFields: ["Sample Type", "Description"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi101-aging-rt-r0",
      "PSI-101",
      "Net aging time (sec)",
      "Rt/R0",
      "s",
      "ratio as published",
      bilingual("Net aging time and reported Rt/R0", "\u0632\u0645\u0646 \u0627\u0644\u062A\u0642\u0627\u062F\u0645 \u0627\u0644\u0635\u0627\u0641\u064A \u0648\u0646\u0633\u0628\u0629 Rt/R0 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629"),
      bilingual(
        "How are reported aerosol aging times distributed alongside Rt/R0 readings?",
        "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u0623\u0632\u0645\u0646\u0629 \u062A\u0642\u0627\u062F\u0645 \u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0625\u0644\u0649 \u062C\u0627\u0646\u0628 \u0642\u0631\u0627\u0621\u0627\u062A Rt/R0\u061F"
      ),
      bilingual(
        "The bubble size reveals repeated source-record values; inspect descriptions before interpreting a pattern.",
        "\u064A\u0643\u0634\u0641 \u062D\u062C\u0645 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u062A\u0643\u0631\u0627\u0631 \u0642\u064A\u0645 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631\u061B \u0627\u0641\u062D\u0635 \u0627\u0644\u0623\u0648\u0635\u0627\u0641 \u0642\u0628\u0644 \u062A\u0641\u0633\u064A\u0631 \u0623\u064A \u0646\u0645\u0637."
      ),
      bilingual(
        "Repeated test identifiers and incomplete fields mean rows are not assumed to be independent samples.",
        "\u062A\u0643\u0631\u0627\u0631 \u0645\u0639\u0631\u0651\u0641\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0646\u0642\u0635 \u0627\u0644\u062D\u0642\u0648\u0644 \u064A\u0639\u0646\u064A \u0623\u0646\u0646\u0627 \u0644\u0627 \u0646\u0641\u062A\u0631\u0636 \u0627\u0633\u062A\u0642\u0644\u0627\u0644 \u0627\u0644\u0635\u0641\u0648\u0641 \u0643\u0639\u064A\u0646\u0627\u062A."
      ),
      {
        groupField: "Sample Type",
        rowIdField: "SAME Test #",
        detailFields: ["Sample Type", "Description"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi101-duration-rt-r0",
      "PSI-101",
      "Duration (sec)",
      "Rt/R0",
      "s",
      "ratio as published",
      bilingual("Reported test duration and Rt/R0", "\u0645\u062F\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0646\u0633\u0628\u0629 Rt/R0"),
      bilingual(
        "How do the listed measurement durations sit alongside the reported aerosol size ratios?",
        "\u0643\u064A\u0641 \u062A\u0642\u0639 \u0645\u062F\u062F \u0627\u0644\u0642\u064A\u0627\u0633 \u0627\u0644\u0645\u062F\u0631\u062C\u0629 \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0646\u0633\u0628 \u0623\u062D\u062C\u0627\u0645 \u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u0645\u0633\u062C\u0644\u0629\u061F"
      ),
      bilingual(
        "Inspect sample-level records by sample type and retain the source description.",
        "\u0627\u0641\u062D\u0635 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0639\u064A\u0646\u0627\u062A \u0628\u062D\u0633\u0628 \u0646\u0648\u0639\u0647\u0627 \u0645\u0639 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 \u0648\u0635\u0641 \u0627\u0644\u0645\u0635\u062F\u0631."
      ),
      bilingual(
        "Only rows with both numeric fields are shown. Repeated test IDs and changing samples mean points are not assumed independent.",
        "\u062A\u064F\u0639\u0631\u0636 \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u062A\u064A \u062A\u062D\u0648\u064A \u0627\u0644\u062D\u0642\u0644\u064A\u0646 \u0627\u0644\u0631\u0642\u0645\u064A\u064A\u0646 \u0641\u0642\u0637. \u062A\u062A\u0643\u0631\u0631 \u0645\u0639\u0631\u0651\u0641\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u062A\u062A\u063A\u064A\u0631 \u0627\u0644\u0639\u064A\u0646\u0627\u062A\u060C \u0644\u0630\u0644\u0643 \u0644\u0627 \u0646\u0641\u062A\u0631\u0636 \u0627\u0633\u062A\u0642\u0644\u0627\u0644 \u0627\u0644\u0646\u0642\u0627\u0637."
      ),
      {
        groupField: "Sample Type",
        rowIdField: "SAME Test #",
        detailFields: ["Sample Type", "Description", "Date"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi101-primary-aging-rt-r0",
      "PSI-101",
      "Primary aging time (sec)",
      "Rt/R0",
      "s",
      "ratio as published",
      bilingual("Primary aerosol aging time and Rt/R0", "\u0632\u0645\u0646 \u062A\u0642\u0627\u062F\u0645 \u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u0623\u0648\u0644\u064A \u0648\u0646\u0633\u0628\u0629 Rt/R0"),
      bilingual(
        "What Rt/R0 values accompany the reported primary aging-time settings?",
        "\u0645\u0627 \u0642\u064A\u0645 Rt/R0 \u0627\u0644\u0645\u0635\u0627\u062D\u0628\u0629 \u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0632\u0645\u0646 \u0627\u0644\u062A\u0642\u0627\u062F\u0645 \u0627\u0644\u0623\u0648\u0644\u064A \u0627\u0644\u0645\u0633\u062C\u0644\u0629\u061F"
      ),
      bilingual(
        "Compare the instrument-recorded aging-time fields with the same-row ratio and sample type.",
        "\u0642\u0627\u0631\u0646 \u062D\u0642\u0648\u0644 \u0632\u0645\u0646 \u0627\u0644\u062A\u0642\u0627\u062F\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0645\u0639 \u0627\u0644\u0646\u0633\u0628\u0629 \u0648\u0646\u0648\u0639 \u0627\u0644\u0639\u064A\u0646\u0629 \u0641\u064A \u0627\u0644\u0635\u0641 \u0646\u0641\u0633\u0647."
      ),
      bilingual(
        "The dataset has incomplete fields and repeated test IDs; this is descriptive, not an isolated aging-time effect.",
        "\u062A\u062D\u062A\u0648\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u0642\u0648\u0644\u0627\u064B \u0646\u0627\u0642\u0635\u0629 \u0648\u0645\u0639\u0631\u0651\u0641\u0627\u062A \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u062A\u0643\u0631\u0631\u0629\u061B \u0648\u0647\u0630\u0627 \u0648\u0635\u0641 \u0648\u0644\u064A\u0633 \u0623\u062B\u0631\u0627\u064B \u0645\u0639\u0632\u0648\u0644\u0627\u064B \u0644\u0632\u0645\u0646 \u0627\u0644\u062A\u0642\u0627\u062F\u0645."
      ),
      {
        groupField: "Sample Type",
        rowIdField: "SAME Test #",
        detailFields: ["Sample Type", "Description", "Primary mixing time (sec)", "Net aging time (sec)"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi101-primary-mixing-rt-r0",
      "PSI-101",
      "Primary mixing time (sec)",
      "Rt/R0",
      "s",
      "ratio as published",
      bilingual("Primary aerosol mixing time and Rt/R0", "\u0632\u0645\u0646 \u062E\u0644\u0637 \u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u0623\u0648\u0644\u064A \u0648\u0646\u0633\u0628\u0629 Rt/R0"),
      bilingual(
        "What Rt/R0 values accompany the recorded primary mixing times?",
        "\u0645\u0627 \u0642\u064A\u0645 Rt/R0 \u0627\u0644\u0645\u0635\u0627\u062D\u0628\u0629 \u0644\u0623\u0632\u0645\u0646\u0629 \u0627\u0644\u062E\u0644\u0637 \u0627\u0644\u0623\u0648\u0644\u064A\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629\u061F"
      ),
      bilingual(
        "Inspect the mixing-time field separately from inlet velocity and net aging time.",
        "\u0627\u0641\u062D\u0635 \u062D\u0642\u0644 \u0632\u0645\u0646 \u0627\u0644\u062E\u0644\u0637 \u0645\u0646\u0641\u0635\u0644\u0627\u064B \u0639\u0646 \u0633\u0631\u0639\u0629 \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0632\u0645\u0646 \u0627\u0644\u062A\u0642\u0627\u062F\u0645 \u0627\u0644\u0635\u0627\u0641\u064A."
      ),
      bilingual(
        "Fields are incomplete and test identifiers repeat. The displayed association is not a causal or independent-sample estimate.",
        "\u0627\u0644\u062D\u0642\u0648\u0644 \u0646\u0627\u0642\u0635\u0629 \u0648\u0645\u0639\u0631\u0651\u0641\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u062A\u062A\u0643\u0631\u0631\u061B \u0648\u0627\u0644\u0627\u0631\u062A\u0628\u0627\u0637 \u0627\u0644\u0638\u0627\u0647\u0631 \u0644\u064A\u0633 \u062A\u0642\u062F\u064A\u0631\u0627\u064B \u0633\u0628\u0628\u064A\u0627\u064B \u0623\u0648 \u0644\u0639\u064A\u0646\u0627\u062A \u0645\u0633\u062A\u0642\u0644\u0629."
      ),
      {
        groupField: "Sample Type",
        rowIdField: "SAME Test #",
        detailFields: ["Sample Type", "Description", "Primary aging time (sec)", "Net aging time (sec)"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi102-airflow-weight-loss",
      "PSI-102",
      "Air Flow (cm/s)",
      "Weight loss rate (mg/min)",
      "cm/s",
      "mg/min",
      bilingual("Weight-loss rate by source airflow setting", "\u0645\u0639\u062F\u0644 \u0641\u0642\u062F\u0627\u0646 \u0627\u0644\u0648\u0632\u0646 \u0628\u062D\u0633\u0628 \u0625\u0639\u062F\u0627\u062F \u062A\u062F\u0641\u0642 \u0627\u0644\u0647\u0648\u0627\u0621 \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631"),
      bilingual(
        "What weight-loss values are reported at the listed airflow settings?",
        "\u0645\u0627 \u0642\u064A\u0645 \u0641\u0642\u062F\u0627\u0646 \u0627\u0644\u0648\u0632\u0646 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0646\u062F \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062A\u062F\u0641\u0642 \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0645\u062F\u0631\u062C\u0629\u061F"
      ),
      bilingual(
        "Inspect the four numeric Teflon entries and their sample descriptions.",
        "\u0627\u0641\u062D\u0635 \u0625\u062F\u062E\u0627\u0644\u0627\u062A \u0627\u0644\u062A\u0641\u0644\u0648\u0646 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0627\u0644\u0623\u0631\u0628\u0639\u0629 \u0648\u0623\u0648\u0635\u0627\u0641 \u0639\u064A\u0646\u0627\u062A\u0647\u0627."
      ),
      bilingual(
        "n=4, with differing aging conditions. This is not a flame-spread rate and cannot establish a general airflow effect.",
        "\u0639\u062F\u062F\u0647\u0627 4 \u0645\u0639 \u0627\u062E\u062A\u0644\u0627\u0641 \u0638\u0631\u0648\u0641 \u0627\u0644\u062A\u0642\u0627\u062F\u0645. \u0647\u0630\u0627 \u0644\u064A\u0633 \u0645\u0639\u062F\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628 \u0648\u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062B\u0631\u0627\u064B \u0639\u0627\u0645\u0627\u064B \u0644\u062A\u062F\u0641\u0642 \u0627\u0644\u0647\u0648\u0627\u0621."
      ),
      { rowIdField: "Sample #", detailFields: ["Sample Material", "Aging Duration (minutes)"] }
    ),
    plot(
      "psi102-aging-weight-loss",
      "PSI-102",
      "Aging Duration (minutes)",
      "Weight loss rate (mg/min)",
      "min",
      "mg/min",
      bilingual("Weight-loss rate by aerosol aging duration", "\u0645\u0639\u062F\u0644 \u0641\u0642\u062F\u0627\u0646 \u0627\u0644\u0648\u0632\u0646 \u0628\u062D\u0633\u0628 \u0645\u062F\u0629 \u062A\u0642\u0627\u062F\u0645 \u0627\u0644\u0647\u0628\u0627\u0621"),
      bilingual(
        "How do the four listed weight-loss readings sit across their source aging durations?",
        "\u0643\u064A\u0641 \u062A\u0642\u0639 \u0642\u0631\u0627\u0621\u0627\u062A \u0641\u0642\u062F\u0627\u0646 \u0627\u0644\u0648\u0632\u0646 \u0627\u0644\u0623\u0631\u0628\u0639 \u0639\u0628\u0631 \u0645\u062F\u062F \u0627\u0644\u062A\u0642\u0627\u062F\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629\u061F"
      ),
      bilingual("Select a point for sample material and airflow.", "\u0627\u062E\u062A\u0631 \u0646\u0642\u0637\u0629 \u0644\u0631\u0624\u064A\u0629 \u0645\u0627\u062F\u0629 \u0627\u0644\u0639\u064A\u0646\u0629 \u0648\u062A\u062F\u0641\u0642 \u0627\u0644\u0647\u0648\u0627\u0621."),
      bilingual(
        "Only four numeric entries are available and other settings vary; no causal trend is inferred.",
        "\u0644\u0627 \u062A\u062A\u0648\u0641\u0631 \u0625\u0644\u0627 \u0623\u0631\u0628\u0639\u0629 \u0625\u062F\u062E\u0627\u0644\u0627\u062A \u0631\u0642\u0645\u064A\u0629 \u0648\u062A\u062E\u062A\u0644\u0641 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0623\u062E\u0631\u0649\u061B \u0648\u0644\u0627 \u0646\u0633\u062A\u0646\u062A\u062C \u0627\u062A\u062C\u0627\u0647\u0627\u064B \u0633\u0628\u0628\u064A\u0627\u064B."
      ),
      { rowIdField: "Sample #", detailFields: ["Sample Material", "Air Flow (cm/s)"] }
    ),
    plot(
      "psi107-air-fuel-rates",
      "PSI-107",
      "Air Rate (cm/s)",
      "Fuel Rate (mg/s)",
      "cm/s",
      "mg/s",
      bilingual("Recorded air and fuel operating rates", "\u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u0647\u0648\u0627\u0621 \u0648\u0627\u0644\u0648\u0642\u0648\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629"),
      bilingual(
        "What air-rate and fuel-rate combinations occur in the SPICE source log?",
        "\u0645\u0627 \u062A\u0631\u0627\u0643\u064A\u0628 \u0645\u0639\u062F\u0644\u064A \u0627\u0644\u0647\u0648\u0627\u0621 \u0648\u0627\u0644\u0648\u0642\u0648\u062F \u0641\u064A \u0633\u062C\u0644 SPICE \u0627\u0644\u0645\u0635\u062F\u0631\u064A\u061F"
      ),
      bilingual(
        "Colors distinguish fuel labels; bubble size shows repeated source-record combinations.",
        "\u062A\u0645\u064A\u0632 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u062A\u0633\u0645\u064A\u0627\u062A \u0627\u0644\u0648\u0642\u0648\u062F\u061B \u0648\u064A\u0628\u064A\u0646 \u062D\u062C\u0645 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u062A\u0643\u0631\u0627\u0631 \u062A\u0631\u0627\u0643\u064A\u0628 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631."
      ),
      bilingual(
        "The 469 rows repeat event times and operating conditions; they are not 469 independent fires and do not prove a causal relation.",
        "\u062A\u0643\u0631\u0631 \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0640469 \u0623\u0648\u0642\u0627\u062A \u0627\u0644\u0623\u062D\u062F\u0627\u062B \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u061B \u0648\u0644\u064A\u0633\u062A 469 \u062D\u0631\u064A\u0642\u0627\u064B \u0645\u0633\u062A\u0642\u0644\u0627\u064B \u0648\u0644\u0627 \u062A\u062B\u0628\u062A \u0639\u0644\u0627\u0642\u0629 \u0633\u0628\u0628\u064A\u0629."
      ),
      {
        groupField: "Fuel",
        rowIdField: "GMT ignition",
        detailFields: ["GMT date", "Fuel", "Nozzle (mm)"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi107-nozzle-fuel-rate",
      "PSI-107",
      "Nozzle (mm)",
      "Fuel Rate (mg/s)",
      "mm",
      "mg/s",
      bilingual("Recorded nozzle size and fuel rate", "\u062D\u062C\u0645 \u0627\u0644\u0641\u0648\u0647\u0629 \u0648\u0645\u0639\u062F\u0644 \u0627\u0644\u0648\u0642\u0648\u062F \u0627\u0644\u0645\u0633\u062C\u0644\u0627\u0646"),
      bilingual(
        "Which nozzle-size and fuel-rate combinations are recorded for each fuel?",
        "\u0645\u0627 \u062A\u0631\u0627\u0643\u064A\u0628 \u062D\u062C\u0645 \u0627\u0644\u0641\u0648\u0647\u0629 \u0648\u0645\u0639\u062F\u0644 \u0627\u0644\u0648\u0642\u0648\u062F \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0644\u0643\u0644 \u0648\u0642\u0648\u062F\u061F"
      ),
      bilingual(
        "Inspect the source operating-condition records; bubble size reveals repeated combinations.",
        "\u0627\u0641\u062D\u0635 \u0633\u062C\u0644\u0627\u062A \u0638\u0631\u0648\u0641 \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0645\u0635\u062F\u0631\u064A\u0629\u061B \u0648\u064A\u0643\u0634\u0641 \u062D\u062C\u0645 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u062A\u0631\u0627\u0643\u064A\u0628 \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629."
      ),
      bilingual(
        "The rows are repeated SPICE log entries, not independent fire trials. Nozzle and fuel-rate association is descriptive only.",
        "\u0627\u0644\u0635\u0641\u0648\u0641 \u0625\u062F\u062E\u0627\u0644\u0627\u062A \u0645\u062A\u0643\u0631\u0631\u0629 \u0641\u064A \u0633\u062C\u0644 SPICE \u0648\u0644\u064A\u0633\u062A \u062A\u062C\u0627\u0631\u0628 \u062D\u0631\u064A\u0642 \u0645\u0633\u062A\u0642\u0644\u0629. \u0627\u0644\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u064A\u0646 \u0627\u0644\u0641\u0648\u0647\u0629 \u0648\u0645\u0639\u062F\u0644 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0635\u0641\u064A \u0641\u0642\u0637."
      ),
      {
        groupField: "Fuel",
        rowIdField: "GMT ignition",
        detailFields: ["GMT date", "Fuel", "Air Rate (cm/s)"],
        aggregateDuplicates: true
      }
    ),
    plot(
      "psi107-volumetric-mass-fuel-rate",
      "PSI-107",
      "Fuel Rate (sccm)",
      "Fuel Rate (mg/s)",
      "sccm",
      "mg/s",
      bilingual("Volumetric and mass fuel-rate records", "\u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u0648\u0642\u0648\u062F \u0627\u0644\u062D\u062C\u0645\u064A\u0629 \u0648\u0627\u0644\u0643\u062A\u0644\u064A\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629"),
      bilingual(
        "How do source volumetric fuel rates correspond to the reported mass rates for each fuel?",
        "\u0643\u064A\u0641 \u062A\u0642\u0627\u0628\u0644 \u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u0648\u0642\u0648\u062F \u0627\u0644\u062D\u062C\u0645\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631 \u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u0643\u062A\u0644\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0644\u0643\u0644 \u0648\u0642\u0648\u062F\u061F"
      ),
      bilingual(
        "Inspect the reported conversion relationship, with fuel identity shown by color.",
        "\u0627\u0641\u062D\u0635 \u0639\u0644\u0627\u0642\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0645\u0639 \u062A\u0645\u064A\u064A\u0632 \u0646\u0648\u0639 \u0627\u0644\u0648\u0642\u0648\u062F \u0628\u0627\u0644\u0644\u0648\u0646."
      ),
      bilingual(
        "These are repeated SPICE log conditions, not independent flame trials. This checks paired rate records and does not establish combustion performance.",
        "\u0647\u0630\u0647 \u0638\u0631\u0648\u0641 \u0645\u062A\u0643\u0631\u0631\u0629 \u0645\u0646 \u0633\u062C\u0644 SPICE \u0648\u0644\u064A\u0633\u062A \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0645\u0633\u062A\u0642\u0644\u0629. \u064A\u0642\u0627\u0631\u0646 \u0627\u0644\u0631\u0633\u0645 \u0645\u0639\u062F\u0644\u064A \u0627\u0644\u062A\u062F\u0641\u0642 \u0641\u064A \u0627\u0644\u0633\u062C\u0644 \u0648\u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062F\u0627\u0621 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642."
      ),
      {
        groupField: "Fuel",
        rowIdField: "GMT ignition",
        detailFields: ["GMT date", "Fuel", "Nozzle (mm)", "HC Fuel Rate (mg/s)"],
        aggregateDuplicates: true
      }
    )
  ];
  var SOURCE_STUDY_NO_PLOT_REASON = {
    "PSI-26": bilingual(
      "The bundled table is a material/sample inventory with no numeric combustion outcome.",
      "\u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642 \u062C\u0631\u062F \u0644\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0639\u064A\u0646\u0627\u062A \u0648\u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0646\u062A\u064A\u062C\u0629 \u0627\u062D\u062A\u0631\u0627\u0642 \u0631\u0642\u0645\u064A\u0629."
    ),
    "PSI-47": bilingual(
      "The bundled table contains two dust/aerosol sampling-session descriptions and no numeric combustion outcome.",
      "\u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642 \u064A\u0635\u0641 \u062C\u0644\u0633\u062A\u064A \u0623\u062E\u0630 \u0639\u064A\u0646\u0627\u062A \u063A\u0628\u0627\u0631/\u0647\u0628\u0627\u0621 \u0648\u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0646\u062A\u064A\u062C\u0629 \u0627\u062D\u062A\u0631\u0627\u0642 \u0631\u0642\u0645\u064A\u0629."
    ),
    "PSI-68": bilingual(
      "The table contains test-envelope ranges and alternatives, not individual numeric test observations; parsing those strings as points would invent data.",
      "\u064A\u062D\u062A\u0648\u064A \u0627\u0644\u062C\u062F\u0648\u0644 \u0646\u0637\u0627\u0642\u0627\u062A \u0648\u0638\u0631\u0648\u0641 \u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u062F\u064A\u0644\u0629 \u0644\u0627 \u0642\u064A\u0627\u0633\u0627\u062A \u0631\u0642\u0645\u064A\u0629 \u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0645\u0646\u0641\u0631\u062F\u0629\u061B \u0648\u062A\u062D\u0648\u064A\u0644 \u062A\u0644\u0643 \u0627\u0644\u0646\u0635\u0648\u0635 \u0625\u0644\u0649 \u0646\u0642\u0627\u0637 \u0633\u064A\u062E\u062A\u0644\u0642 \u0628\u064A\u0627\u0646\u0627\u062A."
    ),
    "PSI-99": bilingual(
      "The bundled table mixes labels and text values. Its microgravity field is named \u201C?-g\u201D, so a gravity classification or numeric comparison is not safe.",
      "\u064A\u062E\u0644\u0637 \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642 \u0628\u064A\u0646 \u062A\u0633\u0645\u064A\u0627\u062A \u0648\u0642\u064A\u0645 \u0646\u0635\u064A\u0629. \u0648\u062D\u0642\u0644 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u0627\u0633\u0645\u0647 \xAB?-g\xBB\u060C \u0644\u0630\u0644\u0643 \u0644\u0627 \u064A\u0635\u062D \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0623\u0648 \u0625\u062C\u0631\u0627\u0621 \u0645\u0642\u0627\u0631\u0646\u0629 \u0631\u0642\u0645\u064A\u0629."
    ),
    "PSI-100": bilingual(
      "The two rows describe sample conditions and camera identifiers; no measured flame-spread outcome is present.",
      "\u064A\u0635\u0641 \u0627\u0644\u0635\u0641\u0627\u0646 \u0638\u0631\u0648\u0641 \u0627\u0644\u0639\u064A\u0646\u0627\u062A \u0648\u0645\u0639\u0631\u0651\u0641\u0627\u062A \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627\u062A\u061B \u0648\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u064A\u062C\u0629 \u0645\u0642\u0627\u0633\u0629 \u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628."
    )
  };
  function sourceChartsForStudy(studyId) {
    return SOURCE_STUDY_CHARTS.filter((chart) => chart.studyId === studyId);
  }

  // public/source-charts.js
  var tableCache = /* @__PURE__ */ new Map();
  function loadStudyTable(id) {
    if (!tableCache.has(id)) {
      tableCache.set(id, get("/api/challenge/table?id=" + encodeURIComponent(id)));
    }
    return tableCache.get(id);
  }
  function parseSourceNumber(value) {
    if (value === null || value === void 0) return null;
    const text = String(value).trim();
    if (!/^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(text)) return null;
    const number = Number(text);
    return Number.isFinite(number) ? number : null;
  }
  function sourceLabel(row, index, config, lang2) {
    const sourceRow = (lang2 === "ar" ? "\u0635\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 " : "Source row ") + (index + 1);
    const identity = config.rowIdField && row[config.rowIdField] ? sourceRow + " \xB7 " + config.rowIdField + ": " + String(row[config.rowIdField]) : sourceRow;
    const fields = (config.detailFields || []).filter((field) => row[field] !== null && row[field] !== void 0 && String(row[field]).trim() !== "").map((field) => field + ": " + String(row[field]));
    return [identity].concat(fields).join(" \xB7 ");
  }
  function sourcePlotData(rows, config, lang2) {
    var _a;
    const filtered = rows.map((row, index) => ({ row, index })).filter(({ row }) => config.rowFilter !== "sample-only" || /^S\d+$/i.test(String(row["Sample Number"] || "")));
    const valid = [];
    for (const { row, index } of filtered) {
      const category = config.xCategory ? String((_a = row[config.xField]) != null ? _a : "").trim() : null;
      const x = config.xCategory ? null : parseSourceNumber(row[config.xField]);
      const sourceY = parseSourceNumber(row[config.yField]);
      const baseline = config.yDeltaFrom ? parseSourceNumber(row[config.yDeltaFrom]) : null;
      if (!config.xCategory && x === null || config.xCategory && !category || sourceY === null || config.yDeltaFrom && baseline === null) continue;
      valid.push({
        rawX: config.xCategory ? category : x,
        x,
        y: config.yDeltaFrom ? sourceY - baseline : sourceY,
        group: config.groupField ? String(row[config.groupField] || "Unreported") : "",
        label: sourceLabel(row, index, config, lang2)
      });
    }
    let entries = valid;
    if (config.aggregateDuplicates) {
      const merged = /* @__PURE__ */ new Map();
      for (const record of valid) {
        const key = JSON.stringify([record.rawX, record.y, record.group]);
        const current2 = merged.get(key) || __spreadProps(__spreadValues({}, record), { count: 0, labels: [] });
        current2.count += 1;
        if (current2.labels.length < 6) current2.labels.push(record.label);
        merged.set(key, current2);
      }
      entries = [...merged.values()];
    } else {
      entries = valid.map((record) => __spreadProps(__spreadValues({}, record), { count: 1, labels: [record.label] }));
    }
    const categories = config.xCategory ? [...new Set(entries.map((entry) => entry.rawX))].sort((a, b) => {
      if (config.categorySort === "numeric") {
        const left = Number.parseFloat(a);
        const right = Number.parseFloat(b);
        return left - right || a.localeCompare(b);
      }
      return a.localeCompare(b, void 0, { numeric: true });
    }) : null;
    const categoryIndex = new Map((categories || []).map((value, index) => [value, index]));
    const categoryOffsets = /* @__PURE__ */ new Map();
    const points = entries.map((entry) => {
      let x = entry.x;
      if (categories) {
        const index = categoryIndex.get(entry.rawX);
        const occurrence = categoryOffsets.get(index) || 0;
        categoryOffsets.set(index, occurrence + 1);
        const jitter = (occurrence % 5 - 2) * 0.055;
        x = index + jitter;
      }
      const references = entry.labels.map((value) => value);
      const more = entry.count > references.length ? (lang2 === "ar" ? " \xB7 \u0648" : " \xB7 +") + (entry.count - references.length) + (lang2 === "ar" ? " \u0633\u062C\u0644\u0627\u062A \u0623\u062E\u0631\u0649" : " more records") : "";
      const grouped = entry.group ? (lang2 === "ar" ? "\u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629: " : "Group: ") + entry.group + " \xB7 " : "";
      const countLabel = entry.count > 1 ? (lang2 === "ar" ? "\u0645\u0637\u0627\u0628\u0642\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631: " : "Matching source rows: ") + entry.count + " \xB7 " : "";
      return {
        x,
        y: entry.y,
        xDisplay: String(entry.rawX),
        group: entry.group,
        count: entry.count,
        info: countLabel + grouped + references.join(" | ") + more
      };
    });
    return { points, categories, validRows: valid.length };
  }
  function renderChartCard(config, plotData, lang2, sourceUrl, sourceRowCount) {
    const ar = lang2 === "ar";
    const xLabel = config.xAxisLabel ? config.xAxisLabel[lang2] : config.xField;
    const yLabel = config.yAxisLabel ? config.yAxisLabel[lang2] : config.yField;
    const title = config.title[lang2];
    const question = config.question[lang2];
    const purpose = config.purpose[lang2];
    const limit = config.limit[lang2];
    const labels2 = chartControlLabels(lang2);
    const notes = [];
    if (config.aggregateDuplicates) {
      notes.push(ar ? "\u062D\u062C\u0645 \u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u064A\u0632\u062F\u0627\u062F \u0645\u0639 \u0639\u062F\u062F \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0630\u0627\u062A \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629." : "Bubble size increases with the number of source rows sharing the same plotted values.");
    }
    if (config.xCategory) {
      notes.push(ar ? "\u0627\u0644\u0625\u0632\u0627\u062D\u0629 \u0627\u0644\u0623\u0641\u0642\u064A\u0629 \u0627\u0644\u0635\u063A\u064A\u0631\u0629 \u0644\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u062A\u062F\u0627\u062E\u0644 \u0628\u0635\u0631\u064A\u0629 \u0641\u0642\u0637\u061B \u0627\u0644\u062A\u0633\u0645\u064A\u0629 \u0627\u0644\u062F\u0642\u064A\u0642\u0629 \u0638\u0627\u0647\u0631\u0629 \u0641\u064A \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644." : "Small horizontal offsets reveal overlapping category points; the offset is visual only and the exact label is shown in point details.");
    }
    if (config.yDeltaFrom) {
      notes.push(ar ? "\u0627\u0644\u062A\u063A\u064A\u0631 \u0645\u0634\u062A\u0642 \u0644\u0643\u0644 \u0635\u0641: \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 \u0646\u0627\u0642\u0635 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629\u061B \u0648\u0627\u0644\u062E\u0637 \u0627\u0644\u0645\u062A\u0642\u0637\u0639 \u064A\u0645\u062B\u0644 \u0635\u0641\u0631\u0627\u064B\u060C \u0648\u0639\u0646\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0642\u0637\u0629 \u062A\u0638\u0647\u0631 \u0627\u0644\u0642\u0631\u0627\u0621\u062A\u0627\u0646 \u0627\u0644\u0623\u0635\u0644\u064A\u062A\u0627\u0646." : "Change is derived within each row as final minus initial; the dashed line marks zero and point details reveal both original readings.");
    }
    const chart = scientificSourceScatter({
      points: plotData.points,
      xLabel,
      yLabel,
      xUnit: config.xAxisUnit || config.xUnit,
      yUnit: config.yAxisUnit || config.yUnit,
      categories: plotData.categories,
      identityReference: Boolean(config.identityReference),
      zeroReference: Boolean(config.zeroReference),
      labels: labels2,
      sourceRowCount,
      validRowCount: plotData.validRows,
      captionNote: notes.join(" ")
    });
    const sourceLink = sourceUrl ? '<a href="' + esc(sourceUrl) + '" target="_blank" rel="noreferrer">NASA PSI \u2197</a>' : "";
    const reportLink = config.reportUrl ? '<a href="' + esc(config.reportUrl) + '" target="_blank" rel="noreferrer">' + (ar ? "\u062A\u0642\u0631\u064A\u0631 NASA BASS-II \u2197" : "NASA BASS-II report \u2197") + "</a>" : "";
    return [
      '<article class="card source-chart-card" data-source-chart="',
      esc(config.id),
      '">',
      "<h3>",
      esc(title),
      "</h3>",
      '<div class="grid three chart-explanation">',
      '<p class="sub"><b>',
      ar ? "\u0627\u0644\u0633\u0624\u0627\u0644" : "Question",
      "</b><br>",
      esc(question),
      "</p>",
      '<p class="sub"><b>',
      ar ? "\u0627\u0644\u063A\u0631\u0636" : "Purpose",
      "</b><br>",
      esc(purpose),
      "</p>",
      '<p class="sub"><b>',
      ar ? "\u062D\u062F\u0648\u062F \u0627\u0644\u062A\u0641\u0633\u064A\u0631" : "Interpretation limit",
      "</b><br>",
      esc(limit),
      "</p>",
      "</div>",
      '<p class="sub source-chart-fields">',
      ar ? "\u062D\u0642\u0648\u0644 NASA PSI \u0627\u0644\u0623\u0635\u0644\u064A\u0629: " : "Original NASA PSI fields: ",
      esc(config.xField),
      " \u2192 ",
      esc(config.yField),
      config.yDeltaFrom ? ar ? " \xB7 \u0641\u0631\u0642 \u0645\u062D\u0633\u0648\u0628: \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u2212 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A" : " \xB7 derived difference: final \u2212 initial" : "",
      sourceLink ? " \xB7 " + sourceLink : "",
      reportLink ? " \xB7 " + reportLink : "",
      "</p>",
      chart,
      "</article>"
    ].join("");
  }
  function renderSourceStudyCharts(studyId, rows, lang2 = "en", sourceUrl = "") {
    const ar = lang2 === "ar";
    const configs = sourceChartsForStudy(studyId);
    if (!configs.length) {
      const reason = SOURCE_STUDY_NO_PLOT_REASON[studyId];
      if (!reason) return "";
      return '<div class="callout">' + esc(reason[lang2]) + "</div>";
    }
    const charts = configs.map((config) => {
      const plotData = sourcePlotData(rows, config, lang2);
      if (plotData.validRows < 2) {
        return '<article class="card"><h3>' + esc(config.title[lang2]) + '</h3><p class="sub">' + (ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0632\u0648\u0627\u062C \u0631\u0642\u0645\u064A\u0629 \u0643\u0627\u0641\u064A\u0629 \u0641\u064A \u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0645\u0635\u062F\u0631 \u0644\u0647\u0630\u0627 \u0627\u0644\u0631\u0633\u0645\u061B \u0628\u0642\u064A\u062A \u0627\u0644\u0642\u064A\u0645 \u0643\u0645\u0627 \u0647\u064A." : "The source cells do not contain enough numeric pairs for this plot; values remain unchanged.") + "</p></article>";
      }
      return renderChartCard(config, plotData, lang2, sourceUrl, rows.length);
    });
    return [
      '<section class="study-source-charts"><div class="section-title"><div><h3>',
      ar ? "\u0645\u062E\u0637\u0637\u0627\u062A \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629" : "Plots for this investigation",
      '</h3><p class="sub">',
      ar ? "\u0631\u0633\u0648\u0645 \u0645\u0633\u062A\u0642\u0644\u0629 \u0645\u0646 \u062D\u0642\u0648\u0644 \u0647\u0630\u0627 \u0627\u0644\u062C\u062F\u0648\u0644 \u0641\u0642\u0637\u061B \u0644\u0627 \u062A\u064F\u062F\u0645\u062C \u0645\u0639 \u062A\u062D\u0642\u064A\u0642 \u0622\u062E\u0631." : "Separate plots from this table only; no rows are pooled with another investigation.",
      '</p></div><span class="tag">',
      configs.length,
      ar ? " \u0645\u062E\u0637\u0637\u0627\u062A" : " plots",
      '</span></div><div class="grid two">',
      charts.join(""),
      "</div></section>"
    ].join("");
  }
  async function renderSourceChartGuide(lang2 = "en") {
    const ar = lang2 === "ar";
    const catalog = await get("/api/challenge/catalog");
    const studyIds = [...new Set(SOURCE_STUDY_CHARTS.map((chart) => chart.studyId))];
    const results = await Promise.all(studyIds.map(async (id) => {
      try {
        const table = await loadStudyTable(id);
        const item = catalog.investigations.find((study) => study.id === id);
        return renderSourceStudyCharts(id, table.rows, lang2, (item == null ? void 0 : item.sourceUrl) || "");
      } catch (error) {
        return '<article class="card"><h3>' + esc(id) + '</h3><div class="callout warn">' + esc(error.message) + "</div></article>";
      }
    }));
    const noPlotStudies = Object.entries(SOURCE_STUDY_NO_PLOT_REASON).map(([id, reason]) => {
      const item = catalog.investigations.find((study) => study.id === id);
      return '<article class="card"><div class="eyebrow">' + esc(id) + "</div><h3>" + esc((item == null ? void 0 : item.title) || id) + '</h3><p class="sub">' + esc(reason[lang2]) + "</p></article>";
    });
    const totalCharts = SOURCE_STUDY_CHARTS.length;
    return [
      '<section class="chart-gallery source-chart-guide"><div class="section-title"><div><h2>',
      ar ? "\u0645\u062E\u0637\u0637\u0627\u062A \u062C\u062F\u0627\u0648\u0644 NASA PSI" : "NASA PSI source-table plots",
      "</h2><p>",
      ar ? "\u062A\u064F\u0639\u0631\u0636 \u0647\u0646\u0627 " + totalCharts + " \u0645\u062E\u0637\u0637\u0627\u064B \u0639\u0628\u0631 " + studyIds.length + " \u062A\u062D\u0642\u064A\u0642\u0627\u064B. \u064A\u062D\u062A\u0641\u0638 \u0643\u0644 \u0645\u062E\u0637\u0637 \u0628\u0648\u062D\u062F\u0627\u062A\u0647 \u0648\u062D\u0642\u0648\u0644\u0647 \u0648\u062D\u062F\u0648\u062F \u062A\u0641\u0633\u064A\u0631\u0647 \u0627\u0644\u062E\u0627\u0635\u0629." : totalCharts + " plots cover " + studyIds.length + " investigations. Each keeps its own source fields, units, and interpretation limits.",
      '</p></div></div><div class="source-chart-study-list">',
      results.join(""),
      '</div><h2 style="margin-top:24px">',
      ar ? "\u062C\u062F\u0627\u0648\u0644 \u0644\u0627 \u062A\u0646\u062A\u062C \u0631\u0633\u0645\u0627\u064B \u0643\u0645\u064A\u0627\u064B \u0622\u0645\u0646\u0627\u064B" : "Tables without a defensible quantitative plot",
      '</h2><p class="sub">',
      ar ? "\u0647\u0630\u0647 \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0645\u0631\u0641\u0642\u0629 \u0641\u064A \u0627\u0644\u0645\u0643\u062A\u0628\u0629 \u0648\u062A\u0638\u0644 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0633\u062A\u0639\u0631\u0627\u0636\u061B \u063A\u064A\u0627\u0628 \u0627\u0644\u0631\u0633\u0645 \u064A\u0639\u0643\u0633 \u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629\u060C \u0644\u0627 \u062D\u0630\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A." : "These tables remain available in the evidence library; the absence of a plot reflects the published data type, not omitted data.",
      '</p><div class="grid two source-chart-no-plot">',
      noPlotStudies.join(""),
      "</div></section>"
    ].join("");
  }

  // public/lib/flex-3d.js
  var VARIABLES = [
    { key: "oxygen_mole_fraction", en: "O\u2082 mole fraction", ar: "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A O\u2082", unit: "%", factor: 100 },
    { key: "pressure_mmHg", en: "Ambient pressure", ar: "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0645\u062D\u064A\u0637", unit: "mmHg" },
    { key: "initial_droplet_diameter_mm", en: "Initial droplet diameter", ar: "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A", unit: "mm" },
    { key: "visible_flame_extinction_diameter_mm", en: "Visible flame extinction diameter", ar: "\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A", unit: "mm" },
    { key: "burning_rate_mm_s", en: "Droplet burning-rate constant", ar: "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629", unit: "mm\xB2/s" },
    { key: "burn_time_s", en: "Burn time", ar: "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642", unit: "s" }
  ];
  var colorFor = (row) => row.test_end === "Extinction" ? "#42b883" : row.test_end === "Disruption" ? "#e4a84c" : "#8c79d8";
  var labelFor = (item, ar) => `${ar ? item.ar : item.en} \xB7 ${item.unit}`;
  var choices = (ar, selected) => VARIABLES.map((item) => `<option value="${item.key}"${item.key === selected ? " selected" : ""}>${esc(labelFor(item, ar))}</option>`).join("");
  function flex3DMarkup(lang2 = "en") {
    const ar = lang2 === "ar";
    return `<article class="card flex-3d-card"><div class="card-head"><div><h3>${ar ? "\u0641\u0636\u0627\u0621 \u0642\u064A\u0627\u0633\u0627\u062A FLEX \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F" : "FLEX measured-data 3D space"}</h3><p class="sub">${ar ? "\u0627\u062E\u062A\u0631 \u0623\u064A \u062B\u0644\u0627\u062B\u0629 \u062D\u0642\u0648\u0644 \u0631\u0642\u0645\u064A\u0629\u061B \u0645\u0648\u0627\u0636\u0639 \u0627\u0644\u0646\u0642\u0627\u0637 \u062A\u0639\u0643\u0633 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0628\u0639\u062F \u062A\u0637\u0628\u064A\u0639 \u0627\u0644\u0639\u0631\u0636 \u0641\u0642\u0637." : "Choose any three numeric fields. Point positions use the measured values; only display coordinates are normalized."}</p></div><span class="tag obs">NASA PSI-69 \xB7 OBSERVED</span></div>
  <div class="toolbar plot-studio-controls flex-3d-controls"><label>${ar ? "\u0645\u062D\u0648\u0631 X" : "X axis"}<select data-flex3d-axis="x">${choices(ar, "oxygen_mole_fraction")}</select></label><label>${ar ? "\u0645\u062D\u0648\u0631 Y" : "Y axis"}<select data-flex3d-axis="y">${choices(ar, "initial_droplet_diameter_mm")}</select></label><label>${ar ? "\u0645\u062D\u0648\u0631 Z" : "Z axis"}<select data-flex3d-axis="z">${choices(ar, "burning_rate_mm_s")}</select></label><label>${ar ? "\u0627\u0644\u0648\u0642\u0648\u062F" : "Fuel"}<select data-flex3d-fuel><option value="">${ar ? "\u0643\u0644 \u0627\u0644\u0623\u0646\u0648\u0627\u0639" : "All fuels"}</option></select></label><label>${ar ? "\u0627\u0644\u0646\u062A\u064A\u062C\u0629" : "Outcome"}<select data-flex3d-outcome><option value="">${ar ? "\u0643\u0644 \u0627\u0644\u0646\u062A\u0627\u0626\u062C" : "All outcomes"}</option></select></label></div>
  <div class="flex-3d-axis-readout" data-flex3d-axis-readout aria-live="polite"></div><canvas class="flex-3d-canvas" tabindex="0" role="img" aria-label="${ar ? "\u0645\u062E\u0637\u0637 \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u062A\u0641\u0627\u0639\u0644\u064A \u0644\u0642\u064A\u0627\u0633\u0627\u062A NASA FLEX" : "Interactive 3D plot of NASA FLEX measurements"}"></canvas><div class="flex-3d-tools"><button type="button" class="outline-btn" data-flex3d-zoom="in" aria-label="${ar ? "\u062A\u0643\u0628\u064A\u0631 \u0627\u0644\u0645\u062E\u0637\u0637 \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F" : "Zoom 3D plot in"}">\uFF0B</button><button type="button" class="outline-btn" data-flex3d-zoom="out" aria-label="${ar ? "\u062A\u0635\u063A\u064A\u0631 \u0627\u0644\u0645\u062E\u0637\u0637 \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F" : "Zoom 3D plot out"}">\u2212</button><button type="button" class="outline-btn" data-flex3d-reset>${ar ? "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0639\u0631\u0636" : "Reset view"}</button><span class="sub" data-flex3d-selection role="status" aria-live="polite">${ar ? "\u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062F\u0648\u064A\u0631 \xB7 \u0627\u0633\u062A\u062E\u062F\u0645 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0643\u0628\u064A\u0631 \xB7 \u0627\u062E\u062A\u0631 \u0646\u0642\u0637\u0629 \u0644\u0642\u0631\u0627\u0621\u0629 \u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u062F\u0631" : "Drag to rotate \xB7 use zoom controls \xB7 select a point to read source values"}</span></div><p class="sub" data-flex3d-count></p><p class="sub">${ar ? "\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u062D\u0627\u0648\u0631 \u064A\u0628\u062F\u0644 \u0627\u0644\u0639\u0631\u0636 \u0641\u0642\u0637 \u0648\u0644\u0627 \u064A\u063A\u064A\u0651\u0631 \u0627\u0644\u062A\u062C\u0631\u0628\u0629. \u0643\u0644 \u0646\u0642\u0637\u0629 \u0635\u0641 NASA PSI-69\u061B \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u062A\u0645\u062B\u0644 \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u0644\u064A\u0633\u062A \u0647\u0630\u0647 \u0645\u062D\u0627\u0643\u0627\u0629 \u0644\u0647\u0628 \u0648\u0644\u0627 \u062A\u0645\u062B\u064A\u0644\u0627\u064B \u0633\u0628\u0628\u064A\u0627\u064B." : "Changing axes changes only the view, not the experiment. Each point is a NASA PSI-69 row; colors show reported test outcome. This is neither a flame simulation nor a causal model."}</p></article>`;
  }
  function bindFlex3DPlot(root, rows, lang2 = "en") {
    var _a;
    const canvas = root.querySelector(".flex-3d-canvas");
    if (!canvas || !Array.isArray(rows)) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ar = lang2 === "ar";
    const selectors = Object.fromEntries(["x", "y", "z"].map((axis) => [axis, root.querySelector(`[data-flex3d-axis="${axis}"]`)]));
    const fuel = root.querySelector("[data-flex3d-fuel]"), outcome = root.querySelector("[data-flex3d-outcome]");
    const count = root.querySelector("[data-flex3d-count]"), selection = root.querySelector("[data-flex3d-selection]");
    const axisReadout = root.querySelector("[data-flex3d-axis-readout]");
    [...new Set(rows.map((row) => row.fuel).filter(Boolean))].sort().forEach((item) => fuel.add(new Option(item, item)));
    [...new Set(rows.map((row) => row.test_end).filter(Boolean))].sort().forEach((item) => outcome.add(new Option(item, item)));
    let yaw = -0.62, pitch = 0.35, zoom = 1, points = [], drag = null, filteredRows = [];
    const valuesFor = (row, axes) => axes.map((item) => row[item.key] * (item.factor || 1));
    const project = (values, ranges, width, height) => {
      const v = values.map((x, i) => ((x - ranges[i][0]) / (ranges[i][1] - ranges[i][0] || 1) - 0.5) * 2);
      const x1 = v[0] * Math.cos(yaw) - v[1] * Math.sin(yaw), y1 = v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw);
      const z1 = v[2] * Math.cos(pitch) - y1 * Math.sin(pitch), y2 = v[2] * Math.sin(pitch) + y1 * Math.cos(pitch);
      const scale = Math.min(width, height) * 0.31 * zoom / (2.8 - z1 * 0.28);
      return { x: width * 0.5 + x1 * scale, y: height * 0.52 - y2 * scale, depth: z1 };
    };
    const render = () => {
      const axes = ["x", "y", "z"].map((axis) => VARIABLES.find((item) => item.key === selectors[axis].value));
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (!rect.width || !rect.height) return;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);
      ctx.font = "11px system-ui";
      filteredRows = rows.filter((row) => (!fuel.value || row.fuel === fuel.value) && (!outcome.value || row.test_end === outcome.value));
      const data = filteredRows.filter((row) => axes.every((axis) => Number.isFinite(row[axis.key])));
      if (!data.length) {
        points = [];
        ctx.fillStyle = "#a9c3d2";
        ctx.textAlign = "center";
        ctx.fillText(ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0645\u0643\u062A\u0645\u0644\u0629 \u0644\u0644\u0645\u062D\u0627\u0648\u0631 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629" : "No complete rows for the selected axes", w / 2, h / 2);
        count.textContent = ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0635\u0627\u0644\u062D\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u0635\u0641\u064A\u0629." : "No valid rows after filtering.";
        return;
      }
      const ranges = axes.map((axis) => {
        const v = data.map((row) => row[axis.key] * (axis.factor || 1));
        return [Math.min(...v), Math.max(...v)];
      });
      if (axisReadout) axisReadout.innerHTML = axes.map((axis, index) => `<div class="flex-3d-axis-item"><b>${["X", "Y", "Z"][index]}</b><span>${esc(labelFor(axis, ar))}</span><small>${ranges[index][0].toPrecision(3)} \u2013 ${ranges[index][1].toPrecision(3)} ${esc(axis.unit)}</small></div>`).join("");
      const corners = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
      ctx.strokeStyle = "rgba(90,145,175,.38)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) if (corners[i].filter((v, k) => v !== corners[j][k]).length === 1) {
        const a = project(corners[i], corners.map(() => [-1, 1]), w, h), b = project(corners[j], corners.map(() => [-1, 1]), w, h);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      points = data.map((row) => __spreadValues({ row }, project(valuesFor(row, axes), ranges, w, h))).sort((a, b) => a.depth - b.depth);
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = colorFor(point.row);
        ctx.globalAlpha = 0.82;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      count.textContent = `${ar ? "\u0635\u0641\u0648\u0641 \u0645\u0639\u0631\u0648\u0636\u0629" : "Valid plotted rows"}: n=${points.length}/${filteredRows.length} \xB7 ${ar ? "\u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629 \u0645\u0646 \u0627\u0644\u0645\u062D\u0627\u0648\u0631 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629 \u0641\u0642\u0637" : "Rows missing any selected axis are omitted only from this view"}`;
    };
    const show = (point) => {
      var _a2, _b, _c, _d, _e;
      const r = point.row;
      selection.textContent = `${r.id || `Test ${r.test}`} \xB7 ${r.fuel || "\u2014"} \xB7 O\u2082 ${Number.isFinite(r.oxygen_mole_fraction) ? (r.oxygen_mole_fraction * 100).toFixed(1) + "%" : "\u2014"} \xB7 P ${(_a2 = r.pressure_mmHg) != null ? _a2 : "\u2014"} mmHg \xB7 d\u2080 ${(_b = r.initial_droplet_diameter_mm) != null ? _b : "\u2014"} mm \xB7 d\u2091 ${(_c = r.visible_flame_extinction_diameter_mm) != null ? _c : "\u2014"} mm \xB7 K ${(_d = r.burning_rate_mm_s) != null ? _d : "\u2014"} mm\xB2/s \xB7 t ${(_e = r.burn_time_s) != null ? _e : "\u2014"} s \xB7 ${r.test_end || "\u2014"}`;
    };
    Object.values(selectors).forEach((control) => control.addEventListener("change", render));
    fuel.addEventListener("change", render);
    outcome.addEventListener("change", render);
    canvas.addEventListener("pointerdown", (event) => {
      drag = { x: event.clientX, y: event.clientY, moved: false };
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;
      yaw += dx * 8e-3;
      pitch = Math.max(-1.15, Math.min(1.15, pitch + dy * 8e-3));
      drag.x = event.clientX;
      drag.y = event.clientY;
      render();
    });
    const stop = (event) => {
      if (!drag) return;
      if (!drag.moved) {
        const x = event.clientX - canvas.getBoundingClientRect().left, y = event.clientY - canvas.getBoundingClientRect().top;
        const nearest = points.reduce((best, p) => Math.hypot(p.x - x, p.y - y) < best.d ? { p, d: Math.hypot(p.x - x, p.y - y) } : best, { p: null, d: 18 });
        if (nearest.p) show(nearest.p);
      }
      drag = null;
    };
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointercancel", () => {
      drag = null;
    });
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      zoom = Math.max(0.65, Math.min(1.75, zoom * (event.deltaY < 0 ? 1.08 : 0.92)));
      render();
    }, { passive: false });
    root.querySelectorAll("[data-flex3d-zoom]").forEach((button) => button.addEventListener("click", () => {
      zoom = Math.max(0.65, Math.min(1.75, zoom * (button.dataset.flex3dZoom === "in" ? 1.16 : 0.86)));
      render();
    }));
    canvas.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") yaw -= 0.12;
      else if (event.key === "ArrowRight") yaw += 0.12;
      else if (event.key === "ArrowUp") pitch = Math.min(1.15, pitch + 0.12);
      else if (event.key === "ArrowDown") pitch = Math.max(-1.15, pitch - 0.12);
      else return;
      event.preventDefault();
      render();
    });
    (_a = root.querySelector("[data-flex3d-reset]")) == null ? void 0 : _a.addEventListener("click", () => {
      yaw = -0.62;
      pitch = 0.35;
      zoom = 1;
      selection.textContent = ar ? "\u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062F\u0648\u064A\u0631 \xB7 \u0639\u062C\u0644\u0629 \u0627\u0644\u0641\u0623\u0631\u0629 \u0644\u0644\u062A\u0643\u0628\u064A\u0631 \xB7 \u0627\u062E\u062A\u0631 \u0646\u0642\u0637\u0629 \u0644\u0642\u0631\u0627\u0621\u0629 \u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u062F\u0631" : "Drag to rotate \xB7 wheel to zoom \xB7 select a point to read source values";
      render();
    });
    new ResizeObserver(render).observe(canvas);
    render();
    const legend = document.createElement("p");
    legend.className = "sub flex-3d-legend";
    legend.innerHTML = `<span style="color:#42b883">\u25CF ${esc(ar ? "\u0627\u0646\u0637\u0641\u0627\u0621" : "Extinction")}</span> &nbsp; <span style="color:#e4a84c">\u25CF ${esc(ar ? "\u0627\u0636\u0637\u0631\u0627\u0628" : "Disruption")}</span> &nbsp; <span style="color:#8c79d8">\u25CF ${esc(ar ? "\u0627\u0633\u062A\u0645\u0631\u0627\u0631/\u0623\u062E\u0631\u0649" : "Sustained/other")}</span>`;
    canvas.after(legend);
  }

  // public/lib/external-nasa-evidence.js
  var FLOW_SOURCE = "https://ntrs.nasa.gov/citations/20130012832";
  var SHAPE_SOURCE = "https://ntrs.nasa.gov/api/citations/20030062163/downloads/20030062163.pdf";
  var FLOW_POINTS = [
    { u: -22, spread: 4.98, series: "2 cm \xB7 concurrent" },
    { u: -10, spread: 2.55, series: "2 cm \xB7 concurrent" },
    { u: -5, spread: 1.56, series: "2 cm \xB7 concurrent" },
    { u: -19, spread: 2.85, series: "1 cm \xB7 concurrent" },
    { u: -11, spread: 1.69, series: "1 cm \xB7 concurrent" },
    { u: 1.5, spread: 0.62, series: "2 cm \xB7 opposed" },
    { u: 2, spread: 0.82, series: "2 cm \xB7 opposed" },
    { u: 4, spread: 1.07, series: "2 cm \xB7 opposed" },
    { u: 6.5, spread: 1.13, series: "2 cm \xB7 opposed" },
    { u: 9, spread: 1.22, series: "2 cm \xB7 opposed" },
    { u: 10, spread: 1.42, series: "2 cm \xB7 opposed" },
    { u: 20, spread: 1.48, series: "2 cm \xB7 opposed" },
    { u: 47, spread: 1.12, series: "2 cm \xB7 opposed" }
  ];
  var esc2 = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
  function axisChart({ id, title, xLabel, yLabel, xMin, xMax, yMin, yMax, xTicks, yTicks, marks, captions, ar }) {
    const width = 760;
    const height = 420;
    const left = 74;
    const right = 28;
    const top = 36;
    const bottom = 70;
    const plotW = width - left - right;
    const plotH = height - top - bottom;
    const sx = (x) => left + (x - xMin) / (xMax - xMin) * plotW;
    const sy = (y) => top + (1 - (y - yMin) / (yMax - yMin)) * plotH;
    const grid = [
      ...xTicks.map((tick2) => `<line x1="${sx(tick2)}" y1="${top}" x2="${sx(tick2)}" y2="${top + plotH}" class="ext-grid"/><text x="${sx(tick2)}" y="${top + plotH + 20}" text-anchor="middle" class="ext-tick">${tick2}</text>`),
      ...yTicks.map((tick2) => `<line x1="${left}" y1="${sy(tick2)}" x2="${left + plotW}" y2="${sy(tick2)}" class="ext-grid"/><text x="${left - 12}" y="${sy(tick2) + 4}" text-anchor="end" class="ext-tick">${tick2}</text>`)
    ].join("");
    const content = marks({ sx, sy, plotW, plotH, left, top, ar });
    return `<svg class="external-nasa-svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc2(title)}</title><desc id="${id}-desc">${esc2(captions.description)}</desc>${grid}<line x1="${left}" y1="${top + plotH}" x2="${left + plotW}" y2="${top + plotH}" class="ext-axis"/><line x1="${left}" y1="${top}" x2="${left}" y2="${top + plotH}" class="ext-axis"/><text x="${left + plotW / 2}" y="${height - 16}" text-anchor="middle" class="ext-label">${esc2(xLabel)}</text><text x="18" y="${top + plotH / 2}" transform="rotate(-90 18 ${top + plotH / 2})" text-anchor="middle" class="ext-label">${esc2(yLabel)}</text>${content}</svg>`;
  }
  function renderFlowChart(ar) {
    const enSeries = [
      { key: "2 cm \xB7 concurrent", color: "#55c4ee", label: ar ? "2 \u0633\u0645 \xB7 \u062C\u0631\u064A\u0627\u0646 \u0645\u062A\u0632\u0627\u0645\u0646" : "2 cm \xB7 concurrent" },
      { key: "1 cm \xB7 concurrent", color: "#a78bfa", label: ar ? "1 \u0633\u0645 \xB7 \u062C\u0631\u064A\u0627\u0646 \u0645\u062A\u0632\u0627\u0645\u0646" : "1 cm \xB7 concurrent" },
      { key: "2 cm \xB7 opposed", color: "#f1a65a", label: ar ? "2 \u0633\u0645 \xB7 \u062C\u0631\u064A\u0627\u0646 \u0645\u0639\u0627\u0643\u0633" : "2 cm \xB7 opposed" }
    ];
    return axisChart({
      id: "nasa-flow-spread",
      title: ar ? "\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u062F\u0641\u0642 \u0627\u0644\u0642\u0633\u0631\u064A \u0648\u0645\u0639\u062F\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628" : "Forced-flow velocity and flame-spread rate",
      xLabel: ar ? "\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u062F\u0641\u0642 \u0627\u0644\u0642\u0633\u0631\u064A \u0627\u0644\u0645\u0648\u0642\u0651\u0639\u0629 (\u0633\u0645/\u062B)" : "Signed forced-flow velocity (cm/s)",
      yLabel: ar ? "\u0645\u0639\u062F\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628 (\u0645\u0645/\u062B)" : "Flame-spread rate (mm/s)",
      xMin: -50,
      xMax: 50,
      yMin: 0,
      yMax: 6,
      xTicks: [-40, -20, 0, 20, 40],
      yTicks: [0, 1, 2, 3, 4, 5, 6],
      ar,
      captions: { description: ar ? "\u0646\u0642\u0627\u0637 \u0631\u0642\u0645\u064A\u0629 \u062A\u0642\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0645\u062E\u0637\u0637 NASA BASS \u0641\u064A \u0627\u0644\u0634\u0631\u064A\u062D\u0629 30\u061B \u0627\u0644\u0633\u0631\u0639\u0627\u062A \u0627\u0644\u0633\u0627\u0644\u0628\u0629 \u062A\u0645\u062B\u0644 \u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0645\u062A\u0632\u0627\u0645\u0646 \u0648\u0627\u0644\u0645\u0648\u062C\u0628\u0629 \u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0645\u0639\u0627\u0643\u0633." : "Approximate digitized points from the NASA BASS plot on slide 30; negative velocities are concurrent flow and positive velocities are opposed flow." },
      marks: ({ sx, sy, left, top, plotW, plotH }) => {
        const lines = enSeries.map((series) => {
          const points = FLOW_POINTS.filter((point) => point.series === series.key).sort((a, b) => a.u - b.u);
          const coordinates = points.map((point) => `${sx(point.u)},${sy(point.spread)}`).join(" ");
          return `<polyline points="${coordinates}" fill="none" stroke="${series.color}" stroke-width="2" opacity=".78"/>${points.map((point) => `<circle cx="${sx(point.u)}" cy="${sy(point.spread)}" r="5" fill="${series.color}" stroke="var(--surface)" stroke-width="1.5"><title>${esc2(series.label)} \xB7 U=${point.u} cm/s \xB7 Vf\u2248${point.spread} mm/s</title></circle>`).join("")}`;
        }).join("");
        const legend = enSeries.map((series, index) => `<g transform="translate(${left + 12 + index * 218},${top + plotH + 46})"><circle r="5" fill="${series.color}"/><text x="10" y="4" class="ext-legend">${esc2(series.label)}</text></g>`).join("");
        const zeroX = sx(0);
        const directionLabels = `<text x="${sx(-27)}" y="${top - 12}" text-anchor="middle" class="ext-note">${ar ? "\u0645\u062A\u0632\u0627\u0645\u0646 \u0645\u0639 \u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631" : "concurrent with spread"}</text><text x="${sx(27)}" y="${top - 12}" text-anchor="middle" class="ext-note">${ar ? "\u0645\u0639\u0627\u0643\u0633 \u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631" : "opposed to spread"}</text><line x1="${zeroX}" y1="${top}" x2="${zeroX}" y2="${top + plotH}" stroke="var(--muted)" stroke-dasharray="4 4" opacity=".7"/>`;
        return `${directionLabels}${lines}${legend}`;
      }
    });
  }
  function renderSphericityChart(ar) {
    return axisChart({
      id: "nasa-gravity-sphericity",
      title: ar ? "\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0645\u0642\u0627\u0628\u0644 \u0627\u0633\u062A\u062F\u0627\u0631\u0629 \u0627\u0644\u0644\u0647\u0628 \xB7 \u062D\u0627\u0644\u0629 NASA \u0648\u0627\u062D\u062F\u0629" : "Gravity vs. flame sphericity \xB7 one NASA case",
      xLabel: ar ? "\u0646\u0638\u0627\u0645 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A (0g \u0625\u0644\u0649 1g)" : "Reference gravity regime (0g to 1g)",
      yLabel: ar ? "\u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0631\u0629 D\u2093 / D_z (\u0628\u0644\u0627 \u0648\u062D\u062F\u0629)" : "Sphericity D\u2093 / D_z (dimensionless)",
      xMin: 0,
      xMax: 1.15,
      yMin: 0.3,
      yMax: 1.2,
      xTicks: [0, 0.25, 0.5, 0.75, 1],
      yTicks: [0.4, 0.6, 0.8, 1, 1.2],
      ar,
      captions: { description: ar ? "\u0646\u0642\u0637\u0629 \u0632\u0631\u0642\u0627\u0621: \u0642\u064A\u0627\u0633 \u062A\u062C\u0631\u064A\u0628\u064A \u0645\u0646\u0634\u0648\u0631 \u0644\u0644\u0627\u0633\u062A\u062F\u0627\u0631\u0629 1.0 \u0641\u064A \u062A\u062C\u0631\u0628\u0629 \u0628\u0631\u062C \u0627\u0644\u0625\u0633\u0642\u0627\u0637 \u0628\u0639\u062F \u0646\u0635\u0641 \u062B\u0627\u0646\u064A\u0629\u061B \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u0644\u0645 \u064A\u064F\u0642\u064E\u0633 \u0641\u064A \u0627\u0644\u062A\u0642\u0631\u064A\u0631. \u0646\u0642\u0637\u0629 \u0628\u0631\u062A\u0642\u0627\u0644\u064A\u0629: \u0642\u0631\u0627\u0621\u0629 \u062A\u0642\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0645\u062D\u0627\u0643\u0627\u0629 NASA \u0639\u0646\u062F 1g \u0642\u0628\u0644 \u0627\u0644\u0625\u0633\u0642\u0627\u0637. \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u064A\u0646 \u0631\u0635\u062F \u0648\u0646\u0645\u0648\u0630\u062C\u060C \u0644\u0627 \u0633\u0644\u0633\u0644\u0629 \u0642\u064A\u0627\u0633\u0627\u062A \u0648\u0644\u0627 \u0639\u0644\u0627\u0642\u0629 \u0645\u0644\u0627\u0626\u0645\u0629." : "Blue point: reported experimental sphericity of 1.0, 0.5 seconds after drop; residual gravity was not measured in the report. Orange point: approximate NASA simulation read-off at 1g before drop. This compares an observation with a model; it is not a measured series or fitted relationship." },
      marks: ({ sx, sy, left, top, plotW, plotH, ar: rtl }) => {
        const modelX = sx(1);
        const modelY = sy(0.39);
        const measuredX = sx(0);
        const measuredY = sy(1);
        return `<rect x="${sx(0)}" y="${top}" width="${sx(0.04) - sx(0)}" height="${plotH}" fill="#55c4ee" opacity=".10"/><circle cx="${measuredX + 7}" cy="${measuredY}" r="7" fill="#55c4ee" stroke="var(--surface)" stroke-width="2"><title>${rtl ? "\u0642\u064A\u0627\u0633 \u062A\u062C\u0631\u064A\u0628\u064A \u0645\u0646\u0634\u0648\u0631" : "Reported experimental measurement"} \xB7 microgravity drop tower; residual g unreported \xB7 t=0.5 s \xB7 sphericity=1.0</title></circle><path d="M ${modelX} ${modelY - 8} L ${modelX + 8} ${modelY} L ${modelX} ${modelY + 8} L ${modelX - 8} ${modelY} Z" fill="#f1a65a" stroke="var(--surface)" stroke-width="1.5"><title>${rtl ? "\u0645\u062D\u0627\u0643\u0627\u0629 \u062A\u0642\u0631\u064A\u0628\u064A\u0629 \u0645\u0642\u0631\u0648\u0621\u0629 \u0645\u0646 \u0627\u0644\u0634\u0643\u0644 6" : "Approximate model read-off from figure 6"} \xB7 1g pre-drop \xB7 sphericity\u22480.39</title></path><text x="${measuredX + 16}" y="${measuredY - 12}" class="ext-note">\u03BCg \xB7 1.0</text><text x="${modelX - 10}" y="${modelY - 13}" text-anchor="end" class="ext-note">1g \xB7 \u22480.39</text><g transform="translate(${left + 12},${top + plotH + 42})"><circle cx="6" cy="0" r="6" fill="#55c4ee"/><text x="18" y="4" class="ext-legend">${rtl ? "\u0642\u064A\u0627\u0633 \u0628\u0631\u062C \u0625\u0633\u0642\u0627\u0637\u061B g \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u063A\u064A\u0631 \u0645\u0630\u0643\u0648\u0631" : "Drop-tower experiment; residual g unreported"}</text><path d="M 390 -7 L 397 0 L 390 7 L 383 0 Z" fill="#f1a65a"/><text x="406" y="4" class="ext-legend">${rtl ? "\u0645\u062D\u0627\u0643\u0627\u0629 1g \u062A\u0642\u0631\u064A\u0628\u064A\u0629 \u0642\u0628\u0644 \u0627\u0644\u0625\u0633\u0642\u0627\u0637" : "Approximate 1g pre-drop simulation"}</text></g>`;
      }
    });
  }
  function renderExternalNASAPlots(lang2 = "en") {
    const ar = lang2 === "ar";
    return `<section class="insight-chart-block external-nasa-evidence"><h3>${ar ? "\u062F\u0631\u0627\u0633\u0627\u062A NASA \u0625\u0636\u0627\u0641\u064A\u0629 \u062E\u0627\u0631\u062C \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u062A\u062D\u062F\u064A" : "Additional NASA studies beyond the challenge tables"}</h3><p class="sub">${ar ? "\u0623\u064F\u0636\u064A\u0641\u062A \u0647\u0630\u0647 \u0627\u0644\u0645\u0631\u0627\u062C\u0639 \u0644\u0623\u0646 \u0645\u0644\u0641\u0627\u062A PSI \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u0644\u0627 \u062A\u063A\u0637\u064A \u0647\u0630\u064A\u0646 \u0627\u0644\u0645\u062D\u0648\u0631\u064A\u0646. \u062A\u0628\u0642\u0649 \u0645\u0646\u0641\u0635\u0644\u0629 \u0639\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u062F\u064A \u0648\u0644\u0627 \u062A\u062F\u062E\u0644 \u0641\u064A \u0625\u062D\u0635\u0627\u0621\u0627\u062A\u0647." : "These studies extend two gaps in the bundled PSI tables. They remain separate from challenge data and are not included in its record counts."}</p><div class="grid two"><article class="card external-chart-card"><div class="eyebrow">NASA BASS \xB7 ${ar ? "\u0646\u0642\u0627\u0637 \u0645\u064F\u0631\u0642\u0645\u0646\u0629" : "DIGITIZED PLOT"}</div><h4>${ar ? "\u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0642\u0633\u0631\u064A\u0629 \u0645\u0642\u0627\u0628\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628" : "Forced airflow vs. flame spread"}</h4>${renderFlowChart(ar)}<p class="sub">${ar ? "\u062A\u0642\u0631\u064A\u0628 \u064A\u062F\u0648\u064A \u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u061B \u0639\u062F\u0645 \u0627\u0644\u064A\u0642\u064A\u0646 \u0627\u0644\u0628\u0635\u0631\u064A \u064A\u0642\u0627\u0631\u0628 \xB11 \u0633\u0645/\u062B \u0648\xB10.15 \u0645\u0645/\u062B. \u0627\u0644\u0639\u064A\u0646\u0627\u062A \u0646\u0633\u064A\u062C \u0642\u0637\u0646\u064A-\u0632\u062C\u0627\u062C\u064A \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\u060C \u0628\u0639\u0631\u0636 1 \u0623\u0648 2 \u0633\u0645. \u0627\u0644\u0645\u062D\u0648\u0631 \u0627\u0644\u0645\u0648\u0642\u0651\u0639 \u064A\u0645\u064A\u0632 \u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0645\u062A\u0632\u0627\u0645\u0646 (\u0633\u0627\u0644\u0628) \u0648\u0627\u0644\u0645\u0639\u0627\u0643\u0633 (\u0645\u0648\u062C\u0628). \u0644\u0627 \u062A\u064F\u0639\u0645\u0645 \u0627\u0644\u0642\u064A\u0645 \u0639\u0644\u0649 \u0648\u0642\u0648\u062F \u0623\u0648 \u0647\u0646\u062F\u0633\u0629 \u0623\u062E\u0631\u0649." : "Manual approximation of published plot points; visual read-off uncertainty is about \xB11 cm/s and \xB10.15 mm/s. Samples were cotton/fiberglass fabric in microgravity, 1 or 2 cm wide. Signed velocity distinguishes concurrent (negative) from opposed (positive) flow. Do not generalize to other fuels or geometries."}<br><a href="${FLOW_SOURCE}" target="_blank" rel="noreferrer">${ar ? "\u0633\u062C\u0644 NASA NTRS \xB7 \u0627\u0644\u0639\u0631\u0636 \u0648\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0623\u0635\u0644\u064A \u2197" : "NASA NTRS record \xB7 presentation and original figure \u2197"}</a></p></article><article class="card external-chart-card"><div class="eyebrow">NASA DROP-TOWER STUDY \xB7 ${ar ? "\u0642\u064A\u0627\u0633 + \u0645\u062D\u0627\u0643\u0627\u0629" : "MEASUREMENT + MODEL"}</div><h4>${ar ? "\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0634\u0643\u0644 \u0627\u0644\u0644\u0647\u0628 \u0644\u062A\u063A\u064A\u0631 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629" : "Flame-shape response to changing gravity"}</h4>${renderSphericityChart(ar)}<p class="sub">${ar ? "\u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0631\u0629 \u0647\u064A \u0646\u0633\u0628\u0629 \u0627\u0644\u0642\u0637\u0631 \u0627\u0644\u0623\u0641\u0642\u064A \u0625\u0644\u0649 \u0627\u0644\u0639\u0645\u0648\u062F\u064A. \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u064A\u0630\u0643\u0631 \u0642\u064A\u0627\u0633\u0627\u064B \u062A\u062C\u0631\u064A\u0628\u064A\u0627\u064B 1.0 \u0639\u0646\u062F 0.5 \u062B\u0627\u0646\u064A\u0629 \u0628\u0639\u062F \u0627\u0644\u0625\u0633\u0642\u0627\u0637\u061B \u0627\u0644\u0646\u0642\u0637\u0629 \u0627\u0644\u0632\u0631\u0642\u0627\u0621 \u0642\u064A\u0627\u0633 \u0645\u0646\u0634\u0648\u0631 (1.0 \u0628\u0639\u062F \u0646\u0635\u0641 \u062B\u0627\u0646\u064A\u0629)\u061B \u0627\u0644\u062A\u0633\u0627\u0631\u0639 \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u0644\u0645 \u064A\u0630\u0643\u0631\u0647 \u0627\u0644\u062A\u0642\u0631\u064A\u0631. \u0627\u0644\u0628\u0631\u062A\u0642\u0627\u0644\u064A\u0629 \u0642\u0631\u0627\u0621\u0629 \u062A\u0642\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0645\u062D\u0627\u0643\u0627\u0629 1g \u0642\u0628\u0644 \u0627\u0644\u0625\u0633\u0642\u0627\u0637. \u0646\u0645\u064A\u0632 \u0628\u064A\u0646 \u0627\u0644\u0631\u0635\u062F \u0648\u0627\u0644\u0645\u062D\u0627\u0643\u0627\u0629\u060C \u0648\u0644\u0627 \u062A\u0643\u0641\u064A \u0646\u0642\u0637\u062A\u0627\u0646 \u0644\u062A\u062D\u062F\u064A\u062F \u0642\u0627\u0646\u0648\u0646 \u0644\u0644\u062C\u0627\u0630\u0628\u064A\u0629. \u0627\u0644\u062D\u0627\u0644\u0629 \u0644\u0647\u0628 \u0627\u0646\u062A\u0634\u0627\u0631 \u0645\u0646 \u0645\u0648\u0642\u062F \u0643\u0631\u0648\u064A \u0628\u062E\u0644\u064A\u0637 H\u2082/CH\u2084/N\u2082\u060C \u0648\u0644\u064A\u0633\u062A \u0642\u0627\u0639\u062F\u0629 \u0644\u0643\u0644 \u0627\u0644\u062D\u0631\u0627\u0626\u0642." : "Sphericity is horizontal-to-vertical flame diameter. Blue is the reported experimental sphericity (1.0 at 0.5 s after drop); residual acceleration was not reported. Orange is an approximate read-off of the model at 1g immediately before drop. Observation and simulation are intentionally shown with different symbols; two points do not establish a fitted gravity law. This was an H\u2082/CH\u2084/N\u2082 burner-generated diffusion flame, not a universal fire result."}<br><a href="${SHAPE_SOURCE}" target="_blank" rel="noreferrer">${ar ? "\u062A\u0642\u0631\u064A\u0631 NASA NTRS \xB7 \u0627\u0644\u0634\u0643\u0644 6 \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u2197" : "NASA NTRS report \xB7 figure 6 and reported data \u2197"}</a> \xB7 <a href="https://coewww.rutgers.edu/~sdytse/papers/2001-C%26F_SphrclDiffFlm.pdf" target="_blank" rel="noreferrer">${ar ? "\u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A \u0627\u0644\u0623\u0635\u0644\u064A \u2197" : "Original experimental paper \u2197"}</a></p></article></div><div class="callout">${ar ? '\u0642\u0631\u0627\u0621\u0629 \u0645\u0634\u062A\u0631\u0643\u0629: \u0636\u0639\u0641 \u0627\u0644\u0637\u0641\u0648 \u064A\u0642\u0631\u0651\u0628 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631\u064A \u0627\u0644\u0633\u0627\u0643\u0646 \u0645\u0646 \u0627\u0644\u062A\u0646\u0627\u0638\u0631 \u0627\u0644\u0643\u0631\u0648\u064A\u060C \u0644\u0643\u0646 \u0627\u0644\u062A\u062F\u0641\u0642 \u0627\u0644\u0642\u0633\u0631\u064A \u064A\u0638\u0644 \u0642\u0627\u062F\u0631\u0627\u064B \u0639\u0644\u0649 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0648\u0627\u0644\u0634\u0643\u0644. \u0648\u062A\u0630\u0643\u0631 \u062F\u0631\u0627\u0633\u0629 NASA \u0645\u0633\u062A\u0642\u0644\u0629 \u0644\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u062C\u0632\u0626\u064A\u0629 \u0623\u0646 \u0627\u0644\u0644\u0647\u0628 \u0635\u0627\u0631 \u0623\u0637\u0648\u0644 \u0648\u0623\u0636\u064A\u0642 \u0648\u0623\u0643\u062B\u0631 \u0633\u0637\u0648\u0639\u0627\u064B \u0645\u0639 \u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629\u061B \u0644\u0643\u0646 \u0645\u0644\u062E\u0635\u0647\u0627 \u0648\u0635\u0641\u064A \u0648\u0644\u0627 \u064A\u0639\u0637\u064A \u0623\u0631\u0642\u0627\u0645 \u0627\u0633\u062A\u062F\u0627\u0631\u0629\u060C \u0644\u0630\u0644\u0643 \u0644\u0645 \u0646\u0631\u0633\u0645 \u0633\u0644\u0633\u0644\u0629 \u0631\u0642\u0645\u064A\u0629 \u0645\u0646\u0647\u0627 (<a href="https://ntrs.nasa.gov/citations/20170011213" target="_blank" rel="noreferrer">NASA NTRS 20170011213 \u2197</a>). \u062A\u0628\u0642\u0649 \u0643\u0644 \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 \u0645\u0646\u0641\u0635\u0644\u0629 \u0639\u0646 PSI \u0648\u0644\u0627 \u062A\u064F\u062F\u0645\u062C \u0645\u0639\u0647\u0627.' : 'Read together: weaker buoyancy allows a quiescent diffusion flame to approach spherical symmetry, while forced flow still changes spread and shape. A separate NASA partial-gravity centrifuge study also reported flames becoming longer, narrower, and brighter as gravity increased; its abstract reports qualitative shape, not numerical sphericity, so it is not plotted as a numeric series (<a href="https://ntrs.nasa.gov/citations/20170011213" target="_blank" rel="noreferrer">NASA NTRS 20170011213 \u2197</a>). All supplementary studies remain independent of challenge PSI records and must not be pooled across experiments.'}</div></section>`;
  }
  var EXTERNAL_NASA_SOURCES = [
    {
      title: "Flammability Aspects of a Cotton-Fiberglass Fabric in Opposed and Concurrent Airflow in Microgravity",
      date: "2012 \xB7 NASA NTRS document 20130012832",
      url: FLOW_SOURCE,
      method: "ISS microgravity wind-tunnel tests; cotton/fiberglass fabric; opposed and concurrent flow; 1 cm and 2 cm samples.",
      use: "Approximate point digitization from the presentation plot on slide 30 for airflow velocity vs. flame spread rate.",
      limit: "Points are manually digitized from a plotted figure (not native table data); signed velocity and flow direction are preserved; one fuel geometry only."
    },
    {
      title: "Simulation of Combustion Systems with Realistic G-Jitter \xB7 final progress report",
      date: "2003 \xB7 NASA NTRS document 20030062163 \xB7 NASA-funded report",
      url: SHAPE_SOURCE,
      method: "NASA 2.2-second drop-tower spherical diffusion flame; hydrogen/methane/nitrogen mixture; numerical gravity-step response.",
      use: "Figure 6 reports experimental sphericity 1.0 at t = 0.5 s after drop; its model curve gives the comparison point near 0.39 immediately before drop at 1g.",
      limit: "The 1g value is approximate model output; the microgravity value is the reported experiment. Actual residual gravity was not measured. They are not matched repeated measurements, and must not be used to fit a universal gravity trend."
    },
    {
      title: "Microgravity Burner-Generated Spherical Diffusion Flames: Experiment and Computation",
      date: "2001 \xB7 Combustion and Flame 125(4), 1265\u20131278 \xB7 DOI 10.1016/S0010-2180(01)00247-4",
      url: "https://coewww.rutgers.edu/~sdytse/papers/2001-C%26F_SphrclDiffFlm.pdf",
      method: "NASA Glenn 2.2-second drop tower; spherical porous burner with H\u2082/CH\u2084/N\u2082 in atmospheric air; flame shape imaged through the 1g-to-microgravity transition.",
      use: "Primary experimental paper underlying the reported sphericity measurement and figure 6 reference.",
      limit: "A specific burner mixture and transient drop-tower case; it does not establish one shape law for every flame."
    },
    {
      title: "Centrifuge in Free Fall: Combustion at Partial Gravity \xB7 NASA NTRS 20170011213",
      date: "2017 \xB7 NASA Glenn Research Center presentation",
      url: "https://ntrs.nasa.gov/citations/20170011213",
      method: "NASA 5.18-second drop-tower centrifuge; 23 simulated candle tests at partial gravity with heptane and ethanol.",
      use: "Independent qualitative context: flames became longer, narrower, and brighter as gravity increased.",
      limit: "The NASA abstract reports qualitative morphology, not a numeric sphericity-versus-gravity table; no numeric points are fabricated from it."
    }
  ];

  // public/challenge-research.js
  var studyNotes = {
    "PSI-20": "ACME BRE \xB7 gaseous flames and burning-rate emulator test conditions",
    "PSI-21": "ACME CLD \xB7 coflow laminar diffusion flame test inventory",
    "PSI-22": "ACME E-FIELD \xB7 electric-field diffusion flame test inventory",
    "PSI-23": "ACME s-Flame \xB7 spherical diffusion flame test inventory",
    "PSI-25": "BASS-II \xB7 solid-fuel burning and suppression",
    "PSI-26": "BASS \xB7 solid-fuel burning and suppression",
    "PSI-39": "CFI \xB7 Cool Flames Investigation test conditions",
    "PSI-47": "DAFT \xB7 dust and aerosol measurement sessions",
    "PSI-68": "FLEX-2 \xB7 droplet-combustion test envelope",
    "PSI-69": "FLEX \xB7 liquid-droplet flames and gaseous suppressants",
    "PSI-98": "SAFFIRE-I \xB7 spacecraft fire and material flammability",
    "PSI-99": "SAFFIRE-II \xB7 spacecraft fire and flame spread",
    "PSI-100": "SAFFIRE-III \xB7 spacecraft fire and flame spread",
    "PSI-101": "SAME-R \xB7 smoke and aerosol measurements",
    "PSI-102": "SAME \xB7 smoke and aerosol measurements",
    "PSI-107": "SPICE \xB7 Smoke Point In Co-flow Experiment"
  };
  var studyNotesArabic = {
    "PSI-20": "ACME BRE \xB7 \u0634\u0631\u0648\u0637 \u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u063A\u0627\u0632\u064A \u0648\u0645\u062D\u0627\u0643\u064A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642",
    "PSI-21": "ACME CLD \xB7 \u0641\u0647\u0631\u0633 \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0645\u062A\u0648\u0627\u0632\u064A",
    "PSI-22": "ACME E-FIELD \xB7 \u0641\u0647\u0631\u0633 \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u062A\u062D\u062A \u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A",
    "PSI-23": "ACME s-Flame \xB7 \u0641\u0647\u0631\u0633 \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0643\u0631\u0648\u064A",
    "PSI-25": "BASS-II \xB7 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0648\u0625\u062E\u0645\u0627\u062F\u0647\u0627",
    "PSI-26": "BASS \xB7 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0648\u0625\u062E\u0645\u0627\u062F\u0647\u0627",
    "PSI-39": "CFI \xB7 \u0634\u0631\u0648\u0637 \u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0628\u0627\u0631\u062F",
    "PSI-47": "DAFT \xB7 \u062C\u0644\u0633\u0627\u062A \u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0628\u0627\u0631 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u062C\u0648\u064A",
    "PSI-68": "FLEX-2 \xB7 \u0646\u0637\u0627\u0642 \u062A\u062C\u0627\u0631\u0628 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0627\u062A",
    "PSI-69": "FLEX \xB7 \u0644\u0647\u0628 \u0627\u0644\u0642\u0637\u0631\u0627\u062A \u0627\u0644\u0633\u0627\u0626\u0644\u0629 \u0648\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0625\u062E\u0645\u0627\u062F",
    "PSI-98": "SAFFIRE-I \xB7 \u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629 \u0648\u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0648\u0627\u062F",
    "PSI-99": "SAFFIRE-II \xB7 \u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629 \u0648\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628",
    "PSI-100": "SAFFIRE-III \xB7 \u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629 \u0648\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628",
    "PSI-101": "SAME-R \xB7 \u0642\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u062C\u0648\u064A",
    "PSI-102": "SAME \xB7 \u0642\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u062C\u0648\u064A",
    "PSI-107": "SPICE \xB7 \u062A\u062C\u0631\u0628\u0629 \u0646\u0642\u0637\u0629 \u0627\u0644\u062F\u062E\u0627\u0646 \u0641\u064A \u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0645\u062A\u0648\u0627\u0632\u064A"
  };
  var analysisNotesArabic = {
    "PSI-20": "\u0635\u0641\u0648\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u064A\u0648\u0645\u064A\u0629\u061B \u0627\u0644\u0639\u062F\u062F \u064A\u0635\u0641 \u0635\u0641 \u0627\u0644\u0645\u0644\u062E\u0635 \u0648\u0644\u0627 \u064A\u0645\u062B\u0644 \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0641\u0631\u062F\u064A\u0629. \u062A\u0633\u0645\u064A\u0627\u062A \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629 \u0645\u062D\u0641\u0648\u0638\u0629 \u0648\u0644\u0627 \u062A\u064F\u0631\u0628\u0637 \u0628\u0646\u062A\u064A\u062C\u0629 \u0641\u0631\u062F\u064A\u0629.",
    "PSI-21": "\u0627\u0644\u0635\u0641\u0648\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u0623\u064A\u0627\u0645 \u0627\u062E\u062A\u0628\u0627\u0631. \u062A\u064F\u062D\u0641\u0638 \u062D\u0642\u0648\u0644 MFC \u0648\u0648\u062D\u062F\u0627\u062A\u0647\u0627 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A\u061B \u0648\u0644\u0627 \u064A\u0639\u0632\u0644 \u0647\u0630\u0627 \u0627\u0644\u0648\u0635\u0641 \u0623\u062B\u0631 \u0627\u0644\u0648\u0642\u0648\u062F \u0623\u0648 \u0627\u0644\u062A\u062F\u0641\u0642.",
    "PSI-22": "\u062A\u064F\u0644\u062E\u0651\u0635 \u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0641\u0642\u0637\u060C \u0648\u062A\u0638\u0644 \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0641\u0627\u0631\u063A\u0629 \u0623\u0648 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A \u0636\u0645\u0646 \u0641\u0647\u0631\u0633 \u0627\u0644\u0645\u0635\u062F\u0631. \u0644\u0627 \u064A\u0646\u062A\u062C \u0639\u0646\u0647\u0627 \u0646\u0645\u0648\u0630\u062C \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0644\u0643\u0644 \u0644\u0647\u0628.",
    "PSI-23": "\u0627\u0644\u0635\u0641\u0648\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u0623\u064A\u0627\u0645 \u0627\u062E\u062A\u0628\u0627\u0631\u061B \u062D\u064F\u0641\u0638\u062A \u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u0646\u062C\u0645\u0629 \u0648\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0645\u0635\u062F\u0631. \u0644\u0627 \u062A\u064F\u0633\u062A\u0646\u062A\u062C \u0628\u0646\u064A\u0629 \u0627\u0644\u0644\u0647\u0628 \u0623\u0648 \u0633\u0631\u0639\u0629 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u062C\u062F\u0648\u0644.",
    "PSI-25": "\u0647\u0630\u0647 \u0646\u0637\u0627\u0642\u0627\u062A \u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u0639\u0628\u0631 \u0635\u0641\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A\u060C \u0648\u0644\u064A\u0633\u062A \u0623\u062B\u0631\u064B\u0627 \u0645\u0639\u0632\u0648\u0644\u064B\u0627 \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646. \u062A\u062E\u062A\u0644\u0641 \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u062A\u062F\u0641\u0642\u0627\u062A \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u0625\u0634\u0639\u0627\u0644\u061B \u0648\u0623\u064F\u0628\u0642\u064A\u062A \u0642\u0631\u0627\u0621\u0627\u062A CO \u0627\u0644\u0633\u0627\u0644\u0628\u0629 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A.",
    "PSI-26": "\u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u0647\u0631\u0633 \u0644\u0644\u0639\u064A\u0646\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u062F\u0648\u0646 \u0646\u062A\u064A\u062C\u0629 \u0631\u0642\u0645\u064A\u0629 \u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628 \u0623\u0648 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u061B \u064A\u0641\u064A\u062F \u0641\u064A \u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A \u0648\u062A\u0648\u062B\u064A\u0642\u0647\u0627 \u0644\u0627 \u0641\u064A \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0645\u062E\u0627\u0637\u0631.",
    "PSI-39": "\u062D\u0642\u0648\u0644 \u062A\u0631\u0643\u064A\u0628 \u0644\u0644\u062C\u0648 \u0627\u0644\u0645\u062D\u064A\u0637 \u0648\u0644\u064A\u0633\u062A \u0646\u062A\u0627\u0626\u062C \u0627\u062D\u062A\u0631\u0627\u0642. \u0644\u0627 \u062A\u0630\u0643\u0631 \u0639\u0646\u0627\u0648\u064A\u0646 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0648\u062D\u062F\u0627\u062A\u061B \u0644\u0630\u0644\u0643 \u0644\u0627 \u0646\u062D\u0648\u0644 \u0627\u0644\u0642\u064A\u0645 \u0648\u0644\u0627 \u0646\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0643\u062F\u0631\u062C\u0627\u062A \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0634\u062A\u0639\u0627\u0644.",
    "PSI-47": "\u064A\u062D\u062A\u0648\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0635\u0641 \u062C\u0644\u0633\u062A\u064A \u0642\u064A\u0627\u0633 \u063A\u0628\u0627\u0631/\u0647\u0628\u0627\u0621 \u0641\u0642\u0637 \u0648\u0644\u0627 \u064A\u062A\u0636\u0645\u0646 \u0646\u062A\u064A\u062C\u0629 \u0627\u062D\u062A\u0631\u0627\u0642 \u0631\u0642\u0645\u064A\u0629.",
    "PSI-68": "\u0647\u0630\u0627 \u062C\u062F\u0648\u0644 \u0646\u0637\u0627\u0642\u0627\u062A \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0644\u064A\u0633 \u0642\u064A\u0627\u0633\u0627\u062A \u0641\u0631\u062F\u064A\u0629\u061B \u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0646\u0635\u0648\u0635 \u0648\u0627\u0644\u0646\u0637\u0627\u0642\u0627\u062A \u0643\u0645\u0627 \u0647\u064A \u0648\u0644\u0627 \u062A\u062D\u0633\u0628 \u0645\u0646\u0647\u0627 \u0625\u062D\u0635\u0627\u0621\u0627\u062A.",
    "PSI-69": "\u0627\u0633\u062A\u062E\u062F\u0645 \u0645\u0646\u0636\u062F\u0629 FLEX \u0644\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u0647\u0630\u0627 \u0627\u0644\u062B\u0627\u0628\u062A \u062E\u0627\u0635 \u0628\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0633\u0627\u0626\u0644\u0629 \u0648\u0641\u0642 \u0642\u0627\u0646\u0648\u0646 d\xB2 \u0648\u0644\u064A\u0633 \u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u062D\u0631\u064A\u0642 \u0645\u0627\u062F\u0629 \u0635\u0644\u0628\u0629.",
    "PSI-98": "\u0623\u064F\u062F\u0631\u062C \u0635\u0641\u0627 \u0627\u0644\u0639\u064A\u0646\u0629 S# \u0641\u0642\u0637\u061B \u0625\u062F\u062E\u0627\u0644\u0627\u062A F# \u0645\u0631\u0627\u062C\u0639 \u062A\u0635\u0648\u064A\u0631 \u0644\u062A\u062F\u0641\u0642 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u0639\u064A\u0646\u062A\u0627\u0646 \u0644\u0627 \u062A\u0643\u0641\u064A\u0627\u0646 \u0644\u0625\u062B\u0628\u0627\u062A \u0623\u062B\u0631 \u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062C\u0631\u064A\u0627\u0646.",
    "PSI-99": "\u062A\u062A\u0636\u0645\u0646 \u0635\u0641\u0648\u0641 \u0627\u0644\u0639\u064A\u0646\u0627\u062A \u062A\u0633\u0645\u064A\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0648\u0623\u0637\u0648\u0627\u0644\u064B\u0627 \u0645\u062E\u062A\u0644\u0637\u0629. \u062D\u0642\u0644 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0645\u0643\u062A\u0648\u0628 \u201C?-g\u201D\u061B \u0644\u0630\u0644\u0643 \u0644\u0645 \u0646\u0635\u0646\u0641\u0647 \u0639\u0644\u0649 \u0623\u0646\u0647 \u062C\u0627\u0630\u0628\u064A\u0629 \u0635\u063A\u0631\u0649 \u0648\u0644\u0645 \u0646\u062F\u0645\u062C \u0642\u064A\u0645\u0647.",
    "PSI-100": "\u064A\u0635\u0641 \u0627\u0644\u0635\u0641\u0627\u0646 \u0634\u0631\u0648\u0637 \u0639\u064A\u0646\u062A\u064A SIBAL \u0648\u0645\u0639\u0631\u0641\u0627\u062A \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627\u060C \u0648\u0645\u0646\u0647\u0627 \u062C\u0631\u064A\u0627\u0646 30 cm/s \u0628\u0627\u062A\u062C\u0627\u0647\u064A\u0646. \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0627\u0644\u062C\u062F\u0648\u0644 \u0646\u062A\u064A\u062C\u0629 \u0645\u0642\u0627\u0633\u0629 \u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628.",
    "PSI-101": "\u0647\u0630\u0647 \u062D\u0642\u0648\u0644 \u0646\u0642\u0644 \u0648\u0642\u064A\u0627\u0633 \u0644\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621\u060C \u0648\u0644\u064A\u0633\u062A \u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628. \u062A\u062A\u0643\u0631\u0631 \u0645\u0639\u0631\u0641\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u062A\u062E\u062A\u0644\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0627\u0642\u0635\u0629\u060C \u0641\u0644\u0627 \u062A\u0639\u0627\u0645\u0644 \u0627\u0644\u0635\u0641\u0648\u0641 \u0643\u062D\u0631\u0627\u0626\u0642 \u0645\u0633\u062A\u0642\u0644\u0629.",
    "PSI-102": "\u0623\u064F\u0628\u0642\u064A\u062A \u0642\u064A\u0627\u0633\u0627\u062A \u0641\u0642\u062F\u0627\u0646 \u0643\u062A\u0644\u0629 Teflon \u0627\u0644\u0623\u0631\u0628\u0639\u0629 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A. \u062A\u062E\u062A\u0644\u0641 \u0633\u0631\u0639\u0629 \u0627\u0644\u0647\u0648\u0627\u0621 \u0648\u0645\u062F\u0629 \u0627\u0644\u062A\u0639\u062A\u064A\u0642\u061B \u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0648\u0635\u0641\u064A \u0648\u0644\u064A\u0633 \u0645\u0639\u062F\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628.",
    "PSI-107": "\u0633\u062C\u0644 SPICE \u0630\u0648 469 \u0635\u0641\u064B\u0627 \u064A\u0643\u0631\u0631 \u0623\u0648\u0642\u0627\u062A \u0627\u0644\u062D\u062F\u062B \u0639\u0628\u0631 \u0638\u0631\u0648\u0641 \u0627\u0644\u062A\u0634\u063A\u064A\u0644. \u062A\u0644\u062E\u0635 \u0627\u0644\u0642\u064A\u0645 \u0645\u062F\u062E\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0644\u0627 \u062A\u0645\u062B\u0644 \u062D\u0631\u0627\u0626\u0642 \u0645\u0633\u062A\u0642\u0644\u0629 \u0623\u0648 \u0639\u0644\u0627\u0642\u0629 \u0633\u0628\u0628\u064A\u0629\u061B \u0648\u0641\u064F\u062D\u0635 \u062A\u0631\u062A\u064A\u0628 \u0623\u0648\u0642\u0627\u062A \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u0627\u0644\u0627\u0646\u0637\u0641\u0627\u0621 \u0645\u0646\u0641\u0635\u0644\u064B\u0627."
  };
  function triageFactorLabels(item, ar) {
    const { relevanceScore, environmentScore, dataAvailabilityScore } = item.triage;
    if (!ar) return item.triage.scoreFactors;
    const relevance = relevanceScore === 3 ? "\u0645\u0637\u0627\u0628\u0642\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u0645\u0648\u0636\u0648\u0639 \u0633\u0644\u0627\u0645\u0629 \u062D\u0631\u064A\u0642 \u0627\u0644\u0637\u0627\u0642\u0645 (3/3)" : relevanceScore === 2 ? "\u0635\u0644\u0629 \u0639\u0627\u0645\u0629 \u0628\u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0623\u0648 \u0627\u0644\u0644\u0647\u0628 (2/3)" : "\u062A\u062D\u0642\u064A\u0642 \u0636\u0645\u0646 \u0641\u0647\u0631\u0633 \u0639\u0644\u0648\u0645 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0631\u0633\u0645\u064A (1/3)";
    const environment = environmentScore ? "\u0633\u064A\u0627\u0642 \u0641\u0636\u0627\u0626\u064A \u0623\u0648 \u062C\u0627\u0630\u0628\u064A\u0629 \u0645\u0646\u062E\u0641\u0636\u0629 \u0645\u0630\u0643\u0648\u0631 \u0641\u064A \u0628\u064A\u0627\u0646\u0627\u062A PSI (2/2)" : "\u0644\u0645 \u064A\u064F\u062D\u062F\u0651\u062F \u0633\u064A\u0627\u0642 \u0637\u064A\u0631\u0627\u0646 \u0623\u0648 \u062C\u0627\u0630\u0628\u064A\u0629 \u0645\u0646\u062E\u0641\u0636\u0629 \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0635\u0641\u064A\u0629 (0/2)";
    const availability = dataAvailabilityScore ? "\u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A \u0627\u0644\u0623\u0635\u0644\u064A \u0645\u0631\u0641\u0642 \u0648\u0645\u062A\u062D\u0642\u0642 \u0645\u0646 \u0628\u0635\u0645\u062A\u0647\u061B \u064A\u0643\u0633\u0631 \u0627\u0644\u062A\u0639\u0627\u062F\u0644 \u0641\u0642\u0637" : "\u0644\u0627 \u064A\u0648\u062C\u062F \u062C\u062F\u0648\u0644 \u062A\u062C\u0631\u064A\u0628\u064A \u0623\u0635\u0644\u064A \u0645\u0631\u0641\u0642 \u0645\u062D\u0644\u064A\u0627\u064B\u061B \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637 \u0648\u064A\u0643\u0633\u0631 \u0627\u0644\u062A\u0639\u0627\u062F\u0644";
    return [relevance, environment, availability];
  }
  function genericTable(rows, headers) {
    const shown = headers.slice(0, 8);
    return `<div class="table-wrap"><table><thead><tr>${shown.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${shown.map((h) => {
      var _a;
      return `<td>${esc((_a = row[h]) != null ? _a : "\u2014")}</td>`;
    }).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  async function renderChallengeLibrary(lang2 = "en") {
    const data = await get("/api/challenge/catalog");
    const ar = lang2 === "ar";
    const cards = data.investigations.map((item) => `<article class="card evidence-card">
    <div class="card-head"><div><span class="eyebrow">${esc(item.id)} \xB7 NASA PSI</span><h3>${esc(item.title)}</h3><p class="sub">${esc(ar ? studyNotesArabic[item.id] || "" : studyNotes[item.id] || "")}</p></div><span class="tag ${item.sourceIntegrity === "VERIFIED" ? "obs" : "warn"}">${esc(item.sourceIntegrity)}</span></div>
    <div class="list-row"><span>${ar ? "\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062C\u062F\u0648\u0644" : "Source table rows"}</span><b>${item.rowCount}</b></div>
    <div class="list-row"><span>${ar ? "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A" : "Source row classes"}</span><b>${Object.entries(item.rowClassification.counts).map(([key, value]) => `${esc(key)}: ${value}`).join(" \xB7 ")}</b></div>
    <div class="list-row"><span>${ar ? "\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0645\u0635\u062F\u0631" : "Source fields"}</span><b>${item.headers.length}</b></div>
    <div class="list-row"><span>DOI</span>${item.doi ? `<a class="mono" href="https://doi.org/${encodeURIComponent(item.doi)}" target="_blank" rel="noreferrer">${esc(item.doi)} \u2197</a>` : `<span class="sub">${ar ? "\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u0641\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u0647\u0631\u0633\u061B \u0631\u0627\u062C\u0639 \u0633\u062C\u0644 PSI" : "Not provided in inventory metadata; see PSI record"}</span>`}</div>
    <div class="list-row"><span>${ar ? "\u0627\u0644\u062A\u0631\u062E\u064A\u0635" : "License"}</span><b>${esc(item.license)}</b></div>
    <details class="field-details"><summary>${ar ? "\u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0627\u0644\u0646\u0642\u0635" : "Fields and missingness"}</summary><div class="field-list">${item.fields.map((f) => `<div class="list-row"><span>${esc(f.name)}</span><b>${f.nonEmpty}/${item.rowCount} \xB7 ${f.missing} missing</b></div>`).join("")}</div></details>
    <div class="hero-actions"><a class="outline-btn" href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">${ar ? "\u0633\u062C\u0644 NASA PSI" : "NASA PSI record"} \u2197</a><button class="outline-btn" data-investigation="${esc(item.id)}">${ar ? "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0635\u0641\u0648\u0641" : "Inspect source rows"}</button></div>
    <div id="source-table-${esc(item.id)}"></div>
  </article>`).join("");
    const rankedInventory = [...data.officialInventory.records].sort((a, b) => b.triage.missionRelevanceScore - a.triage.missionRelevanceScore || b.triage.dataAvailabilityScore - a.triage.dataAvailabilityScore || a.id.localeCompare(b.id, void 0, { numeric: true }));
    const inventory = rankedInventory.map((item, index) => {
      var _a, _b;
      const fileStatus = item.rawTableBundled ? ar ? "\u0627\u0644\u062C\u062F\u0648\u0644 \u0645\u0631\u0641\u0642" : "TABLE BUNDLED" : ((_a = item.psiFileManifest) == null ? void 0 : _a.retrieved) ? ar ? "\u0627\u0644\u0641\u0647\u0631\u0633 \u0645\u062A\u0627\u062D \xB7 \u0644\u0627 \u062C\u062F\u0648\u0644 \u0645\u062D\u0644\u064A" : "FILE INDEXED \xB7 NO LOCAL TABLE" : ar ? "\u0627\u0644\u0641\u0647\u0631\u0633 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D" : "FILE INDEX UNAVAILABLE";
      const fileDetails = ((_b = item.psiFileManifest) == null ? void 0 : _b.retrieved) ? `${item.psiFileManifest.listedFileCount} ${ar ? "\u0645\u0644\u0641\u0627\u064B \u0641\u064A \u0627\u0644\u0641\u0647\u0631\u0633" : "files listed"} \xB7 ${item.psiFileManifest.experimentalTableCount} ${ar ? "\u062C\u062F\u0627\u0648\u0644 \u062A\u062C\u0631\u064A\u0628\u064A\u0629" : "experimental tables"}` : ar ? "\u0644\u0645 \u064A\u064F\u0631\u062C\u0639 endpoint \u0645\u0644\u0641\u0651\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644 \u0641\u064A \u0644\u0642\u0637\u0629 \u0627\u0644\u0641\u0647\u0631\u0633" : "The file-list endpoint returned no manifest in this snapshot; this does not prove no files exist.";
      return `<article class="inventory-card"><div class="inventory-row"><span><b>#${index + 1} \xB7 ${esc(item.id)} \xB7 ${esc(item.acronym || item.title)}</b><small>${esc(item.title)} \xB7 ${esc(item.subResearchArea || "Combustion Science")} \xB7 ${esc(item.projectType || "Type not specified")}</small></span><span class="inventory-status ${item.rawTableBundled ? "available" : "metadata"}">${fileStatus}</span><span class="inventory-score">${item.triage.missionRelevanceScore}/5<small>${ar ? "\u0635\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0629" : "mission fit"}</small></span><a href="${esc(item.nasaRecordUrl)}" target="_blank" rel="noreferrer">NASA PSI \u2197</a></div><div class="inventory-factors">${triageFactorLabels(item, ar).map((reason) => `<span>${esc(reason)}</span>`).join(" \xB7 ")}</div><p class="sub">${esc(fileDetails)}</p><details><summary>${ar ? "\u0623\u0647\u062F\u0627\u0641 \u0648\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0631\u0627\u0633\u0629" : "Study objectives and approach"}</summary><p><b>${ar ? "\u0627\u0644\u0623\u0647\u062F\u0627\u0641" : "Objectives"}</b><br>${esc(item.objectives || "Not provided in returned PSI metadata.")}</p><p><b>${ar ? "\u0627\u0644\u0637\u0631\u064A\u0642\u0629" : "Approach"}</b><br>${esc(item.approach || "Not provided in returned PSI metadata.")}</p>${item.hypothesis ? `<p><b>${ar ? "\u0627\u0644\u0641\u0631\u0636\u064A\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629" : "Recorded hypothesis"}</b><br>${esc(item.hypothesis)}</p>` : ""}<p class="sub">${esc(item.keywords || "")}</p></details></article>`;
    }).join("");
    const findings = data.findings.map((item) => `<article class="card"><div class="card-head"><div><span class="eyebrow">${esc(item.investigationId)} \xB7 ${esc(item.evidence)}</span><h3>${esc(item.title)}</h3></div><span class="tag">n=${esc(item.n)}</span></div><b>${esc(item.value)}</b><p class="sub">${esc(item.interpretation)}</p></article>`).join("");
    const bundledCount = data.investigations.length;
    const archive = data.fileArchiveInventory;
    const archiveTB = (archive.reportedBytes / 1e12).toFixed(2);
    const archiveCoverageNote = ar ? "\u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u062A\u062D\u062F\u064A \u064A\u0635\u0641 \u0645\u0633\u062A\u0648\u062F\u0639 PSI \u0627\u0644\u0643\u0627\u0645\u0644 \u0628\u0646\u062D\u0648 12 \u062A\u064A\u0631\u0627\u0628\u0627\u064A\u062A\u061B \u0623\u0645\u0627 \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0641\u064A\u062E\u0635 \u0627\u0644\u0641\u0647\u0627\u0631\u0633 \u0627\u0644\u062A\u064A \u0627\u0633\u062A\u062C\u0627\u0628\u062A \u0647\u0646\u0627 \u0641\u0642\u0637\u060C \u0648\u0644\u064A\u0633 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0627\u0644\u0643\u0627\u0645\u0644." : "The challenge video describes the full PSI repository as roughly 12 TB; this total covers only the file manifests returned in this snapshot, not the full downloaded archive.";
    const archiveCategories = archive.categories.map((item) => `<div class="list-row"><span>${esc(item.category)} \xB7 ${item.fileCount.toLocaleString()} ${ar ? "\u0645\u0644\u0641" : "files"}</span><b>${(item.reportedBytes / 1e9).toFixed(2)} GB</b></div>`).join("");
    return `${pageHead(ar ? "\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062D\u062F\u064A \u0627\u0644\u0644\u0647\u0628 \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649" : "Flame in Freefall \xB7 NASA PSI Evidence", ar ? "\u0641\u0647\u0631\u0633 NASA PSI \u0627\u0644\u0631\u0633\u0645\u064A \u0645\u0639 \u0641\u0631\u0632 \u0634\u0641\u0627\u0641 \u0644\u0645\u062F\u0649 \u0635\u0644\u0629 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0628\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0637\u0627\u0642\u0645." : "Official NASA PSI Combustion Science inventory with transparent mission-relevance ranking and source-checked findings.")}<div class="grid stats">${stat(ar ? "\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0641\u064A \u0627\u0644\u0641\u0647\u0631\u0633" : "PSI INVESTIGATIONS", data.officialInventory.total, "Official NASA PSI \xB7 Combustion Science", "\u25C9")}${stat(ar ? "\u062C\u062F\u0627\u0648\u0644 \u0645\u0631\u0641\u0642\u0629" : "TABLES BUNDLED", bundledCount, "Original table files checksum verified", "\u25A4")}${stat(ar ? "\u0635\u0641\u0648\u0641 \u0627\u0644\u062C\u062F\u0627\u0648\u0644" : "SOURCE ROWS", data.recordCountAcrossFiles, "Separate tables; never pooled", "\u25A4")}${stat(ar ? "\u0645\u0644\u0641\u0627\u062A \u062F\u0627\u0639\u0645\u0629" : "SUPPORTING ASSETS", data.supportingAssets.length, "Selected imagery, telemetry, and documents", "\u2197")}</div>${renderEvidenceCoverage(data.investigations, lang2)}<article class="card" style="margin-top:15px"><h3>${ar ? "\u062D\u062C\u0645 \u0623\u0631\u0634\u064A\u0641 NASA PSI \u062D\u0633\u0628 \u0627\u0644\u0641\u0647\u0627\u0631\u0633" : "NASA PSI archive inventory"}</h3><p class="sub">${ar ? `\u0627\u0633\u062A\u0644\u0645\u0646\u0627 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0644\u0640 ${archive.listedFileCount.toLocaleString()} \u0645\u0644\u0641\u0627\u064B \u0639\u0628\u0631 ${archive.manifestsRetrieved} \u0641\u0647\u0631\u0633 \u062F\u0631\u0627\u0633\u0629\u061B \u0645\u062C\u0645\u0648\u0639 \u0623\u062D\u062C\u0627\u0645 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0646\u0629 ${archiveTB} \u062A\u064A\u0631\u0627\u0628\u0627\u064A\u062A. \u0647\u0630\u0627 \u0648\u0635\u0641 \u0644\u0644\u0623\u0631\u0634\u064A\u0641 \u0648\u0644\u064A\u0633 \u062A\u0646\u0632\u064A\u0644 \u0645\u062D\u062A\u0648\u064A\u0627\u062A\u0647.` : `Metadata lists ${archive.listedFileCount.toLocaleString()} files across ${archive.manifestsRetrieved} retrieved study manifests; the reported file sizes sum to ${archiveTB} TB. This is archive inventory metadata, not a download of those contents.`}</p>${archiveCategories}<p class="sub">${esc(archiveCoverageNote)}</p><div class="callout warn">${ar ? `${archive.manifestsUnavailable} \u0641\u0647\u0627\u0631\u0633 \u0645\u0646 \u0623\u0635\u0644 ${data.officialInventory.total} \u0644\u0645 \u062A\u064F\u0631\u062C\u0639 \u0642\u0627\u0626\u0645\u0629 \u0645\u0644\u0641\u0627\u062A \u0641\u064A \u0644\u0642\u0637\u0629 \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645\u061B \u0644\u0627 \u064A\u0639\u0646\u064A \u0630\u0644\u0643 \u0623\u0646 NASA \u0644\u0627 \u062A\u0645\u0644\u0643 \u0645\u0644\u0641\u0627\u062A \u0644\u062A\u0644\u0643 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A. \u0644\u0645 \u0646\u0646\u0632\u0651\u0644 \u0645\u062C\u0645\u0648\u0639\u0629 Raw Data \u0627\u0644\u0636\u062E\u0645\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.` : `${archive.manifestsUnavailable} of ${data.officialInventory.total} study manifests returned no file listing in this snapshot; this does not mean NASA has no files for those investigations. The multi-terabyte Raw Data collection was not downloaded automatically.`}</div></article><div class="callout warn">${ar ? `\u0623\u064F\u0631\u0641\u0642 ${bundledCount} \u062C\u062F\u0648\u0644\u0627\u064B \u062A\u062C\u0631\u064A\u0628\u064A\u0627\u064B \u0623\u0635\u0644\u064A\u0627\u064B \u0645\u0639 \u0628\u0635\u0645\u0627\u062A \u062A\u062D\u0642\u0642. \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649 \u062A\u0628\u0642\u0649 \u0628\u064A\u0627\u0646\u0627\u062A\u0647\u0627 \u0627\u0644\u0648\u0635\u0641\u064A\u0629 \u0648\u0631\u0648\u0627\u0628\u0637\u0647\u0627 \u0638\u0627\u0647\u0631\u0629\u061B \u0648\u062D\u0627\u0644\u0629 \u0641\u0647\u0631\u0633 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0645\u0648\u0636\u062D\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629.` : `${bundledCount} original experimental tables are bundled and checksum-verified. Other investigations remain visible with metadata and source links; their file-index retrieval status is shown below.`}</div><div class="callout">${ar ? "\u062F\u0631\u062C\u0629 \u0635\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 = \u0645\u0637\u0627\u0628\u0642\u0629 \u0645\u0648\u0636\u0648\u0639 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 (1\u20133) + \u0633\u064A\u0627\u0642 \u0637\u064A\u0631\u0627\u0646/\u062C\u0627\u0630\u0628\u064A\u0629 \u0635\u063A\u0631\u0649 (0 \u0623\u0648 2). \u062A\u0648\u0641\u0631 \u0627\u0644\u062C\u062F\u0648\u0644 \u0638\u0627\u0647\u0631 \u0645\u0646\u0641\u0635\u0644\u0627\u064B \u0648\u064A\u0643\u0633\u0631 \u0627\u0644\u062A\u0639\u0627\u062F\u0644 \u0641\u0642\u0637\u061B \u0627\u0644\u062F\u0631\u062C\u0629 \u0644\u064A\u0633\u062A \u062E\u0637\u0648\u0631\u0629 \u0623\u0648 \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0634\u062A\u0639\u0627\u0644." : "Mission relevance = crew-fire-safety topic match (1\u20133) + flight/reduced-gravity context (0 or 2). Table availability is shown separately and only breaks ties; the score is not hazard or flammability."}</div><details class="card" style="margin:15px 0"><summary><b>${ar ? "\u062A\u0631\u062A\u064A\u0628 \u062A\u062D\u0642\u064A\u0642\u0627\u062A NASA PSI \u062D\u0633\u0628 \u0635\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 \u0648\u0623\u0647\u062F\u0627\u0641\u0647\u0627" : "NASA PSI studies ranked by mission relevance with objectives"}</b> \xB7 ${data.officialInventory.total}</summary><div class="inventory-list">${inventory}</div><p class="sub">${ar ? "\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0648\u0627\u0644\u0645\u0646\u0647\u062C \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A NASA PSI \u0627\u0644\u0648\u0635\u0641\u064A\u0629\u061B \u0644\u0627 \u062A\u064F\u0639\u0631\u0636 \u0639\u0644\u0649 \u0623\u0646\u0647\u0627 \u0646\u062A\u0627\u0626\u062C \u0645\u0642\u0627\u0633\u0629." : "Objectives and approaches are NASA PSI metadata, not measured findings. Ground/model and flight investigations are identified separately."}</p></details><h2>${ar ? "\u0646\u062A\u0627\u0626\u062C \u0645\u062F\u0639\u0648\u0645\u0629 \u0628\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642\u0629" : "Findings supported by bundled source tables"}</h2><div class="grid two">${findings}</div><div class="callout warn" style="margin-top:15px">${ar ? "\u0644\u0627 \u062A\u062C\u0645\u0639 \u0627\u0644\u0635\u0641\u0648\u0641 \u0628\u064A\u0646 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A\u061B \u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0635\u0641\u0648\u0641 \u0641\u0647\u0631\u0633 \u0645\u0644\u0641\u0627\u062A \u0641\u0642\u0637 \u0648\u0644\u064A\u0633 \u0639\u064A\u0646\u0629 \u0639\u0644\u0645\u064A\u0629 \u0645\u0648\u062D\u062F\u0629." : "Do not pool rows across studies. The summed row count is a file inventory, not one scientific sample."}</div><h2>${ar ? "\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629" : "Bundled original experimental tables"}</h2><div class="grid two evidence-grid">${cards}</div><article class="card" style="margin-top:15px"><h3>${ar ? "\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A" : "Supporting measurements and documents"}</h3>${data.supportingAssets.map((a) => `<div class="list-row"><span>${esc(a.investigationId)} \xB7 ${esc(a.filename)}${a.rowCount ? ` \xB7 ${a.rowCount} rows \xD7 ${a.headers.length} fields` : ""}</span><a href="${esc(a.sourceUrl)}" target="_blank" rel="noreferrer">NASA PSI \xB7 ${esc(a.category)} \xB7 ${esc(a.sourceIntegrity)} \u2197</a></div>`).join("")}</article>`;
  }
  function bindChallengeLibrary(root, lang2 = "en") {
    const grid = root.querySelector(".evidence-grid");
    if (grid && !root.querySelector(".dataset-explorer-controls")) {
      const ar = lang2 === "ar";
      const controls = document.createElement("div");
      controls.className = "toolbar dataset-explorer-controls";
      controls.innerHTML = `<label class="field-label">${ar ? "\u0627\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0648\u0627\u0644\u062D\u0642\u0648\u0644" : "Search investigations and source fields"}<input class="field" type="search" data-dataset-search placeholder="${ar ? "\u0645\u062B\u0644: FLEX\u060C burn time\u060C airflow\u2026" : "Try: FLEX, burn time, airflow\u2026"}"></label><label class="field-label">${ar ? "\u0627\u0644\u0645\u062C\u0627\u0644" : "Evidence domain"}<select class="field" data-dataset-domain><option value="all">${ar ? "\u0643\u0644 \u0627\u0644\u0645\u062C\u0627\u0644\u0627\u062A" : "All domains"}</option><option value="flame">${ar ? "\u0644\u0647\u0628 \u0648\u0642\u0637\u0631\u0627\u062A" : "Flame & droplets"}</option><option value="materials">${ar ? "\u0645\u0648\u0627\u062F \u0648\u062D\u0631\u0627\u0626\u0642" : "Materials & fires"}</option><option value="smoke">${ar ? "\u062F\u062E\u0627\u0646 \u0648\u0647\u0628\u0627\u0621" : "Smoke & aerosols"}</option><option value="conditions">${ar ? "\u0634\u0631\u0648\u0637 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629" : "Conditions & metadata"}</option></select></label><span class="sub" data-dataset-count role="status" aria-live="polite"></span>`;
      grid.before(controls);
      const cards = [...grid.querySelectorAll(".evidence-card")];
      const search = controls.querySelector("[data-dataset-search]");
      const domain = controls.querySelector("[data-dataset-domain]");
      const count = controls.querySelector("[data-dataset-count]");
      const classify = (card) => {
        var _a;
        const id = ((_a = card.querySelector(".eyebrow")) == null ? void 0 : _a.textContent) || "";
        if (/PSI-(20|21|22|23|39|68|69|107)/.test(id)) return "flame";
        if (/PSI-(25|26|98|99|100|102)/.test(id)) return "materials";
        if (/PSI-(47|101)/.test(id)) return "smoke";
        return "conditions";
      };
      const filter = () => {
        const query = search.value.trim().toLocaleLowerCase();
        const selectedDomain = domain.value;
        let visible = 0;
        cards.forEach((card) => {
          const match = (!query || card.textContent.toLocaleLowerCase().includes(query)) && (selectedDomain === "all" || classify(card) === selectedDomain);
          card.hidden = !match;
          if (match) visible++;
        });
        count.textContent = `${visible} / ${cards.length} ${ar ? "\u062A\u062D\u0642\u064A\u0642 \u0638\u0627\u0647\u0631" : "investigations shown"}`;
      };
      search.addEventListener("input", filter);
      domain.addEventListener("change", filter);
      filter();
    }
    root.querySelectorAll("[data-investigation]").forEach((button) => {
      button.onclick = async () => {
        const id = button.dataset.investigation;
        const target = [...root.querySelectorAll('[id^="source-table-"]')].find((element) => element.id === `source-table-${id}`);
        if (target.dataset.loaded === "true") {
          target.hidden = !target.hidden;
          return;
        }
        button.disabled = true;
        button.textContent = lang2 === "ar" ? "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0635\u062F\u0631\u2026" : "Loading source\u2026";
        try {
          const data = await get(`/api/challenge/table?id=${encodeURIComponent(id)}`);
          target.innerHTML = `<div class="source-table-result"><p class="sub">${esc(data.rows.length)} rows \xB7 ${esc(data.headers.length)} source fields \xB7 SHA-256 <code>${esc(data.sourceSha256)}</code></p>${genericTable(data.rows.slice(0, 24), data.headers)}<p class="sub">Showing first ${Math.min(24, data.rows.length)} rows and first ${Math.min(8, data.headers.length)} fields. ${esc(data.note)}</p></div>`;
          target.dataset.loaded = "true";
        } catch (error) {
          target.innerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
        } finally {
          button.disabled = false;
          button.textContent = lang2 === "ar" ? "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0635\u0641\u0648\u0641" : "Inspect source rows";
        }
      };
    });
  }
  function studyAnalysisMarkup(item, ar) {
    const analysis2 = item.studyAnalysis;
    const title = ar ? studyNotesArabic[item.id] || item.title : item.title;
    if (!analysis2) return `<div class="callout warn">${ar ? "\u0644\u0627 \u064A\u062A\u0648\u0641\u0631 \u062A\u0639\u0631\u064A\u0641 \u062A\u062D\u0644\u064A\u0644 \u0644\u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629." : "No study-specific analysis definition is available."}</div>`;
    const dedicated = analysis2.status === "dedicated-workbench";
    const metrics = analysis2.metrics.map((metric) => {
      var _a;
      const enoughForMean = metric.n >= 5 && Number.isFinite(metric.mean);
      return `<article class="card metric"><div class="label">${esc(metric.field)}</div><strong>${metric.min === null ? "\u2014" : `${metric.min}\u2013${metric.max}`}</strong><small>${esc(metric.unit)} \xB7 n=${metric.n} \xB7 ${ar ? "\u0648\u0633\u064A\u0637" : "median"} ${(_a = metric.median) != null ? _a : "\u2014"}</small>${enoughForMean ? `<p class="sub">${ar ? "\u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0648\u0635\u0641\u064A" : "Descriptive mean"} ${metric.mean.toFixed(3)}</p>` : ""}<p class="sub">${ar ? "\u0645\u0641\u0642\u0648\u062F/\u063A\u064A\u0631 \u0631\u0642\u0645\u064A" : "Missing/non-numeric"}: ${metric.missingOrNonNumeric}</p></article>`;
    }).join("");
    const conditions = (analysis2.conditions || []).map((condition) => {
      const values = condition.values.map((entry) => `<code>${esc(entry.value)}</code> <small>\xD7 ${entry.count}</small>`).join(" \xB7 ");
      const omitted = condition.omittedValueCount ? ` \xB7 ${ar ? `\u0648\u0642\u064A\u0645 \u0623\u062E\u0631\u0649 ${condition.omittedValueCount}` : `${condition.omittedValueCount} more distinct values`}` : "";
      return `<div class="list-row"><span><b>${esc(condition.field)}</b><br><small>${ar ? `\u0642\u064A\u0645 \u0645\u0645\u064A\u0632\u0629 ${condition.distinctValueCount} \xB7 \u0645\u0641\u0642\u0648\u062F ${condition.missing}` : `${condition.distinctValueCount} distinct values \xB7 ${condition.missing} missing`}</small></span><span>${values || "\u2014"}${omitted}</span></div>`;
    }).join("");
    const note = ar ? analysisNotesArabic[item.id] || "\u0647\u0630\u0627 \u062A\u0644\u062E\u064A\u0635 \u0648\u0635\u0641\u064A \u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0645\u0635\u062F\u0631 \u0641\u0642\u0637\u061B \u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0633\u0628\u0628\u064A\u0629 \u0648\u0644\u0627 \u064A\u062F\u0645\u062C \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A." : analysis2.note;
    const limitations = ar ? "\u0644\u0627 \u062A\u0639\u0648\u064A\u0636 \u0644\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629\u060C \u0648\u0644\u0627 \u062F\u0645\u062C \u0628\u064A\u0646 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A\u060C \u0648\u0644\u0627 \u0641\u0648\u0627\u0635\u0644 \u062B\u0642\u0629 \u0623\u0648 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0641\u0631\u0636\u064A\u0627\u062A. \u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u0646 \u0627\u0644\u0645\u0635\u062F\u0631." : analysis2.methods;
    const special = dedicated ? `<button class="outline-btn" data-go="Analysis Workbench">${ar ? "\u0627\u0641\u062A\u062D \u062A\u062D\u0644\u064A\u0644 FLEX \u0627\u0644\u0645\u0641\u0635\u0644 \u2190" : "Open detailed FLEX analysis \u2192"}</button>` : "";
    const statusTag = dedicated ? ar ? "\u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0635\u0644 \u0645\u062A\u0627\u062D" : "DETAILED ANALYSIS AVAILABLE" : analysis2.metrics.length ? ar ? "\u062A\u0644\u062E\u064A\u0635 \u0648\u0635\u0641\u064A" : "DESCRIPTIVE" : ar ? "\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629/\u0634\u0631\u0648\u0637" : "NO SAFE OUTCOME SUMMARY";
    const noMetric = dedicated ? `<div class="callout">${ar ? "\u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u0636\u062F\u0629 \u062A\u062D\u0644\u064A\u0644 \u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u062E\u0627\u0635\u0629\u061B \u0627\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0628\u062F\u0644 \u0645\u0644\u062E\u0635 \u0639\u0627\u0645." : "This investigation has its own detailed analysis workbench; use it instead of a generic summary."}</div>` : analysis2.metrics.length === 0 ? `<div class="callout warn">${ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u064A\u062C\u0629 \u0631\u0642\u0645\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0644\u062E\u064A\u0635 \u0628\u0623\u0645\u0627\u0646 \u0645\u0646 \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642. \u0631\u0627\u062C\u0639 \u0633\u0628\u0628 \u0630\u0644\u0643 \u0623\u062F\u0646\u0627\u0647 \u0648\u0627\u0641\u062A\u062D \u0633\u062C\u0644 NASA PSI." : "No numeric outcome can be summarized safely from this bundled table. See the study-specific reason below and inspect the NASA PSI record."}</div>` : "";
    return `<div class="card-head"><div><span class="eyebrow">${esc(item.id)} \xB7 NASA PSI \xB7 ${analysis2.includedRows}/${analysis2.sourceRows} ${ar ? "\u0635\u0641\u064B\u0627 \u0645\u0634\u0645\u0648\u0644\u064B\u0627" : "rows included"}</span><h3>${esc(title)}</h3></div><span class="tag ${analysis2.metrics.length || dedicated ? "comp" : "warn"}">${statusTag}</span></div>${metrics ? `<div class="grid three">${metrics}</div>` : ""}${conditions ? `<details class="card" style="margin:12px 0"><summary><b>${ar ? "\u0634\u0631\u0648\u0637 \u0627\u0644\u062A\u062C\u0631\u0628\u0629 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A \u0641\u064A NASA PSI" : "NASA PSI experiment conditions (verbatim)"}</b></summary><div class="field-list">${conditions}</div><p class="sub">${ar ? "\u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0623\u0635\u0644\u064A\u0629\u061B \u0644\u0645 \u062A\u064F\u0648\u062D\u0651\u062F \u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0644\u0645 \u062A\u064F\u0641\u0633\u0631 \u0643\u0646\u0648\u0627\u062A\u062C." : "Original source values; units are not harmonized and condition labels are not interpreted as outcomes."}</p></details>` : ""}${noMetric}<p class="sub">${esc(note)}</p><div class="callout">${esc(limitations)}</div><div class="hero-actions"><a class="outline-btn" href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">${ar ? "\u0633\u062C\u0644 NASA PSI" : "NASA PSI record"} \u2197</a>${special}<button class="outline-btn" data-study-rows="${esc(item.id)}">${ar ? "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631" : "Inspect source rows"}</button></div><div id="study-source-rows"></div>`;
  }
  async function renderInvestigationLab(lang2 = "en") {
    const data = await get("/api/challenge/catalog");
    const ar = lang2 === "ar";
    const selected = data.officialInventory.records.find((item) => item.rawTableBundled) || data.officialInventory.records[0];
    const rows = data.officialInventory.records.map((item) => `<option value="${esc(item.id)}" ${item.id === (selected == null ? void 0 : selected.id) ? "selected" : ""}>${esc(item.id)} \xB7 ${esc(ar ? studyNotesArabic[item.id] || item.acronym || item.title : item.acronym || item.title)}${item.rawTableBundled ? "" : ar ? " \xB7 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637" : " \xB7 metadata only"}</option>`).join("");
    const firstTable = data.investigations.find((item) => item.id === (selected == null ? void 0 : selected.id));
    return `${pageHead(ar ? "\u0645\u062E\u062A\u0628\u0631 \u062A\u062D\u0642\u064A\u0642\u0627\u062A NASA PSI" : "NASA PSI Investigation Lab", ar ? "\u062A\u062D\u0644\u064A\u0644 \u0648\u0635\u0641\u064A \u0644\u0643\u0644 \u062C\u062F\u0648\u0644 \u0645\u062A\u0627\u062D\u060C \u0645\u0639 \u0639\u0631\u0636 \u062D\u062F\u0648\u062F \u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0645\u0646\u0639 \u062F\u0645\u062C \u062A\u062C\u0627\u0631\u0628 \u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0641\u0642\u0629." : "Study-specific descriptive summaries for available PSI tables, with explicit measurement limits and no cross-study pooling.")}<article class="card"><div class="toolbar"><label class="field-label" for="studySelect">${ar ? "\u0627\u062E\u062A\u0631 \u062A\u062D\u0642\u064A\u0642\u064B\u0627 \u0645\u0646 \u0641\u0647\u0631\u0633 NASA PSI" : "Select an investigation from the NASA PSI index"}</label><select class="field" id="studySelect">${rows}</select></div><p class="sub">${ar ? "\u0627\u0644\u0641\u0647\u0631\u0633 \u0627\u0644\u0643\u0627\u0645\u0644" : "Full inventory"}: ${data.officialInventory.total} ${ar ? "\u062A\u062D\u0642\u064A\u0642\u064B\u0627" : "investigations"} \xB7 ${data.investigations.length} ${ar ? "\u062C\u062F\u0627\u0648\u0644 \u0623\u0635\u0644\u064A\u0629 \u0645\u0631\u0641\u0642\u0629" : "original tables bundled"}. ${ar ? "\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0644\u064A\u0633 \u062F\u0631\u062C\u0629 \u062E\u0637\u0648\u0631\u0629\u061B \u0643\u0644 \u0625\u062D\u0635\u0627\u0621 \u064A\u0628\u0642\u0649 \u0636\u0645\u0646 \u062F\u0631\u0627\u0633\u062A\u0647." : "Priority is not a hazard score; all summaries stay inside their source study."}</p><div class="callout warn">${ar ? "\u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0645\u0644\u062E\u0635\u0629 \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637\u061B \u0644\u0627 \u062A\u0639\u0646\u064A \u0635\u0641\u0648\u0641\u064B\u0627 \u0645\u0633\u062A\u0642\u0644\u0629 \u0623\u0648 \u0623\u062B\u0631\u064B\u0627 \u0633\u0628\u0628\u064A\u064B\u0627. \u0627\u0641\u062A\u062D \u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u062F\u0644\u0629 \u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0635 \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u0644\u0623\u0647\u062F\u0627\u0641 \u0648\u0627\u0644\u0637\u0631\u0642 \u0645\u0646 NASA PSI." : "Summaries are descriptive only; they do not imply independent rows or causal effects. Open Challenge Evidence for full NASA PSI objectives and approaches."}</div></article><section id="studyAnalysisPanel" style="margin-top:15px">${firstTable ? studyAnalysisMarkup(firstTable, ar) : `<div class="callout warn">${ar ? "\u0644\u0627 \u064A\u0648\u062C\u062F \u062C\u062F\u0648\u0644 \u0645\u062D\u0644\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0644\u0642\u0637\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629." : "No local table is available for this investigation in the current file-index snapshot."}</div>`}</section>`;
  }
  function bindInvestigationLab(root, lang2 = "en") {
    const ar = lang2 === "ar";
    let dataPromise;
    let selectionEpoch = 0;
    const loadData = () => dataPromise || (dataPromise = get("/api/challenge/catalog"));
    const select = root.querySelector("#studySelect");
    const panel = root.querySelector("#studyAnalysisPanel");
    if (!select || !panel) return;
    const renderSelected = async () => {
      const requestEpoch = ++selectionEpoch;
      const data = await loadData();
      const id = select.value;
      if (requestEpoch !== selectionEpoch) return;
      const item = data.investigations.find((study) => study.id === id);
      if (!item) {
        const metadata = data.officialInventory.records.find((study) => study.id === id);
        panel.innerHTML = `<article class="card"><div class="card-head"><h3>${esc((metadata == null ? void 0 : metadata.title) || id)}</h3><span class="tag warn">${ar ? "\u0644\u0627 \u064A\u0648\u062C\u062F \u062C\u062F\u0648\u0644 \u0645\u062D\u0644\u064A" : "NO LOCAL TABLE"}</span></div><p class="sub">${ar ? "\u0644\u0645 \u064A\u064F\u0631\u062C\u0639 \u0641\u0647\u0631\u0633 NASA PSI \u062C\u062F\u0648\u0644\u064B\u0627 \u062A\u062C\u0631\u064A\u0628\u064A\u064B\u0627 \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u0644\u0642\u0637\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u0647\u0630\u0627 \u0644\u0627 \u064A\u062B\u0628\u062A \u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0645\u0644\u0641\u0627\u062A \u0623\u062E\u0631\u0649 \u0644\u062F\u0649 NASA." : "The NASA PSI file-index snapshot returned no experimental table for this investigation. This does not prove NASA has no other files."}</p><a class="outline-btn" href="${esc((metadata == null ? void 0 : metadata.nasaRecordUrl) || "#")}" target="_blank" rel="noreferrer">NASA PSI \u2197</a></article>`;
        return;
      }
      panel.innerHTML = studyAnalysisMarkup(item, ar);
      const chartSlot = document.createElement("div");
      chartSlot.className = "study-source-chart-slot";
      panel.append(chartSlot);
      if (sourceChartsForStudy(id).length) {
        chartSlot.innerHTML = `<div class="empty">${ar ? "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0642\u064A\u0627\u0633\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u062C\u062F\u0648\u0644\u2026" : "Loading this table\u2019s measurements\u2026"}</div>`;
        loadStudyTable(id).then((table) => {
          if (requestEpoch === selectionEpoch && select.value === id) {
            chartSlot.innerHTML = renderSourceStudyCharts(id, table.rows, lang2, item.sourceUrl);
            bindInteractiveCharts(chartSlot);
          }
        }).catch((error) => {
          if (requestEpoch === selectionEpoch) chartSlot.innerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
        });
      } else {
        chartSlot.innerHTML = renderSourceStudyCharts(id, [], lang2, item.sourceUrl);
      }
      const button = panel.querySelector("[data-study-rows]");
      if (button) button.onclick = async () => {
        const target = panel.querySelector("#study-source-rows");
        if (target.dataset.loaded === "true") {
          target.hidden = !target.hidden;
          return;
        }
        button.disabled = true;
        try {
          const table = await get(`/api/challenge/table?id=${encodeURIComponent(id)}`);
          target.innerHTML = `<div class="source-table-result"><p class="sub">${table.rows.length} ${ar ? "\u0635\u0641\u064B\u0627" : "source rows"} \xB7 ${table.headers.length} ${ar ? "\u062D\u0642\u0648\u0644" : "fields"} \xB7 SHA-256 <code>${esc(table.sourceSha256)}</code></p>${genericTable(table.rows.slice(0, 24), table.headers)}<p class="sub">${ar ? "\u0639\u0631\u0636 \u0623\u0648\u0644 24 \u0635\u0641\u064B\u0627 \u0648\u0623\u0648\u0644 8 \u062D\u0642\u0648\u0644 \u0641\u0642\u0637\u061B \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0623\u0635\u0644\u064A \u064A\u0628\u0642\u0649 \u0645\u062D\u0641\u0648\u0638\u064B\u0627 \u0643\u0645\u0627 \u0648\u0631\u062F." : `Showing first ${Math.min(24, table.rows.length)} rows and first ${Math.min(8, table.headers.length)} fields; source bytes remain unchanged.`}</p></div>`;
          target.dataset.loaded = "true";
        } catch (error) {
          target.innerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
        } finally {
          button.disabled = false;
        }
      };
    };
    select.onchange = renderSelected;
    renderSelected();
  }
  function electricFieldNote(ar) {
    return `<article class="card" style="margin-top:15px"><h2>${ar ? "\u0627\u0644\u0644\u0647\u0628 \u062A\u062D\u062A \u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A \xB7 PSI-22" : "Electric-field flame demonstration \xB7 PSI-22"}</h2><p>${ar ? "\u064A\u0639\u0631\u0636 \u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u062A\u062D\u062F\u064A \u062A\u062C\u0631\u0628\u0629 \u0644\u0647\u0628 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A: \u064A\u062D\u0631\u0643 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0623\u064A\u0648\u0646\u0627\u062A \u062F\u0627\u062E\u0644 \u0627\u0644\u0644\u0647\u0628\u060C \u0648\u062A\u0646\u0642\u0644 \u062A\u0635\u0627\u062F\u0645\u0627\u062A\u0647\u0627 \u062C\u0632\u0621\u0627\u064B \u0645\u0646 \u0627\u0644\u0632\u062E\u0645 \u0625\u0644\u0649 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062A\u0639\u0627\u062F\u0644\u060C \u0641\u064A\u0646\u0634\u0623 \u062C\u0631\u064A\u0627\u0646 \u0623\u064A\u0648\u0646\u064A \u064A\u0645\u0643\u0646\u0647 \u062A\u063A\u064A\u064A\u0631 \u0634\u0643\u0644 \u0627\u0644\u0644\u0647\u0628 \u0631\u063A\u0645 \u0636\u0639\u0641 \u0627\u0644\u0637\u0641\u0648." : "The challenge video shows the E-FIELD flame experiment: an electric field moves ions in the flame; collisions transfer momentum to neutral gas and create an ionic wind that can reshape the flame even when buoyancy is weak."}</p><div class="equation"><b>${ar ? "\u0642\u0648\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629 \u062D\u062C\u0645\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u0634\u062D\u0646\u0629" : "Electric body force on charge"}</b><code>f\u2091 = \u03C1\u2091 E</code><p class="sub">${ar ? "\u03C1\u2091 \u0643\u062B\u0627\u0641\u0629 \u0627\u0644\u0634\u062D\u0646\u0629 \u0627\u0644\u062D\u062C\u0645\u064A\u0629 \u0648E \u0634\u062F\u0629 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A. \u0647\u0630\u0647 \u0639\u0644\u0627\u0642\u0629 \u0644\u0644\u0642\u0648\u0629 \u0639\u0644\u0649 \u0627\u0644\u0634\u062D\u0646\u0627\u062A\u061B \u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u0632\u062E\u0645 \u0625\u0644\u0649 \u0627\u0644\u063A\u0627\u0632 \u064A\u0639\u062A\u0645\u062F \u0639\u0644\u0649 \u0627\u0642\u062A\u0631\u0627\u0646 \u0627\u0644\u0623\u064A\u0648\u0646\u0627\u062A \u0628\u0627\u0644\u062C\u0632\u064A\u0626\u0627\u062A \u0627\u0644\u0645\u062A\u0639\u0627\u062F\u0644\u0629." : "\u03C1\u2091 is volumetric charge density and E is electric-field strength. This is the force on charged species; momentum transfer to neutral gas depends on ion\u2013neutral coupling."}</p></div><div class="callout warn">${ar ? "\u0647\u0630\u0627 \u0645\u062B\u0627\u0644 \u0639\u0644\u0649 \u0646\u0642\u0644 \u0642\u0633\u0631\u064A \u0644\u0644\u0632\u062E\u0645\u060C \u0648\u0644\u064A\u0633 \u0645\u062D\u0627\u0643\u0627\u0629 \u0644\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0642\u0645\u0631\u064A\u0629 \u0623\u0648 \u0642\u064A\u0627\u0633\u0627\u064B \u0639\u0646\u062F 1/6 g. \u0644\u0627 \u064A\u0633\u062A\u0646\u062A\u062C \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u062C\u0631\u064A\u0627\u0646\u0627\u064B \u0623\u0648 \u0642\u0648\u0629 \u0645\u0646 \u062C\u062F\u0648\u0644 PSI-22 \u062F\u0648\u0646 \u062D\u0642\u0648\u0644 \u0645\u0639\u0627\u064A\u0631\u0629 \u0645\u0646\u0627\u0633\u0628\u0629." : "This is an example of forced momentum transport, not a simulation of lunar gravity or a measurement at 1/6 g. The project does not infer flow or force from PSI-22 without suitable calibrated fields."} <a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-22" target="_blank" rel="noreferrer">${ar ? "\u0633\u062C\u0644 NASA PSI-22 \u2197" : "NASA PSI-22 record \u2197"}</a></div></article>`;
  }
  function flameScenarioControlsMarkup(lang2 = "en") {
    const ar = lang2 === "ar";
    return `<article class="card flame-scenario-builder" style="margin-top:15px"><div class="card-head"><div><h2>${ar ? "\u0645\u064F\u0646\u0634\u0626 \u0633\u064A\u0646\u0627\u0631\u064A\u0648 \u0627\u0644\u0644\u0647\u0628" : "Flame Scenario Builder"}</h2><p class="sub">${ar ? "\u064A\u064F\u062D\u0633\u0628 \u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u062C\u0632\u0626\u064A. \u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0645\u062C\u0633\u0645 \u0648\u0641\u0642 \u062E\u0631\u064A\u0637\u0629 \u0628\u0635\u0631\u064A\u0629 \u0646\u0648\u0639\u064A\u0629 \u0645\u0639\u0644\u0646\u0629\u060C \u0644\u0627 \u0648\u0641\u0642 \u062D\u0644 \u0643\u064A\u0645\u064A\u0627\u0626\u064A." : "Oxygen partial pressure is calculated. The flame responds through a disclosed visual mapping, not a chemical-kinetics solver."}</p></div><span class="tag inf">${ar ? "\u0633\u064A\u0646\u0627\u0631\u064A\u0648 + \u062A\u0635\u0648\u0631 \u062A\u0648\u0636\u064A\u062D\u064A" : "SCENARIO + ILLUSTRATION"}</span></div><div class="scenario-controls"><label>${ar ? "\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \xB7 % \u062D\u062C\u0645\u064A" : "Oxygen \xB7 vol %"}<input type="range" min="12" max="34" step="0.5" value="21" data-flame-o2><output data-flame-o2-value>21%</output><small class="sub">${ar ? "\u0646\u0637\u0627\u0642 \u0633\u062C\u0644\u0627\u062A PSI-69 \u0627\u0644\u0645\u0631\u0641\u0642\u0629: 12\u201334%." : "Range in bundled PSI-69 rows: 12\u201334%."}</small></label><label>${ar ? "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A \xB7 kPa" : "Total pressure \xB7 kPa"}<input type="range" min="1" max="110" step="0.1" value="101.3" data-flame-pressure><output data-flame-pressure-value>101.3 kPa</output></label><label>${ar ? "\u062D\u0631\u0627\u0631\u0629 \u0627\u0644\u0645\u062D\u064A\u0637 \xB7 \u0633\u064A\u0627\u0642 \u0641\u0642\u0637 \xB0C" : "Ambient temperature \xB7 context only \xB0C"}<input type="range" min="0" max="80" step="1" value="22" data-flame-temp><output data-flame-temp-value>22 \xB0C</output></label><label>${ar ? "\u0627\u0644\u0648\u0642\u0648\u062F \xB7 \u0633\u064A\u0627\u0642 \u0641\u0642\u0637" : "Fuel \xB7 context only"}<select class="field" data-flame-fuel><option>n-Heptane</option><option>Methanol</option><option>PMMA</option><option>${ar ? "\u0645\u062E\u0635\u0635" : "Custom"}</option></select></label></div><div class="scenario-readout" style="margin-top:14px"><span>${ar ? "\u0636\u063A\u0637 O\u2082 \u0627\u0644\u062C\u0632\u0626\u064A \u0627\u0644\u062C\u0627\u0641 \u0627\u0644\u0645\u062D\u0633\u0648\u0628" : "Computed dry-gas O\u2082 partial pressure"}<small class="sub"> pO\u2082 = xO\u2082 \xD7 Ptotal</small></span><strong data-flame-po2>21.27 kPa</strong></div><p class="sub" data-flame-shape-readout aria-live="polite"></p><div class="callout warn" style="margin-top:12px">${ar ? "\u0644\u0627 \u064A\u062D\u0633\u0628 \u0647\u0630\u0627 \u0627\u0644\u0645\u062E\u062A\u0628\u0631 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0623\u0648 \u0627\u062D\u062A\u0645\u0627\u0644 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0645\u0646 O\u2082/\u0627\u0644\u0636\u063A\u0637 \u0648\u062D\u062F\u0647\u0645\u0627. \u064A\u063A\u064A\u0651\u0631 \u0636\u063A\u0637 O\u2082 \u062D\u062C\u0645 \u0627\u0644\u063A\u0644\u0627\u0641 \u0641\u064A \u0627\u0644\u062A\u0635\u0648\u0631\u060C \u0644\u0643\u0646 \u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0628\u0635\u0631\u064A \u0628\u0644\u0627 \u0645\u0639\u0627\u064A\u0631\u0629 \u0648\u0644\u064A\u0633 \u0642\u064A\u0627\u0633\u0627\u064B \u0623\u0648 \u062A\u0646\u0628\u0624\u0627\u064B. \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u062D\u0631\u0627\u0631\u0629 \u0633\u064A\u0627\u0642 \u0641\u0642\u0637." : "This lab does not infer burn rate or extinction from O\u2082/pressure alone. pO\u2082 changes the envelope in the illustration, but the visual mapping is uncalibrated and is neither a measurement nor a prediction. Fuel and temperature are context only."} <a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-69" target="_blank" rel="noreferrer">NASA PSI-69 \u2197</a></div></article>`;
  }
  function bindFlameScenarioControls(root, lang2 = "en") {
    const o2 = root.querySelector("[data-flame-o2]");
    const pressure = root.querySelector("[data-flame-pressure]");
    const temperature = root.querySelector("[data-flame-temp]");
    const room = root.querySelector(".scene3d-room");
    if (!o2 || !pressure || !temperature) return;
    const update = () => {
      const oxygen = Number(o2.value);
      const partialPressure = oxygen / 100 * Number(pressure.value);
      const equivalentOxygen = partialPressure / 101.3 * 100;
      const normalized = Math.max(0, Math.min(1, (equivalentOxygen - 12) / 22));
      root.querySelector("[data-flame-o2-value]").textContent = `${Number(o2.value).toFixed(1)}%`;
      root.querySelector("[data-flame-pressure-value]").textContent = `${Number(pressure.value).toFixed(1)} kPa`;
      root.querySelector("[data-flame-temp-value]").textContent = `${temperature.value} \xB0C`;
      root.querySelector("[data-flame-po2]").textContent = `${partialPressure.toFixed(2)} kPa`;
      if (room) {
        room.dataset.oxygen = equivalentOxygen.toFixed(2);
        room.style.setProperty("--oxygen-scale", (0.72 + normalized * 0.28).toFixed(3));
        room.dispatchEvent(new Event("flame-input"));
      }
      root.querySelector("[data-flame-shape-readout]").textContent = lang2 === "ar" ? `\u0645\u0624\u0634\u0631 \u0627\u0644\u063A\u0644\u0627\u0641 \u0627\u0644\u0628\u0635\u0631\u064A: ${(0.72 + normalized * 0.28).toFixed(2)}\xD7 \xB7 \u0645\u0633\u062A\u0646\u062F \u0625\u0644\u0649 pO\u2082 \u0645\u0642\u0627\u0631\u0646\u0629\u064B \u0628\u0647\u0648\u0627\u0621 101.3 kPa\u061B \u0628\u0644\u0627 \u0648\u062D\u062F\u0629 \u0648\u0644\u064A\u0633 \u0642\u0637\u0631 \u0627\u0644\u0644\u0647\u0628.` : `Illustrative envelope scale: ${(0.72 + normalized * 0.28).toFixed(2)}\xD7 \xB7 mapped from pO\u2082 relative to 101.3 kPa air; dimensionless, not flame diameter.`;
    };
    [o2, pressure, temperature, root.querySelector("[data-flame-fuel]")].forEach((control) => control == null ? void 0 : control.addEventListener("input", update));
    update();
  }
  function renderFlamePhysics(lang2 = "en") {
    const ar = lang2 === "ar";
    const earthLabel = ar ? "\u0627\u0644\u0623\u0631\u0636: \u0627\u0644\u0637\u0641\u0648 \u064A\u0635\u0646\u0639 \u062A\u064A\u0627\u0631\u0627\u064B \u0637\u0628\u064A\u0639\u064A\u0627\u064B" : "Earth: buoyancy drives natural convection";
    const microLabel = ar ? "\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649: \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0648\u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0642\u0633\u0631\u064A\u0629" : "Microgravity: diffusion and forced ventilation";
    const science = ar ? `<h2>\u0645\u0627 \u0627\u0644\u0630\u064A \u064A\u062A\u063A\u064A\u0631 \u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0627\u064B\u061F</h2><p>\u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0623\u0631\u0636\u064A\u0629\u060C \u062A\u0633\u062E\u0651\u0646 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u063A\u0627\u0632 \u0641\u062A\u0642\u0644 \u0643\u062B\u0627\u0641\u062A\u0647\u061B \u0648\u0645\u0639 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u064A\u0638\u0647\u0631 \u062F\u0641\u0639 \u0627\u0644\u0637\u0641\u0648 \u0648\u064A\u0631\u062A\u0641\u0639 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0633\u0627\u062E\u0646\u060C \u0648\u062A\u062F\u062E\u0644 \u063A\u0627\u0632\u0627\u062A \u0623\u0628\u0631\u062F \u0625\u0644\u0649 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644. \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u064A\u0636\u0639\u0641 \u0647\u0630\u0627 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0628\u0634\u062F\u0629\u060C \u0644\u0643\u0646 \u0627\u0644\u062D\u0631\u0643\u0629 \u0644\u0627 \u062A\u062E\u062A\u0641\u064A: \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u062C\u0632\u064A\u0626\u064A \u0648\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0631\u0627\u0648\u062D \u0623\u0648 \u062A\u062F\u0641\u0642 \u0627\u0644\u0648\u0642\u0648\u062F \u062A\u0638\u0644 \u062A\u0646\u0642\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 \u0648\u0627\u0644\u062D\u0631\u0627\u0631\u0629.</p><p>\u0644\u0630\u0644\u0643 \u0642\u062F \u064A\u0635\u0628\u062D \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631\u064A \u0634\u0628\u0647 \u0643\u0631\u0648\u064A \u0641\u064A \u062C\u0648 \u0633\u0627\u0643\u0646\u060C \u0648\u0642\u062F \u064A\u062A\u063A\u064A\u0631 \u0634\u0643\u0644\u0647 \u0648\u0627\u0646\u062A\u0634\u0627\u0631\u0647 \u0639\u0646\u062F \u0648\u062C\u0648\u062F \u062A\u0647\u0648\u064A\u0629. \u0644\u064A\u0633 \u0643\u0644 \u0644\u0647\u0628 \u0641\u064A \u0627\u0644\u0641\u0636\u0627\u0621 \u0643\u0631\u0629\u060C \u0648\u0644\u0627 \u062A\u0639\u0646\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u0627\u0646\u0639\u062F\u0627\u0645 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0648 \u0627\u0646\u0639\u062F\u0627\u0645 \u0643\u0644 \u062D\u0631\u0643\u0629.</p>` : `<h2>What changes physically?</h2><p>On Earth, heating makes gases less dense; gravity then drives buoyant motion. Hot products rise while cooler reactants are drawn toward the reaction zone. In microgravity, buoyancy-driven natural convection is strongly reduced, but motion does not vanish: molecular diffusion, fan-driven ventilation, and fuel flow still transport species and heat.</p><p>A diffusion flame can become nearly spherical in a quiescent environment, while ventilation changes its shape and spread. Not every space flame is a sphere, and microgravity does not remove oxygen or all fluid motion.</p>`;
    return `${pageHead(ar ? "\u0641\u064A\u0632\u064A\u0627\u0621 \u0627\u0644\u0644\u0647\u0628" : "Flame Physics", ar ? "\u0645\u0642\u0627\u0631\u0646\u0629 \u0639\u0644\u0645\u064A\u0629 \u0628\u064A\u0646 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0623\u0631\u0636\u064A\u0629 \u0648\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\u060C \u0645\u0639 \u062A\u0645\u064A\u064A\u0632 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0639\u0646 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0642\u0633\u0631\u064A\u0629." : "A physics-grounded comparison of buoyant natural convection, diffusion, and forced ventilation.")}<article class="card"><div class="flame-compare"><section><h3>${earthLabel}</h3><svg viewBox="0 0 360 230" role="img" aria-label="${ar ? "\u0645\u062E\u0637\u0637 \u0627\u0644\u0644\u0647\u0628 \u0648\u062A\u064A\u0627\u0631 \u0627\u0644\u0637\u0641\u0648 \u0639\u0644\u0649 \u0627\u0644\u0623\u0631\u0636" : "Schematic flame and buoyancy flow on Earth"}"><defs><marker id="arrUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,8 L4,0 L8,8" fill="none" stroke="#4bc8ed" stroke-width="1.5"/></marker><linearGradient id="earthFlame" x1="0" x2="0" y1="1" y2="0"><stop stop-color="#ffd56c"/><stop offset=".62" stop-color="#ff7c52"/><stop offset="1" stop-color="#e94b55"/></linearGradient></defs><path d="M180 200 C142 164 171 134 169 103 C196 127 188 75 204 48 C233 96 246 120 224 160 C214 179 200 194 180 200Z" fill="url(#earthFlame)"/><path d="M180 105 C180 79 180 57 180 28" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><path d="M94 63 C76 110 84 160 128 190" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><path d="M266 63 C284 110 276 160 232 190" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><text x="180" y="222" text-anchor="middle" fill="currentColor">${ar ? "\u0639\u0645\u0648\u062F \u063A\u0627\u0632 \u0633\u0627\u062E\u0646 \u2191 \xB7 \u062F\u062E\u0648\u0644 \u0647\u0648\u0627\u0621 \u0623\u0628\u0631\u062F \u2193" : "hot plume \u2191 \xB7 cool air in \u2193"}</text></svg><p class="sub">${ar ? "\u0642\u062F \u064A\u0645\u064A\u0644 \u0627\u0644\u0644\u0647\u0628 \u0625\u0644\u0649 \u0627\u0644\u0627\u0633\u062A\u0637\u0627\u0644\u0629 \u0623\u0648 \u0627\u0644\u0648\u0645\u064A\u0636 \u0628\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u062F \u0648\u0627\u0644\u062C\u0631\u064A\u0627\u0646\u061B \u0627\u0644\u0631\u0633\u0645 \u062A\u062E\u0637\u064A\u0637\u064A." : "Elongated / flickering tendencies depend on burner and flow; the diagram is schematic."}</p></section><section><h3>${microLabel}</h3><svg viewBox="0 0 360 230" role="img" aria-label="${ar ? "\u0645\u062E\u0637\u0637 \u0644\u0647\u0628 \u0627\u0646\u062A\u0634\u0627\u0631\u064A \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649" : "Schematic diffusion flame under microgravity"}"><defs><radialGradient id="roundFlame"><stop stop-color="#ffe59b"/><stop offset=".47" stop-color="#ff995e"/><stop offset=".82" stop-color="#b760ff"/><stop offset="1" stop-color="#66cdf2" stop-opacity=".15"/></radialGradient><marker id="arrFlow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="#4bc8ed" stroke-width="1.5"/></marker></defs><circle cx="180" cy="121" r="56" fill="url(#roundFlame)"/><path d="M62 121 H108 M298 121 H252 M180 35 V65 M180 207 V177" stroke="#4bc8ed" stroke-width="2.5" marker-end="url(#arrFlow)"/><text x="180" y="222" text-anchor="middle" fill="currentColor">${ar ? "\u0627\u0646\u062A\u0634\u0627\u0631 + \u062A\u062F\u0641\u0642 \u0647\u0648\u0627\u0621 \u0645\u0641\u0631\u0648\u0636 \u0625\u0646 \u0648\u064F\u062C\u062F" : "oxidizer diffusion \xB7 airflow if present"}</text></svg><p class="sub">${ar ? "\u0642\u062F \u064A\u0635\u0628\u062D \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631\u064A \u0645\u0633\u062A\u062F\u064A\u0631\u0627\u064B \u0639\u0646\u062F \u0636\u0639\u0641 \u0627\u0644\u062C\u0631\u064A\u0627\u0646\u061B \u0648\u062A\u0638\u0644 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0641\u0631\u0648\u0636\u0629 \u0645\u0624\u062B\u0631\u0629 \u0641\u064A \u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 \u0648\u0627\u0644\u062D\u0631\u0627\u0631\u0629." : "A rounded diffusion flame is possible in low-flow microgravity; imposed ventilation still shapes transport."}</p></section></div><div class="callout">${ar ? "\u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \u062A\u062E\u0637\u064A\u0637\u064A\u060C \u0648\u0644\u064A\u0633 \u0635\u0648\u0631\u0629 \u0645\u0646 \u062A\u062C\u0631\u0628\u0629 NASA \u0623\u0648 \u0635\u0648\u0631\u0629 \u0644\u0647\u0628 \u0645\u0642\u0627\u0633\u0629. \u0627\u0644\u062A\u0641\u0633\u064A\u0631 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A:" : "Illustrative schematic, not a NASA experiment photograph or a measured flame image. Physical explanation:"} <a href="https://www.nasa.gov/missions/station/iss-research/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">NASA combustion and fire safety \u2197</a></div></article><div class="grid two" style="margin-top:15px"><article class="card">${science}<div class="equation"><b>${ar ? "\u0634\u062F\u0629 \u0627\u0644\u0637\u0641\u0648 \xB7 \u0639\u062F\u062F \u063A\u0631\u0627\u0634\u0648\u0641" : "Buoyancy strength \xB7 Grashof number"}</b><code>Gr = g \u03B2 \u0394T L\xB3 / \u03BD\xB2</code><p class="sub">${ar ? "\u064A\u0642\u0627\u0631\u0646 \u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0637\u0641\u0648 \u0628\u0627\u0644\u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0627\u0644\u0644\u0632\u062C\u0629. \u0639\u0646\u062F\u0645\u0627 \u062A\u0642\u062A\u0631\u0628 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0641\u0639\u0627\u0644\u0629 g \u0645\u0646 \u0627\u0644\u0635\u0641\u0631 \u064A\u0636\u0639\u0641 \u062F\u0641\u0639 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u061B \u0648\u0644\u0627 \u064A\u0645\u062B\u0651\u0644 Gr \u0646\u0645\u0648\u0630\u062C\u0627\u064B \u0643\u0627\u0645\u0644\u0627\u064B \u0644\u0644\u062D\u0631\u064A\u0642." : "Compares buoyancy to viscous effects. As effective gravity g approaches zero, buoyant natural-convection forcing shrinks; Gr is not a complete fire model."}</p></div><div class="equation"><b>${ar ? "\u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0642\u0633\u0631\u064A \u0645\u0642\u0627\u0628\u0644 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \xB7 \u0639\u062F\u062F \u0628\u064A\u0643\u0644\u064A\u0647" : "Advection versus diffusion \xB7 P\xE9clet number"}</b><code>Pe = U L / D</code><p class="sub">${ar ? "\u064A\u0645\u062B\u0644 U \u0633\u0631\u0639\u0629 \u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0645\u0641\u0631\u0648\u0636\u060C \u0648L \u0645\u0642\u064A\u0627\u0633 \u0637\u0648\u0644\u060C \u0648D \u0645\u0639\u0627\u0645\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629. \u0642\u062F \u062A\u064F\u0628\u0642\u064A \u0627\u0644\u0645\u0631\u0627\u0648\u062D Pe \u063A\u064A\u0631 \u0635\u0641\u0631\u064A \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649." : "U is imposed flow speed, L a length scale, and D a species diffusivity. Fan-driven airflow can keep Pe nonzero in microgravity."}</p></div></article><article class="card"><h2>${ar ? "\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0637\u0627\u0642\u0645" : "Oxygen and crew safety"}</h2><p>${ar ? "\u0632\u064A\u0627\u062F\u0629 \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0648 \u0636\u063A\u0637\u0647 \u0627\u0644\u062C\u0632\u0626\u064A \u0642\u062F \u062A\u0648\u0633\u0651\u0639 \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0645\u0648\u0627\u062F \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u062A\u0633\u0631\u0651\u0639 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642. \u0644\u0643\u0646 \u0636\u063A\u0637 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u0648\u062A\u0631\u0643\u064A\u0628 \u063A\u0627\u0632\u0647\u0627 \u064A\u062D\u062F\u062F\u0647\u0645\u0627 \u062A\u0648\u0627\u0632\u0646 \u0637\u0628\u064A \u0648\u0647\u0646\u062F\u0633\u064A\u060C \u0648\u0644\u064A\u0633 \u0642\u0631\u0627\u0631\u0627\u064B \u0628\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0628\u0644\u0627 \u0642\u064A\u0648\u062F." : "Increasing oxygen fraction or partial pressure can widen material flammability and intensify combustion. Cabin pressure and composition are a medical and engineering trade, not a simple instruction to add oxygen without limits."}</p><div class="equation"><b>${ar ? "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u062C\u0632\u0626\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646" : "Oxygen partial pressure"}</b><code>pO\u2082 = xO\u2082 \xB7 Ptotal</code><p class="sub">${ar ? "\u0644\u0627 \u062A\u0643\u0641\u064A \u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u062D\u062F\u0647\u0627\u061B \u0641\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u0645\u0627\u062F\u0629 \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0647\u0645\u0629 \u0623\u064A\u0636\u0627\u064B." : "The oxygen mole fraction alone is not enough: total pressure and material/test conditions matter."}</p></div><div class="callout warn">${ar ? "\u062A\u0635\u062D\u064A\u062D \u0645\u0647\u0645: \u062A\u0642\u0644\u064A\u0644 \u062E\u0637\u0631 \u062F\u0627\u0621 \u062A\u062E\u0641\u064A\u0641 \u0627\u0644\u0636\u063A\u0637 \u0642\u0628\u0644 \u0627\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A \u064A\u0631\u062A\u0628\u0637 \u0628\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u0648\u0642\u062A\u061B \u0644\u0627 \u064A\u0639\u0646\u064A \u0630\u0644\u0643 \u0623\u0646 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u062A\u064F\u0632\u0627\u062F \u0623\u0643\u0633\u062C\u064A\u0646\u0627\u064B \u062F\u0627\u0626\u0645\u0627\u064B. \u062A\u0648\u062B\u0651\u0642 NASA \u0623\u0646 \u0627\u0644\u0623\u062C\u0648\u0627\u0621 \u0627\u0644\u063A\u0646\u064A\u0629 \u0628\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u062A\u0631\u0641\u0639 \u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0631\u064A\u0642." : "Important correction: reducing decompression-sickness risk before an EVA involves denitrogenation, pressure, and timing protocols; it does not mean the cabin is simply kept oxygen-enriched. NASA documents the fire hazards of oxygen-rich atmospheres."}</div><p class="sub">${ar ? "\u0627\u0644\u0645\u0631\u0627\u062C\u0639: " : "References: "}<a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">NASA-STD-3001 Vol. 2 \u2197</a> \xB7 <a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">NASA Fire Protection technical brief \u2197</a></p></article></div><article class="card" style="margin-top:15px"><h2>${ar ? "\u0645\u0639\u0627\u062F\u0644\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0648\u062D\u062F\u0648\u062F\u0647" : "Research equations and limits"}</h2><div class="grid three"><div class="equation"><b>${ar ? "\u0642\u0627\u0646\u0648\u0646 \u0645\u0631\u0628\u0639 \u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0633\u0627\u0626\u0644\u0629" : "Liquid-droplet d\xB2 law"}</b><code>D\xB2(t) = D\u2080\xB2 \u2212 Kt</code><p class="sub">${ar ? "\u0639\u0644\u0627\u0642\u0629 \u0646\u0645\u0648\u0630\u062C\u064A\u0629 \u0639\u0646\u062F \u062A\u062D\u0642\u0642 \u0627\u0641\u062A\u0631\u0627\u0636\u0627\u062A \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629 \u0634\u0628\u0647 \u0627\u0644\u0645\u0633\u062A\u0642\u0631. \u064A\u0639\u062A\u0645\u062F K \u0639\u0644\u0649 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u061B \u0648\u0644\u0627 \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0644\u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0623\u0648 \u0639\u0646\u062F \u063A\u064A\u0627\u0628 \u062A\u0639\u0631\u064A\u0641 \u0648\u0648\u062D\u062F\u0627\u062A \u0648\u0627\u0636\u062D\u0629." : "A model under stated quasi-steady droplet-burning assumptions. K is condition-dependent; do not apply it to solid-material flame spread or infer K where units/definitions are absent."}</p></div><div class="equation"><b>${ar ? "\u0646\u0633\u0628\u0629 \u062A\u0633\u0627\u0631\u0639 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629" : "Gravitational acceleration ratio"}</b><code>g* = g_eff / g\u2080</code><p class="sub">${ar ? "\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062A\u0633\u0627\u0631\u0639 \u0648\u0639\u062F\u0645 \u0627\u0644\u064A\u0642\u064A\u0646 \u0627\u0644\u0644\u0630\u064A\u0646 \u0623\u0628\u0644\u063A\u062A \u0639\u0646\u0647\u0645\u0627 \u0627\u0644\u062A\u062C\u0631\u0628\u0629. \xAB\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\xBB \u0628\u064A\u0626\u0629 \u062A\u0634\u063A\u064A\u0644\u064A\u0629\u060C \u0648\u0644\u064A\u0633\u062A \u0628\u0627\u0644\u0636\u0631\u0648\u0631\u0629 g = 0 \u0631\u064A\u0627\u0636\u064A\u0627\u064B." : "Use the experiment's reported acceleration and uncertainty. \u201CMicrogravity\u201D is an operational environment, not mathematical g = 0."}</p></div><div class="equation"><b>${ar ? "\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 \u0628\u0627\u0644\u062D\u0631\u064A\u0642" : "Fire-control framing"}</b><code>risk = f(fuel, oxidizer, ignition, flow, geometry)</code><p class="sub">${ar ? "\u0642\u0627\u0626\u0645\u0629 \u0639\u0648\u0627\u0645\u0644 \u062A\u0635\u0648\u0631\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0645\u0639\u0627\u062F\u0644\u0629 \u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u0645\u0639\u0627\u064A\u0631\u0629. \u064A\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0644\u0627 \u064A\u0635\u062F\u0631 \u0623\u0648\u0627\u0645\u0631 \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0644\u0644\u0625\u062E\u0645\u0627\u062F." : "A conceptual factor list, not a calibrated probability equation. The project reports evidence and test conditions; it does not issue operational suppression commands."}</p></div></div></article>${electricFieldNote(ar)}${flameScene3d(lang2)}`;
  }
  function renderMissionAtmospheres(lang2 = "en") {
    const ar = lang2 === "ar";
    const cases = [
      { en: "Earth / ISS reference", ar: "\u0645\u0631\u062C\u0639 \u0627\u0644\u0623\u0631\u0636 / \u0645\u062D\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0621", p: 14.7, o: 21, noteEn: "Nominal sea-level / ISS atmosphere; reference condition.", noteAr: "\u062C\u0648 \u0627\u0633\u0645\u064A \u0639\u0646\u062F \u0645\u0633\u062A\u0648\u0649 \u0633\u0637\u062D \u0627\u0644\u0628\u062D\u0631 / \u0645\u062D\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0621\u061B \u062D\u0627\u0644\u0629 \u0645\u0631\u062C\u0639\u064A\u0629." },
      { en: "Shuttle campout atmosphere", ar: "\u062C\u0648 \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u0644\u0640 EVA \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0643", p: 10.2, o: 26.5, noteEn: "A lower-pressure EVA preparation atmosphere used in shuttle operations.", noteAr: "\u062C\u0648 \u0623\u0642\u0644 \u0636\u063A\u0637\u0627\u064B \u0627\u0633\u062A\u064F\u062E\u062F\u0645 \u0644\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0643\u0648\u0643." },
      { en: "Exploration atmosphere concept", ar: "\u062A\u0635\u0648\u0631 \u062C\u0648 \u0627\u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641", p: 8.2, o: 34, noteEn: "A NASA exploration design concept for habitats / surface vehicles; not a universal or final flight setting.", noteAr: "\u062A\u0635\u0648\u0631 \u062A\u0635\u0645\u064A\u0645\u064A \u0644\u0646\u0627\u0633\u0627 \u0644\u0644\u0645\u0633\u0627\u0643\u0646 \u0623\u0648 \u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062A \u0627\u0644\u0633\u0637\u062D\u064A\u0629\u061B \u0644\u064A\u0633 \u0625\u0639\u062F\u0627\u062F\u0627\u064B \u0645\u0648\u062D\u062F\u0627\u064B \u0623\u0648 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0644\u0643\u0644 \u0631\u062D\u0644\u0629." },
      { en: "US EVA suit reference", ar: "\u0645\u0631\u062C\u0639 \u0628\u062F\u0644\u0629 \u0627\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A\u0629", p: 4.3, o: 100, noteEn: "Low-pressure pure-oxygen suit environment; operational protocols remain mission-specific.", noteAr: "\u0628\u064A\u0626\u0629 \u0628\u062F\u0644\u0629 \u0645\u0646\u062E\u0641\u0636\u0629 \u0627\u0644\u0636\u063A\u0637 \u0648\u0623\u0643\u0633\u062C\u064A\u0646 \u0646\u0642\u064A\u061B \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u062A\u062E\u062A\u0644\u0641 \u062D\u0633\u0628 \u0627\u0644\u0645\u0647\u0645\u0629." }
    ];
    const rows = cases.map((c) => `<tr><td><b>${ar ? c.ar : c.en}</b><br><small>${ar ? c.noteAr : c.noteEn}</small></td><td>${c.p.toFixed(1)} psia</td><td>${c.o}%</td><td>${(c.p * c.o / 100).toFixed(2)} psia</td></tr>`).join("");
    const title = ar ? "\u0623\u062C\u0648\u0627\u0621 \u0627\u0644\u0645\u0647\u0645\u0627\u062A \u0648\u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u0637\u0627\u0642\u0645" : "Mission Atmospheres & EVA Transitions";
    return `${pageHead(title, ar ? "\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0636\u063A\u0637 \u0648\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0636\u063A\u0637\u0647 \u0627\u0644\u062C\u0632\u0626\u064A\u060C \u0648\u0644\u0645\u0627\u0630\u0627 \u062A\u0631\u062A\u0628\u0637 \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062C\u0648 \u0628\u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0631\u064A\u0642." : "Compare total pressure, oxygen fraction, and dry-gas oxygen partial pressure\u2014and why atmosphere choices couple EVA preparation with fire safety.")}<div class="callout warn">${ar ? "\u0647\u0630\u0647 \u0638\u0631\u0648\u0641 \u0645\u0631\u062C\u0639\u064A\u0629 \u0648\u062A\u0635\u0645\u064A\u0645\u064A\u0629 \u0645\u0646 \u0648\u062B\u0627\u0626\u0642 \u0646\u0627\u0633\u0627\u060C \u0648\u0644\u064A\u0633\u062A \u0648\u0635\u0641\u0629 \u062C\u0648 \u0644\u0645\u0631\u0643\u0628\u0629 \u0623\u0648 \u0627\u062F\u0639\u0627\u0621\u064B \u0628\u0623\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0642\u062F \u0627\u0639\u062A\u064F\u0645\u062F \u0644\u0643\u0644 \u0645\u0647\u0645\u0629 \u0642\u0645\u0631\u064A\u0629." : "These are reference and design-study conditions from NASA documents, not a prescribed vehicle atmosphere or a claim that one setting is final for every lunar mission."}</div><article class="card" style="margin-top:15px"><h2>${ar ? "\u0645\u0642\u0627\u0631\u0646\u0629 \u0645\u0631\u062C\u0639\u064A\u0629" : "Reference atmosphere cases"}</h2><div class="table-wrap"><table><thead><tr><th>${ar ? "\u0627\u0644\u062D\u0627\u0644\u0629" : "Case"}</th><th>${ar ? "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A" : "Total pressure"}</th><th>${ar ? "\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u062D\u062C\u0645\u0627\u064B" : "O\u2082 by volume"}</th><th>${ar ? "\u0636\u063A\u0637 O\u2082 \u0627\u0644\u062C\u0632\u0626\u064A \u0627\u0644\u062C\u0627\u0641 \u0627\u0644\u0645\u062D\u0633\u0648\u0628" : "Computed dry-gas pO\u2082"}</th></tr></thead><tbody>${rows}</tbody></table></div><p class="sub">${ar ? "\u0627\u0644\u062D\u0633\u0627\u0628: \u0636\u063A\u0637 O\u2082 \u0627\u0644\u062C\u0632\u0626\u064A = \u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \xD7 \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A. \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0645\u0634\u062A\u0642\u0629 \u062D\u0633\u0627\u0628\u064A\u0627\u064B \u0645\u0646 \u0642\u064A\u0645 \u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629\u060C \u0648\u0644\u064A\u0633\u062A \u0642\u064A\u0627\u0633\u0627\u062A PSI." : "Calculation: oxygen partial pressure = oxygen mole fraction \xD7 total pressure. Values are calculated from the cited pressure/composition inputs; they are not PSI experiment measurements."}</p></article><div class="grid two" style="margin-top:15px"><article class="card"><h2>${ar ? "\u0644\u0645\u0627\u0630\u0627 \u064A\u062A\u063A\u064A\u0631 \u062C\u0648 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u0642\u0628\u0644 EVA\u061F" : "Why change a cabin atmosphere before EVA?"}</h2><p>${ar ? "\u0639\u0646\u062F \u062E\u0641\u0636 \u0627\u0644\u0636\u063A\u0637 \u0644\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0628\u062F\u0644\u0629 \u0627\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u060C \u0642\u062F \u064A\u0633\u0628\u0628 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0627\u0644\u0630\u0627\u0626\u0628 \u0641\u064A \u0627\u0644\u0623\u0646\u0633\u062C\u0629 \u062E\u0637\u0631 \u062F\u0627\u0621 \u062A\u062E\u0641\u064A\u0641 \u0627\u0644\u0636\u063A\u0637. \u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644\u0627\u062A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0642\u0628\u0644 \u0627\u0644\u062E\u0631\u0648\u062C\u060C \u0628\u0645\u0627 \u0641\u064A\u0647\u0627 \u062A\u0646\u0641\u0633 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0648\u0627\u0644\u0636\u063A\u0637\u060C \u062A\u0642\u0644\u0644 \u0627\u0644\u062E\u0637\u0631. \u0644\u0630\u0644\u0643 \u062A\u062F\u0631\u0633 \u0646\u0627\u0633\u0627 \u0623\u062C\u0648\u0627\u0621 \u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0628\u0636\u063A\u0637 \u0643\u0644\u064A \u0623\u0642\u0644 \u0648\u0646\u0633\u0628\u0629 O\u2082 \u0623\u0639\u0644\u0649 \u0644\u062A\u0642\u0644\u064A\u0644 \u0639\u0628\u0621 \u0627\u0644\u062A\u062D\u0636\u064A\u0631\u061B \u0647\u0630\u0647 \u0645\u0648\u0627\u0632\u0646\u0629 \u0637\u0628\u064A\u0629 \u0648\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0648\u0647\u0646\u062F\u0633\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0642\u0627\u0639\u062F\u0629 \u0623\u0646 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u062A\u064F\u063A\u0646\u0649 \u0628\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u062F\u0627\u0626\u0645\u0627\u064B." : "Reducing pressure for an EVA suit transition can create decompression-sickness risk from inert nitrogen dissolved in body tissues. Prebreathe / denitrogenation protocols, transition pressure, and timing manage that risk. NASA studies lower-pressure, higher-O\u2082 exploration atmospheres to reduce EVA preparation burden; this is a medical, operational, and engineering trade\u2014not a rule that cabins are always oxygen-enriched."}</p><p class="sub">${ar ? "\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u062A\u0634\u0645\u0644 \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u062C\u0632\u0626\u064A \u0627\u0644\u0645\u0633\u062A\u0646\u0634\u0642 \u0648\u0628\u062E\u0627\u0631 \u0627\u0644\u0645\u0627\u0621\u061B \u0627\u0644\u062C\u062F\u0648\u0644 \u0623\u0639\u0644\u0627\u0647 \u064A\u0639\u0631\u0636 \u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0641\u064A \u062E\u0644\u064A\u0637 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u062C\u0627\u0641 \u0644\u0644\u062A\u0648\u0636\u064A\u062D \u0641\u0642\u0637." : "Physiological inspired oxygen also depends on water-vapor pressure and the breathing protocol; the table uses dry-gas partial pressure as a clear atmosphere comparison only."}</p></article><article class="card"><h2>${ar ? "\u0644\u0645\u0627\u0630\u0627 \u0647\u0630\u0627 \u0645\u0647\u0645 \u0644\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u061F" : "Why this matters to combustion"}</h2><p>${ar ? "\u0641\u064A \u0627\u0644\u0645\u062B\u0627\u0644 \u0627\u0644\u062A\u0635\u0645\u064A\u0645\u064A 8.2 psia \u064834% O\u2082\u060C \u064A\u0628\u0642\u0649 pO\u2082 \u0627\u0644\u062C\u0627\u0641 \u0642\u0631\u064A\u0628\u0627\u064B \u0645\u0646 \u0645\u0631\u062C\u0639 14.7 psia \u064821% O\u2082\u060C \u0644\u0643\u0646 \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0639\u0644\u0649 \u0628\u0643\u062B\u064A\u0631. \u062A\u0634\u0627\u0628\u0647 pO\u2082 \u0644\u0627 \u064A\u062C\u0639\u0644 \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0645\u062A\u0637\u0627\u0628\u0642\u0629: \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u064A\u062A\u0623\u062B\u0631 \u0628\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A \u0648\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641 \u0648\u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0647\u0646\u062F\u0633\u0629 \u0648\u0627\u0644\u062A\u062F\u0641\u0642 \u0648\u0645\u0635\u062F\u0631 \u0627\u0644\u0625\u0634\u0639\u0627\u0644." : "In the 8.2-psia / 34%-O\u2082 design case, dry-gas pO\u2082 is near the 14.7-psia / 21%-O\u2082 reference, while oxygen fraction is much higher. Similar pO\u2082 does not mean equivalent flammability: combustion also depends on oxygen concentration, total pressure, diluent, fuel, geometry, flow, and ignition."}</p><div class="callout">${ar ? "\u0628\u064A\u0627\u0646\u0627\u062A NASA PSI-20 (ACME BRE) \u062A\u0630\u0643\u0631 21%, 26.5%, 34% \u064840% \u0636\u0645\u0646 \u0645\u0644\u062E\u0635\u0627\u062A \u0623\u064A\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u060C \u0644\u0643\u0646\u0647\u0627 \u0644\u0627 \u062A\u0633\u062C\u0644 \u0627\u0644\u0636\u063A\u0637 \u0644\u0643\u0644 \u0645\u0644\u062E\u0635\u061B \u0644\u0630\u0644\u0643 \u0644\u0627 \u062A\u0635\u0644\u062D \u0648\u062D\u062F\u0647\u0627 \u0644\u0631\u0628\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0628\u0627\u0644\u0636\u063A\u0637 \u0623\u0648 \u0627\u0633\u062A\u0646\u062A\u0627\u062C \u062D\u062F \u0627\u0634\u062A\u0639\u0627\u0644." : "NASA PSI-20 (ACME BRE) day summaries include oxygen-concentration entries such as 21%, 26.5%, 34%, and 40%, but pressure is not resolved for each summary. They cannot alone establish a pressure\u2013oxygen relationship or a flammability limit."}</div></article></div><article class="card" style="margin-top:15px"><h2>${ar ? "\u062F\u0644\u0627\u0644\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u064A\u0642" : "Research implications for fire safety"}</h2><ol><li>${ar ? "\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u062F \u0646\u0641\u0633\u0647\u0627 \u0639\u0646\u062F \u0646\u0637\u0627\u0642\u0627\u062A O\u2082 \u0648\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643\u0644 \u062A\u0635\u0645\u064A\u0645\u060C \u0645\u0639 \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u0627\u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F." : "Test the actual materials across each design\u2019s oxygen and pressure envelope; report ignition, sustained burning, and extinction separately."}</li><li>${ar ? "\u062A\u063A\u064A\u064A\u0631 \u0645\u062A\u063A\u064A\u0631 \u0648\u0627\u062D\u062F \u0623\u0648 \u0628\u0646\u0627\u0621 \u062A\u0635\u0645\u064A\u0645 \u062A\u062C\u0631\u064A\u0628\u064A \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0639\u0648\u0627\u0645\u0644\u060C \u062D\u062A\u0649 \u064A\u0645\u0643\u0646 \u0641\u0635\u0644 \u0623\u062B\u0631 O\u2082 \u0639\u0646 \u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u062A\u0647\u0648\u064A\u0629." : "Use controlled or factorial experiments to separate oxygen-fraction effects from pressure and ventilation effects."}</li><li>${ar ? "\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0648\u0627\u0644\u0643\u0634\u0641 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0645\u0639\u0627\u064B\u061B \u0636\u0639\u0641 \u0627\u0644\u0637\u0641\u0648 \u0644\u0627 \u064A\u0644\u063A\u064A \u0627\u0644\u062A\u062F\u0641\u0642 \u0627\u0644\u0642\u0633\u0631\u064A \u0623\u0648 \u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u062F\u062E\u0627\u0646." : "Evaluate ventilation, detection, and suppression together; weak buoyancy does not remove forced flow or smoke transport."}</li></ol><p class="sub">${ar ? "\u0627\u0644\u062C\u062F\u0648\u0644 \u064A\u0636\u0645 \u0638\u0631\u0648\u0641\u0627\u064B \u062A\u0627\u0631\u064A\u062E\u064A\u0629 \u0623\u0648 \u062A\u0635\u0645\u064A\u0645\u064A\u0629 \u0645\u0646 \u0645\u0635\u0627\u062F\u0631 NASA\u061B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u062A\u0628\u0642\u0649 \u0645\u0644\u0641\u0627\u062A NASA PSI\u060C \u0648\u0644\u0627 \u064A\u064F\u0633\u062A\u0646\u062A\u062C \u0645\u0646\u0647 \u062A\u0631\u062A\u064A\u0628 \u062E\u0637\u0631 \u0645\u0639\u062A\u0645\u062F." : "The table mixes historical and design-study contexts from NASA sources. The project\u2019s primary experimental evidence remains NASA PSI; these scenarios do not establish a certified hazard ranking."}</p><div class="list-row"><span>NASA OCHMO-TB-003 \xB7 Habitable Atmosphere</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div><div class="list-row"><span>NASA 2026 \xB7 Lunar and Planetary Science Conference atmosphere presentation</span><a href="https://ntrs.nasa.gov/citations/20260001966" target="_blank" rel="noreferrer">NASA NTRS \u2197</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 \xB7 Revision F</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div><div class="list-row"><span>Primary experiment context \xB7 NASA PSI-20 / ACME BRE</span><a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-20" target="_blank" rel="noreferrer">NASA PSI \u2197</a></div></article>`;
  }
  function renderSafetyInsights(lang2 = "en") {
    const ar = lang2 === "ar";
    const cards = ar ? [
      ["1 \xB7 \u0625\u062F\u0627\u0631\u0629 \u062C\u0648 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u062F", "\u062A\u062D\u062F\u064A\u062F \u0646\u0637\u0627\u0642 \u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0636\u063A\u0637 \u064A\u0641\u064A \u0628\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u060C \u0645\u0646 \u062F\u0648\u0646 \u0625\u062B\u0631\u0627\u0621 \u063A\u064A\u0631 \u0645\u0628\u0631\u0631\u061B \u062B\u0645 \u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0646\u0641\u0633\u0647\u0627 \u0636\u0645\u0646 \u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0631\u0643\u064A\u0628 \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0642\u0635\u0648\u062F. \u0644\u0627 \u062A\u0643\u0641\u064A \u0634\u0647\u0627\u062F\u0629 \u0627\u0644\u0645\u0627\u062F\u0629 \u0641\u064A \u0647\u0648\u0627\u0621 \u0627\u0644\u0623\u0631\u0636 \u0648\u062D\u062F\u0647.", "NASA-STD-3001 \xB7 \u0645\u0648\u0627\u0632\u0646\u0629 \u0635\u062D\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0627\u0644\u062D\u0631\u064A\u0642\u061B PSI-25 \xB7 BASS-II \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631."],
      ["2 \xB7 \u0627\u0644\u062A\u062D\u0643\u0645 \u0628\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0625\u0634\u0639\u0627\u0644", "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0637\u0627\u0642\u0629 \u0648\u0627\u0644\u062D\u0631\u0627\u0631\u0629\u060C \u0648\u0625\u0632\u0627\u0644\u0629 \u062A\u0631\u0627\u0643\u0645 \u0627\u0644\u0623\u0644\u064A\u0627\u0641 \u0648\u0627\u0644\u063A\u0628\u0627\u0631 \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644\u060C \u0648\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062A\u064A \u0642\u062F \u062A\u0648\u0644\u0651\u062F \u0634\u0631\u0631\u0627\u064B \u0623\u0648 \u0623\u0633\u0637\u062D\u0627\u064B \u0633\u0627\u062E\u0646\u0629.", "NASA Fire Protection \xB7 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u062C\u0632\u0621 \u0645\u0646 \u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u062D\u0645\u0627\u064A\u0629."],
      ["3 \xB7 \u0643\u0634\u0641 \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u063A\u0627\u0632\u0627\u062A", "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0648\u0627\u0634\u0641 \u0648\u0641\u0642 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629. \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u0644\u0627 \u064A\u0635\u0639\u062F \u0627\u0644\u062F\u062E\u0627\u0646 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0625\u0644\u0649 \u0627\u0644\u0633\u0642\u0641\u061B \u062D\u0631\u0643\u0629 \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0642\u0633\u0631\u064A\u0629 \u0645\u0647\u0645\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0645\u0624\u0634\u0631\u0627\u062A \u0645\u0646\u0627\u0633\u0628\u0629 \u0645\u062B\u0644 \u0627\u0644\u062C\u0633\u064A\u0645\u0627\u062A \u0648CO \u0648\u0641\u0642 \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0646\u0638\u0627\u0645.", "PSI-98 / 99 / 100 \u0648PSI-101 / 102 \xB7 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0645\u0648\u0636\u0648\u0639 \u0645\u0633\u062A\u0642\u0644 \u0639\u0646 \u0633\u0631\u0639\u0629 \u0627\u0644\u0644\u0647\u0628."],
      ["4 \xB7 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629", "\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0647\u0646\u062F\u0633\u0629 \u0648\u0627\u0644\u0636\u063A\u0637 \u0648xO\u2082 \u0648\u062A\u062F\u0641\u0642 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629\u060C \u062B\u0645 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0637\u0627\u0642\u0645 \u0639\u0644\u0649 \u0627\u0644\u0639\u0632\u0644 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629. \u0644\u0627 \u062A\u0648\u062C\u062F \u0648\u0633\u064A\u0644\u0629 \u0648\u0627\u062D\u062F\u0629 \u064A\u0645\u0643\u0646 \u062A\u0639\u0645\u064A\u0645\u0647\u0627 \u0645\u0646 \u0635\u0641\u064A\u0646 \u0623\u0648 \u062A\u062C\u0631\u0628\u0629 \u0645\u062E\u062A\u0644\u0641\u0629.", "NASA OCHMO-TB-008 \xB7 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u0644\u0643\u0634\u0641 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0645\u0639\u0627\u064B."]
    ] : [
      ["1 \xB7 Manage cabin atmosphere and materials", "Keep oxygen fraction and total pressure within the minimum validated mission and crew-health envelope; do not enrich without a defined need. Then qualify the actual materials across that composition, pressure, and ventilation range. Terrestrial-air qualification alone is not enough.", "NASA-STD-3001 \xB7 crew-health/fire trade; PSI-25 \xB7 BASS-II material-test evidence."],
      ["2 \xB7 Control ignition sources", "Manage electrical and thermal energy, remove lint, dust, and combustible accumulation, and qualify equipment that can create sparks or hot surfaces.", "NASA Fire Protection \xB7 prevention is one layer of an integrated safety strategy."],
      ["3 \xB7 Detect smoke and gases", "Place detectors with cabin ventilation paths in mind. In microgravity smoke does not rise to a ceiling by buoyancy; forced airflow shapes transport. Use validated particle and CO detection suited to the vehicle.", "PSI-98 / 99 / 100 and PSI-101 / 102 address spacecraft fire/smoke evidence, not a universal flame-speed metric."],
      ["4 \xB7 Suppress and respond", "Test suppressant delivery against the actual fuel, geometry, oxygen fraction, pressure, and ventilation. Train isolation and response procedures. Two trials or a different experiment cannot establish a universal best suppressant.", "NASA OCHMO-TB-008 \xB7 prevention, detection, response, and suppression belong together."]
    ];
    const ref = ar ? "\u0645\u0628\u0627\u062F\u0626 \u062A\u0635\u0645\u064A\u0645 \u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0634\u063A\u064A\u0644 \u0623\u0648 \u0648\u0635\u0641\u0627\u062A \u0644\u062C\u0648 \u0627\u0644\u0645\u0631\u0643\u0628\u0629." : "Research design implications only; these are not vehicle operating procedures or cabin-atmosphere prescriptions.";
    return `${pageHead(ar ? "\u0627\u0633\u062A\u0646\u062A\u0627\u062C\u0627\u062A \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u064A\u0642" : "Fire Safety Insights", ar ? "\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0623\u062F\u0644\u0629 \u0625\u0644\u0649 \u0623\u0633\u0626\u0644\u0629 \u062A\u0635\u0645\u064A\u0645 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0646 \u062F\u0648\u0646 \u0627\u062F\u0639\u0627\u0621 \u062A\u0635\u062F\u064A\u0642 \u0623\u0648 \u062A\u0635\u0646\u064A\u0641 \u062E\u0637\u0631 \u0639\u0627\u0645." : "Turn NASA evidence into testable design actions without claiming certification or a universal hazard ranking.")}<div class="equation"><b>${ar ? "\u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u062C\u0632\u0626\u064A" : "Oxygen partial pressure"}</b><code>pO\u2082 = xO\u2082 \xB7 Ptotal</code><p class="sub">${ar ? "\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u062D\u062F\u0647\u0627 \u0644\u0627 \u062A\u0643\u0641\u064A \u0644\u0648\u0635\u0641 \u0627\u0644\u062C\u0648. \u062A\u063A\u064A\u0651\u0631 \u0627\u0644\u0636\u063A\u0637 \u0623\u0648 \u0627\u0644\u062A\u0631\u0643\u064A\u0628 \u0642\u062F \u064A\u063A\u064A\u0651\u0631 \u062D\u062F\u0648\u062F \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644\u061B \u0644\u0627 \u0646\u0648\u0635\u064A \u0628\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062C\u0648 \u0644\u0644\u0637\u0627\u0642\u0645." : "Oxygen fraction alone does not define the atmosphere. Changing total pressure or composition changes flammability conditions; this dashboard does not prescribe crew atmosphere settings."}</p></div><div class="grid two safety-grid">${cards.map(([title, body, evidence]) => `<article class="card safety-card"><span class="tag comp">${ar ? "\u0625\u062C\u0631\u0627\u0621 \u0648\u0642\u0627\u0626\u064A" : "DESIGN CONTROL"}</span><h2>${title}</h2><p>${body}</p><div class="callout">${evidence}</div></article>`).join("")}</div><article class="card" style="margin-top:15px"><h2>${ar ? "\u0623\u0633\u0626\u0644\u0629 \u0627\u062E\u062A\u0628\u0627\u0631 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0646\u0641\u064A\u0630" : "Actionable qualification questions"}</h2><ol><li>${ar ? "\u0647\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 \u0646\u0641\u0633\u0647\u0627 \u0627\u062E\u062A\u064F\u0628\u0631\u062A \u0639\u0646\u062F \u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u060C \u0644\u0627 \u0639\u0646\u062F \u0646\u0633\u0628\u0629 O\u2082 \u0648\u062D\u062F\u0647\u0627\u061F" : "Was the exact material tested at the expected oxygen partial pressure, not oxygen fraction alone?"}</li><li>${ar ? "\u0647\u0644 \u0627\u062A\u062C\u0627\u0647 \u0648\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0648\u0645\u0648\u0636\u0639 \u0627\u0644\u0643\u0627\u0634\u0641 \u0645\u0637\u0627\u0628\u0642 \u0644\u0628\u064A\u0626\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u061F" : "Do airflow speed/direction and detector location match the intended environment?"}</li><li>${ar ? "\u0647\u0644 \u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u062A\u0642\u064A\u0633 \u0625\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A \u0648\u062A\u0648\u0642\u0641 \u0627\u0644\u062A\u0641\u0627\u0639\u0644 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A \u0643\u0644\u0651\u064C \u0639\u0644\u0649 \u062D\u062F\u0629\u061F" : "Does the suppression outcome separately measure visible-flame extinction and cessation of chemical reaction?"}</li><li>${ar ? "\u0647\u0644 \u0639\u062F\u062F \u0627\u0644\u062A\u0643\u0631\u0627\u0631\u0627\u062A \u0648\u0639\u062F\u0645 \u0627\u0644\u064A\u0642\u064A\u0646 \u0643\u0627\u0641\u064A\u0627\u0646 \u0642\u0628\u0644 \u062A\u0639\u0645\u064A\u0645 \u0627\u0644\u0627\u0633\u062A\u0646\u062A\u0627\u062C\u061F" : "Are replication and uncertainty adequate before generalizing the result?"}</li></ol><p class="sub">${ref}</p><div class="list-row"><span>NASA OCHMO-TB-008 \xB7 Fire Protection</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 \xB7 Revision F</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div><div class="list-row"><span>NASA combustion and fire safety investigations</span><a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div></article>`;
  }
  async function renderMissionLab(lang2 = "en") {
    const ar = lang2 === "ar";
    const targets = [
      { id: "earth", en: "Earth", ar: "\u0627\u0644\u0623\u0631\u0636", gravity: "9.81 m/s\xB2", keywords: ["ground", "earth", "terrestrial"] },
      { id: "iss", en: "ISS", ar: "\u0645\u062D\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0621", gravity: "microgravity", keywords: ["iss", "station", "spaceflight"] },
      { id: "moon", en: "Moon", ar: "\u0627\u0644\u0642\u0645\u0631", gravity: "1.62 m/s\xB2", keywords: ["lunar", "moon"] },
      { id: "mars", en: "Mars", ar: "\u0627\u0644\u0645\u0631\u064A\u062E", gravity: "3.7 m/s\xB2", keywords: ["mars"] }
    ];
    const cards = targets.map((target, i) => `<button type="button" class="mission-target" data-mission-target="${target.id}" aria-pressed="${i === 1}"><b>${ar ? target.ar : target.en}</b><small>${ar ? "\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629" : "Reference gravity"} \xB7 ${target.gravity}</small></button>`).join("");
    return `${pageHead(ar ? "\u0645\u062E\u062A\u0628\u0631 \u0627\u0646\u0637\u0628\u0627\u0642 \u0627\u0644\u0645\u0647\u0645\u0629" : "Mission Applicability Lab", ar ? "\u062D\u062F\u062F \u0628\u064A\u0626\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 \u0648\u0627\u0633\u062A\u0643\u0634\u0641 \u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u0641\u0647\u0627\u0631\u0633 NASA PSI \u062A\u062D\u062A\u0648\u064A \u0633\u064A\u0627\u0642\u0627\u064B \u0648\u0635\u0641\u064A\u0627\u064B \u0645\u0637\u0627\u0628\u0642\u0627\u064B\u061B \u0647\u0630\u0627 \u0644\u064A\u0633 \u062A\u0642\u064A\u064A\u0645\u0627\u064B \u0644\u0644\u062C\u0627\u0647\u0632\u064A\u0629 \u0623\u0648 \u0627\u0644\u062E\u0637\u0648\u0631\u0629." : "Select a target environment and inspect whether NASA PSI metadata contains matching context; this is not a readiness or hazard assessment.")}<div class="mission-targets" role="group" aria-label="${ar ? "\u0628\u064A\u0626\u0629 \u0627\u0644\u0645\u0647\u0645\u0629" : "Mission environment"}">${cards}</div><div class="grid two" style="margin-top:15px"><article class="card"><div class="card-head"><div><h2 data-mission-title>${ar ? "\u0645\u062D\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0621" : "ISS"}</h2><p class="sub" data-mission-gravity>${ar ? "\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629 \xB7 microgravity" : "Reference gravity \xB7 microgravity"}</p></div><span class="tag">${ar ? "\u062D\u0627\u0644\u0629 \u0628\u062D\u062B\u064A\u0629" : "RESEARCH SCENARIO"}</span></div><div class="scenario-controls"><label>${ar ? "\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u0645\u0641\u062A\u0631\u0636 \xB7 %" : "Scenario oxygen \xB7 %"}<input type="range" min="10" max="100" step="0.5" value="21" data-mission-o2><output data-mission-o2-value>21%</output></label><label>${ar ? "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A \u0627\u0644\u0645\u0641\u062A\u0631\u0636 \xB7 kPa" : "Scenario total pressure \xB7 kPa"}<input type="range" min="1" max="110" step="0.1" value="101.3" data-mission-pressure><output data-mission-pressure-value>101.3 kPa</output></label></div><div class="scenario-readout" style="margin-top:14px"><span>${ar ? "\u0636\u063A\u0637 O\u2082 \u0627\u0644\u062C\u0632\u0626\u064A \u0627\u0644\u062C\u0627\u0641 \u0627\u0644\u0645\u062D\u0633\u0648\u0628" : "Computed dry-gas O\u2082 partial pressure"}<small class="sub"> pO\u2082 = xO\u2082 \xD7 Ptotal</small></span><strong data-mission-po2>21.3 kPa</strong></div><p class="sub">${ar ? "\u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0648\u0627\u0644\u0636\u063A\u0637 \u0645\u062F\u062E\u0644\u0627\u062A \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u062A\u062E\u062A\u0627\u0631\u0647\u0627 \u0623\u0646\u062A\u061B \u0627\u0644\u062D\u0633\u0627\u0628 \u0648\u062D\u062F\u0647 \u0645\u0634\u062A\u0642. \u0644\u0627 \u064A\u0648\u0635\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062E\u062A\u0628\u0631 \u0628\u062C\u0648 \u0644\u0644\u0645\u0631\u0643\u0628\u0629 \u0648\u0644\u0627 \u064A\u062D\u0633\u0628 \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644." : "Oxygen and pressure are user-defined scenario inputs; only their product is computed. This lab does not prescribe a vehicle atmosphere or calculate flammability."}</p></article><article class="card"><h2>${ar ? "\u0633\u064A\u0627\u0642 NASA PSI \u0627\u0644\u0645\u0637\u0627\u0628\u0642 \u0648\u0635\u0641\u064A\u0627\u064B" : "NASA PSI metadata matches"}</h2><p class="sub">${ar ? "\u0645\u0637\u0627\u0628\u0642\u0629 \u0643\u0644\u0645\u0627\u062A \u0641\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u0647\u0631\u0633 \u0641\u0642\u0637\u061B \u0644\u064A\u0633\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0644\u0627 \u062A\u0635\u0646\u064A\u0641\u0627\u064B \u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0645\u0629." : "Keyword matches in inventory metadata only; not a match to experimental conditions or a mission-safety ranking."}</p><div data-mission-records aria-live="polite"><div class="empty">${ar ? "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0641\u0647\u0631\u0633 NASA PSI\u2026" : "Loading NASA PSI inventory\u2026"}</div></div></article></div><article class="card" style="margin-top:15px"><h2>${ar ? "\u062D\u062F\u0648\u062F \u062A\u0645\u062B\u064A\u0644 \u0627\u0644\u0642\u0645\u0631 \u0648\u0627\u0644\u0645\u0631\u064A\u062E" : "Moon and Mars evidence boundary"}</h2><p>${ar ? "\u0642\u064A\u0645 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u062A\u0633\u0627\u0639\u062F \u0639\u0644\u0649 \u062A\u0639\u0631\u064A\u0641 \u0627\u0644\u0633\u064A\u0646\u0627\u0631\u064A\u0648\u060C \u0644\u0643\u0646\u0647\u0627 \u0644\u0627 \u062A\u062C\u0639\u0644 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u062A\u062C\u0627\u0631\u0628 \u0642\u0645\u0631\u064A\u0629 \u0623\u0648 \u0645\u0631\u064A\u062E\u064A\u0629. \u0643\u0645\u0627 \u0623\u0646 \u0627\u0644\u0636\u063A\u0637 \u0648\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u062C\u0648 \u0641\u064A \u0645\u0633\u0627\u0643\u0646 \u0648\u0645\u0631\u0643\u0628\u0627\u062A \u0627\u0644\u0645\u0647\u0645\u0627\u062A \u064A\u062D\u062A\u0627\u062C\u0627\u0646 \u0645\u062F\u062E\u0644\u0627\u062A \u062A\u0635\u0645\u064A\u0645 \u062E\u0627\u0635\u0629 \u0628\u0643\u0644 \u0645\u0647\u0645\u0629\u061B \u0644\u0645 \u0646\u0645\u0644\u0623\u0647\u0627 \u0628\u0642\u064A\u0645 \u0645\u0641\u062A\u0631\u0636\u0629." : "Gravity values define a scenario; they do not turn microgravity records into lunar or Martian experiments. Habitat and vehicle pressure/composition require mission-specific design inputs, so no atmosphere values are assumed here."}</p><div class="callout warn">${ar ? "\u062F\u0631\u062C\u0629 \u0635\u0644\u0629 \u0627\u0644\u0641\u0647\u0631\u0633 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0627 \u062A\u0639\u0646\u064A \u0642\u0627\u0628\u0644\u064A\u0629 \u0646\u0642\u0644 \u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u0628\u064A\u0646 \u0627\u0644\u0623\u0631\u0636 \u0648ISS \u0648\u0627\u0644\u0642\u0645\u0631 \u0648\u0627\u0644\u0645\u0631\u064A\u062E." : "The inventory\u2019s general relevance score does not imply that results transfer among Earth, ISS, Moon, and Mars."}</div></article>`;
  }
  function bindMissionLab(root, lang2 = "en") {
    var _a, _b;
    const ar = lang2 === "ar";
    const dataPromise = get("/api/challenge/catalog");
    const targets = {
      earth: { en: "Earth", ar: "\u0627\u0644\u0623\u0631\u0636", gravity: "9.81 m/s\xB2", keywords: ["ground", "earth", "terrestrial"] },
      iss: { en: "ISS", ar: "\u0645\u062D\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0621", gravity: "microgravity", keywords: ["iss", "station", "spaceflight"] },
      moon: { en: "Moon", ar: "\u0627\u0644\u0642\u0645\u0631", gravity: "1.62 m/s\xB2", keywords: ["lunar", "moon"] },
      mars: { en: "Mars", ar: "\u0627\u0644\u0645\u0631\u064A\u062E", gravity: "3.7 m/s\xB2", keywords: ["mars"] }
    };
    const output = root.querySelector("[data-mission-records]");
    const gravitySources = document.createElement("p");
    gravitySources.className = "sub mission-gravity-sources";
    gravitySources.innerHTML = ar ? '\u062A\u0633\u0627\u0631\u0639 \u0627\u0644\u0633\u0637\u062D \u0627\u0644\u0645\u0631\u062C\u0639\u064A: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/moon/" target="_blank" rel="noreferrer">\u0627\u0644\u0642\u0645\u0631 \xB7 NASA</a> \xB7 <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/mars/" target="_blank" rel="noreferrer">\u0627\u0644\u0645\u0631\u064A\u062E \xB7 NASA</a>. \u0642\u064A\u0645\u0629 \u0627\u0644\u0623\u0631\u0636 \u0645\u0639\u064A\u0627\u0631 \u0645\u0631\u062C\u0639\u064A \u0645\u0642\u0631\u0628.' : 'Reference surface acceleration: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/moon/" target="_blank" rel="noreferrer">Moon \xB7 NASA</a> \xB7 <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/mars/" target="_blank" rel="noreferrer">Mars \xB7 NASA</a>. Earth value is a rounded reference.';
    (_a = root.querySelector(".mission-targets")) == null ? void 0 : _a.after(gravitySources);
    const title = root.querySelector("[data-mission-title]");
    const gravity = root.querySelector("[data-mission-gravity]");
    const o2 = root.querySelector("[data-mission-o2]");
    const pressure = root.querySelector("[data-mission-pressure]");
    const updatePartialPressure = () => {
      const fraction = Number(o2 == null ? void 0 : o2.value) / 100;
      const total = Number(pressure == null ? void 0 : pressure.value);
      root.querySelector("[data-mission-o2-value]").textContent = `${Number(o2.value).toFixed(1)}%`;
      root.querySelector("[data-mission-pressure-value]").textContent = `${Number(pressure.value).toFixed(1)} kPa`;
      root.querySelector("[data-mission-po2]").textContent = `${(fraction * total).toFixed(2)} kPa`;
    };
    o2 == null ? void 0 : o2.addEventListener("input", updatePartialPressure);
    pressure == null ? void 0 : pressure.addEventListener("input", updatePartialPressure);
    root.querySelectorAll("[data-mission-target]").forEach((button) => button.addEventListener("click", async () => {
      const id = button.dataset.missionTarget;
      const target = targets[id];
      if (!target) return;
      root.querySelectorAll("[data-mission-target]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      title.textContent = ar ? target.ar : target.en;
      gravity.textContent = `${ar ? "\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629" : "Reference gravity"} \xB7 ${target.gravity}`;
      try {
        const data = await dataPromise;
        const records = data.officialInventory.records.filter((item) => {
          const text = `${item.title} ${item.acronym} ${item.subResearchArea} ${item.projectType} ${item.flightPlatform} ${item.keywords}`.toLowerCase();
          return target.keywords.some((keyword) => text.includes(keyword));
        }).slice(0, 6);
        output.innerHTML = records.length ? records.map((item) => `<div class="list-row"><span><b>${esc(item.id)} \xB7 ${esc(item.acronym || item.title)}</b><small>${esc(item.title)} \xB7 ${item.rawTableBundled ? ar ? "\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631 \u0645\u0631\u0641\u0642" : "source table bundled" : ar ? "\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637" : "metadata only"}</small></span><a href="${esc(item.nasaRecordUrl)}" target="_blank" rel="noreferrer">NASA PSI \u2197</a></div>`).join("") : `<div class="callout">${ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0637\u0627\u0628\u0642\u0629 \u0648\u0635\u0641\u064A\u0629 \u0648\u0627\u0636\u062D\u0629 \u0641\u064A \u0644\u0642\u0637\u0629 \u0627\u0644\u0641\u0647\u0631\u0633 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u0647\u0630\u0627 \u0644\u0627 \u064A\u062B\u0628\u062A \u063A\u064A\u0627\u0628 \u062F\u0631\u0627\u0633\u0627\u062A \u0623\u062E\u0631\u0649 \u0644\u062F\u0649 NASA." : "No clear metadata match in the current inventory snapshot. This does not prove NASA has no other relevant studies."}</div>`;
      } catch (error) {
        output.innerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
      }
    }));
    (_b = root.querySelector('[data-mission-target="iss"]')) == null ? void 0 : _b.click();
    updatePartialPressure();
  }
  async function bindSafetyInsightCharts(root, lang2 = "en") {
    const ar = lang2 === "ar";
    const section = document.createElement("section");
    section.className = "card safety-evidence-trends";
    section.innerHTML = `<h2>${ar ? "\u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0645\u0646 \u0642\u064A\u0627\u0633\u0627\u062A NASA \u0627\u0644\u0641\u0639\u0644\u064A\u0629" : "Trends from measured NASA records"}</h2><p class="sub">${ar ? "\u0645\u062E\u0637\u0637\u0627\u062A \u0645\u0646\u0641\u0635\u0644\u0629 \u0644\u0628\u064A\u0627\u0646\u0627\u062A FLEX PSI-69\u061B \u0627\u0644\u0646\u0642\u0627\u0637 \u0635\u0641\u0648\u0641 \u0645\u0635\u062F\u0631\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0645\u0646\u062D\u0646\u0649 \u062A\u0646\u0628\u0624\u064A\u0627\u064B." : "Separate plots for FLEX PSI-69 source rows; points are observations, not a fitted prediction curve."}</p><div class="empty" role="status">${ar ? "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631\u2026" : "Loading source table\u2026"}</div>`;
    const anchor = root.querySelector(".safety-grid");
    if (anchor) anchor.after(section);
    else root.append(section);
    try {
      const [table, dataset2, bass, weightLoss, catalog] = await Promise.all([
        loadStudyTable("PSI-69"),
        get("/api/datasets/flex"),
        loadStudyTable("PSI-98"),
        loadStudyTable("PSI-102"),
        get("/api/challenge/catalog")
      ]);
      const rowCountByStudy = new Map(catalog.investigations.map((item) => [item.id, item.rowCount]));
      const programCounts = /* @__PURE__ */ new Map();
      for (const item of catalog.officialInventory.records) {
        const count = rowCountByStudy.get(item.id);
        if (!Number.isFinite(count)) continue;
        const program = item.acronym || item.subResearchArea || item.id;
        const current2 = programCounts.get(program) || { rows: 0, studies: 0 };
        current2.rows += count;
        current2.studies++;
        programCounts.set(program, current2);
      }
      const programs = [...programCounts].map(([name, value]) => __spreadValues({ name }, value)).sort((a, b) => b.rows - a.rows);
      const maxRows = Math.max(1, ...programs.map((item) => item.rows));
      const distribution = programs.map((item) => `<div class="source-count-row"><span><b>${esc(item.name)}</b><small>${item.studies} ${ar ? "\u062A\u062D\u0642\u064A\u0642" : "investigations"}</small></span><div class="source-count-track" role="img" aria-label="${esc(item.rows)} ${ar ? "\u0635\u0641\u0627\u064B \u0645\u0631\u0641\u0642\u0627\u064B" : "bundled source rows"}"><i style="width:${(item.rows / maxRows * 100).toFixed(1)}%"></i></div><strong>${item.rows}</strong></div>`).join("");
      section.innerHTML = `<h2>${ar ? "\u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0645\u0646 \u0642\u064A\u0627\u0633\u0627\u062A NASA \u0627\u0644\u0641\u0639\u0644\u064A\u0629" : "Trends from measured NASA records"}</h2><p class="sub">${ar ? `NASA PSI-69 FLEX \xB7 ${table.rows.length} \u0635\u0641\u0627\u064B \u0641\u064A \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062E\u0627\u0645. \u062A\u064F\u0639\u0631\u0636 \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A \u0628\u062D\u0633\u0628 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0648\u0644\u0627 \u062A\u062F\u0645\u062C \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A.` : `NASA PSI-69 FLEX \xB7 ${table.rows.length} raw source rows. Measurements stay separated by investigation; studies are not pooled.`}</p>${flex3DMarkup(lang2)}<section class="insight-chart-block"><h3>${ar ? "\u0633\u0644\u0648\u0643 \u0627\u0644\u0644\u0647\u0628 \u0648\u0627\u0644\u0642\u0637\u0631\u0627\u062A \xB7 PSI-69 FLEX" : "Flame and droplet behavior \xB7 PSI-69 FLEX"}</h3>${renderSourceStudyCharts("PSI-69", table.rows, lang2, "https://psi.nasa.gov/physci/repo/data/investigations/PSI-69")}</section><section class="insight-chart-block"><h3>${ar ? "\u0645\u0648\u0627\u062F \u0648\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u062D\u0631\u064A\u0642 \xB7 NASA PSI" : "Materials and fire-test records \xB7 NASA PSI"}</h3><p class="sub">${ar ? "\u0643\u0644 \u0645\u062E\u0637\u0637 \u064A\u0628\u0642\u0649 \u062F\u0627\u062E\u0644 \u062C\u062F\u0648\u0644 \u0645\u0635\u062F\u0631\u0647\u061B \u0645\u0624\u0634\u0631\u0627\u062A \u0641\u0642\u062F\u0627\u0646 \u0627\u0644\u0648\u0632\u0646 \u0623\u0648 \u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0644\u0627 \u062A\u0639\u0627\u062F\u0644 \u0645\u0639\u062F\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628." : "Each plot stays inside its source table; weight loss or burn time is not a flame-spread rate."}</p>${renderSourceStudyCharts("PSI-98", bass.rows, lang2, "https://psi.nasa.gov/physci/repo/data/investigations/PSI-98")}${renderSourceStudyCharts("PSI-102", weightLoss.rows, lang2, "https://psi.nasa.gov/physci/repo/data/investigations/PSI-102")}</section>${renderExternalNASAPlots(lang2)}<section class="card source-distribution"><h3>${ar ? "\u0635\u0641\u0648\u0641 \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u062D\u0633\u0628 \u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0628\u062D\u062B" : "Bundled source-row inventory by research program"}</h3><p class="sub">${ar ? "\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u062E\u0627\u0645 \u062F\u0627\u062E\u0644 \u0643\u0644 \u0628\u0631\u0646\u0627\u0645\u062C \u0628\u062D\u0633\u0628 \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0641\u0642\u0637\u061B \u0644\u0627 \u062A\u0645\u062B\u0644 \u0639\u064A\u0646\u0629 \u0645\u0648\u062D\u062F\u0629 \u0648\u0644\u0627 \u0645\u0642\u0627\u0631\u0646\u0629 \u062E\u0637\u0648\u0631\u0629." : "Sum of raw rows for each program across bundled tables only; these are not one pooled sample or a hazard comparison."}</p>${distribution}</section>`;
      bindFlex3DPlot(section, dataset2.rows, lang2);
      bindInteractiveCharts(section);
    } catch (error) {
      const loading = section.querySelector(".empty");
      if (loading) loading.outerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
      else section.insertAdjacentHTML("beforeend", `<div class="callout warn">${esc(error.message)}</div>`);
    }
  }

  // public/csv-safe.js
  function csvCell(value) {
    const raw = value == null ? "" : String(value);
    const safe = typeof value === "string" && /^[\s\uFEFF]*[=+\-@]/u.test(raw) ? `'${raw}` : raw;
    return `"${safe.replaceAll('"', '""')}"`;
  }

  // public/lib/chart-guide.js
  var FLEX_CHART_GUIDE = [
    {
      id: "oxygen-burning-rate",
      title: { en: "Oxygen fraction and droplet burning rate", ar: "\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629" },
      xKey: "oxygen_mole_fraction",
      yKey: "burning_rate_mm_s",
      xLabel: { en: "Oxygen mole fraction", ar: "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646" },
      xUnit: "%",
      xFactor: 100,
      yLabel: { en: "Burning-rate constant", ar: "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642" },
      yUnit: "mm\xB2/s",
      question: {
        en: "Do recorded burning-rate constants vary across the oxygen fractions in these tests?",
        ar: "\u0647\u0644 \u062A\u062E\u062A\u0644\u0641 \u062B\u0648\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0639\u0628\u0631 \u0646\u0633\u0628 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A\u061F"
      },
      use: {
        en: "Compare each source test by fuel; zoom, inspect individual points, or show an exploratory fit.",
        ar: "\u0642\u0627\u0631\u0646 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u0628\u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u0648\u062F\u060C \u0648\u0643\u0628\u0651\u0631 \u0648\u0627\u0641\u062D\u0635 \u0627\u0644\u0646\u0642\u0627\u0637 \u0623\u0648 \u0623\u0638\u0647\u0631 \u0645\u0644\u0627\u0621\u0645\u0629 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A\u0629."
      },
      limit: {
        en: "Fuel, pressure, diluent, and test procedure also vary. This pooled view describes the sample; it does not isolate an oxygen effect.",
        ar: "\u064A\u062A\u063A\u064A\u0631 \u0623\u064A\u0636\u0627\u064B \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641 \u0648\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u064A\u0635\u0641 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0639\u064A\u0646\u0629 \u0648\u0644\u0627 \u064A\u0639\u0632\u0644 \u0623\u062B\u0631 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646."
      }
    },
    {
      id: "initial-diameter-burning-rate",
      title: { en: "Initial droplet diameter and burning rate", ar: "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A \u0648\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642" },
      xKey: "initial_droplet_diameter_mm",
      yKey: "burning_rate_mm_s",
      xLabel: { en: "Initial droplet diameter", ar: "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A" },
      xUnit: "mm",
      yLabel: { en: "Burning-rate constant", ar: "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642" },
      yUnit: "mm\xB2/s",
      question: {
        en: "How does the recorded initial droplet size sit alongside the burning-rate result?",
        ar: "\u0643\u064A\u0641 \u064A\u0642\u0639 \u062D\u062C\u0645 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A \u0627\u0644\u0645\u0633\u062C\u0644 \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0646\u062A\u064A\u062C\u0629 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u061F"
      },
      use: {
        en: "Inspect the spread of individual FLEX tests and identify values that merit source-row review.",
        ar: "\u0627\u0641\u062D\u0635 \u062A\u0634\u062A\u062A \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A FLEX \u0627\u0644\u0641\u0631\u062F\u064A\u0629 \u0648\u062D\u062F\u062F \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u062A\u064A \u062A\u0633\u062A\u062D\u0642 \u0645\u0631\u0627\u062C\u0639\u0629 \u0635\u0641 \u0627\u0644\u0645\u0635\u062F\u0631."
      },
      limit: {
        en: "Droplet size is not an isolated control here; differences between tests can reflect other conditions or protocol.",
        ar: "\u062D\u062C\u0645 \u0627\u0644\u0642\u0637\u0631\u0629 \u0644\u064A\u0633 \u0645\u062A\u063A\u064A\u0631\u0627\u064B \u0645\u0639\u0632\u0648\u0644\u0627\u064B \u0647\u0646\u0627\u061B \u0648\u0642\u062F \u062A\u0639\u0643\u0633 \u0627\u0644\u0641\u0631\u0648\u0642 \u0638\u0631\u0648\u0641\u0627\u064B \u0623\u062E\u0631\u0649 \u0623\u0648 \u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631."
      }
    },
    {
      id: "pressure-burning-rate",
      title: { en: "Pressure and droplet burning rate", ar: "\u0627\u0644\u0636\u063A\u0637 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629" },
      xKey: "pressure_mmHg",
      yKey: "burning_rate_mm_s",
      xLabel: { en: "Pressure", ar: "\u0627\u0644\u0636\u063A\u0637" },
      xUnit: "mmHg",
      yLabel: { en: "Burning-rate constant", ar: "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642" },
      yUnit: "mm\xB2/s",
      question: {
        en: "What burning-rate values were observed across the recorded ambient pressures?",
        ar: "\u0645\u0627 \u0642\u064A\u0645 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629 \u0639\u0628\u0631 \u0627\u0644\u0636\u063A\u0648\u0637 \u0627\u0644\u0645\u062D\u064A\u0637\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629\u061F"
      },
      use: {
        en: "See the pressure coverage and spread before using the condition filters in the Workbench.",
        ar: "\u0627\u0633\u062A\u0639\u0631\u0636 \u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u062A\u0634\u062A\u062A \u0642\u0628\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0631\u0634\u062D\u0627\u062A \u0627\u0644\u0638\u0631\u0648\u0641 \u0641\u064A \u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644."
      },
      limit: {
        en: "Tests are not a single controlled pressure sweep; pressure alone cannot explain the pattern.",
        ar: "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0644\u064A\u0633\u062A \u0645\u0633\u062D\u0627\u064B \u0645\u0636\u0628\u0648\u0637\u0627\u064B \u0644\u0644\u0636\u063A\u0637 \u0648\u062D\u062F\u0647\u061B \u0644\u0630\u0644\u0643 \u0644\u0627 \u064A\u0641\u0633\u0631 \u0627\u0644\u0636\u063A\u0637 \u0648\u062D\u062F\u0647 \u0627\u0644\u0646\u0645\u0637."
      }
    },
    {
      id: "burn-time-burning-rate",
      title: { en: "Burn time and droplet burning rate", ar: "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629" },
      xKey: "burn_time_s",
      yKey: "burning_rate_mm_s",
      xLabel: { en: "Burn time", ar: "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642" },
      xUnit: "s",
      yLabel: { en: "Burning-rate constant", ar: "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642" },
      yUnit: "mm\xB2/s",
      question: {
        en: "How are the recorded test duration and burning-rate constant distributed together?",
        ar: "\u0643\u064A\u0641 \u064A\u062A\u0648\u0632\u0639 \u0632\u0645\u0646 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u0633\u062C\u0644 \u0645\u0639 \u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u061F"
      },
      use: {
        en: "Check whether short or long tests occupy distinct parts of this observed sample.",
        ar: "\u062A\u062D\u0642\u0642 \u0645\u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u0642\u0635\u064A\u0631\u0629 \u0623\u0648 \u0627\u0644\u0637\u0648\u064A\u0644\u0629 \u062A\u0642\u0639 \u0641\u064A \u0623\u062C\u0632\u0627\u0621 \u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u0646 \u0627\u0644\u0639\u064A\u0646\u0629 \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629."
      },
      limit: {
        en: "Duration is linked to the test outcome and procedure; this plot is descriptive, not a predictive lifetime model.",
        ar: "\u064A\u0631\u062A\u0628\u0637 \u0627\u0644\u0632\u0645\u0646 \u0628\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0625\u062C\u0631\u0627\u0626\u0647\u061B \u0647\u0630\u0627 \u0648\u0635\u0641 \u0644\u0644\u0639\u064A\u0646\u0629 \u0648\u0644\u064A\u0633 \u0646\u0645\u0648\u0630\u062C\u0627\u064B \u062A\u0646\u0628\u0624\u064A\u0627\u064B \u0644\u0645\u062F\u0629 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642."
      }
    },
    {
      id: "oxygen-extinction-diameter",
      title: { en: "Oxygen fraction and flame-extinction diameter", ar: "\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628" },
      xKey: "oxygen_mole_fraction",
      yKey: "visible_flame_extinction_diameter_mm",
      xLabel: { en: "Oxygen mole fraction", ar: "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646" },
      xUnit: "%",
      xFactor: 100,
      yLabel: { en: "Visible flame extinction diameter", ar: "\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A" },
      yUnit: "mm",
      question: {
        en: "For tests with a reported extinction diameter, how does that value vary across oxygen fractions?",
        ar: "\u0641\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u0623\u0628\u0644\u063A\u062A \u0639\u0646 \u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621\u060C \u0643\u064A\u0641 \u062A\u062A\u063A\u064A\u0631 \u0642\u064A\u0645\u062A\u0647 \u0639\u0628\u0631 \u0646\u0633\u0628 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646\u061F"
      },
      use: {
        en: "Inspect the finite-diameter extinction observations relevant to FLEX flammability-limit work.",
        ar: "\u0627\u0641\u062D\u0635 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0627\u0646\u0637\u0641\u0627\u0621 \u0630\u0627\u062A \u0627\u0644\u0642\u0637\u0631 \u0627\u0644\u0645\u062D\u062F\u0648\u062F \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u062F\u0631\u0627\u0633\u0629 \u062D\u062F\u0648\u062F \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0641\u064A FLEX."
      },
      limit: {
        en: "Missing values are not zero: tests without a reported finite extinction diameter are excluded from this pair.",
        ar: "\u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629 \u0644\u064A\u0633\u062A \u0635\u0641\u0631\u0627\u064B\u061B \u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u0644\u0627 \u062A\u0645\u0644\u0643 \u0642\u0637\u0631\u0627\u064B \u0645\u062D\u062F\u0648\u062F\u0627\u064B \u0645\u0633\u062C\u0644\u0627\u064B \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0632\u0648\u062C."
      }
    },
    {
      id: "pressure-extinction-diameter",
      title: { en: "Pressure and flame-extinction diameter", ar: "\u0627\u0644\u0636\u063A\u0637 \u0648\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628" },
      xKey: "pressure_mmHg",
      yKey: "visible_flame_extinction_diameter_mm",
      xLabel: { en: "Pressure", ar: "\u0627\u0644\u0636\u063A\u0637" },
      xUnit: "mmHg",
      yLabel: { en: "Visible flame extinction diameter", ar: "\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A" },
      yUnit: "mm",
      question: {
        en: "How are recorded ambient pressure and finite extinction-diameter observations distributed together?",
        ar: "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0645\u062D\u064A\u0637 \u0648\u0642\u0637\u0631 \u0627\u0644\u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0645\u062D\u062F\u0648\u062F \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0645\u0639\u0627\u064B\u061F"
      },
      use: {
        en: "Review the observed pressure range associated with reported extinction diameters.",
        ar: "\u0631\u0627\u062C\u0639 \u0646\u0637\u0627\u0642 \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0645\u0631\u0635\u0648\u062F \u0645\u0639 \u0623\u0642\u0637\u0627\u0631 \u0627\u0644\u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0645\u0633\u062C\u0644\u0629."
      },
      limit: {
        en: "The available tests do not form a controlled pressure-only sweep; absent diameters stay missing.",
        ar: "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0644\u0627 \u062A\u0634\u0643\u0644 \u0645\u0633\u062D\u0627\u064B \u0645\u0636\u0628\u0648\u0637\u0627\u064B \u0644\u0644\u0636\u063A\u0637 \u0648\u062D\u062F\u0647\u061B \u0648\u062A\u0628\u0642\u0649 \u0627\u0644\u0623\u0642\u0637\u0627\u0631 \u063A\u064A\u0631 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0645\u0641\u0642\u0648\u062F\u0629."
      }
    }
  ];

  // public/lib/navigation.js
  function filterNavEntries(entries, query, aliases = {}) {
    const needle = String(query || "").trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter(
      ([name, label]) => [name, label, aliases[name] || ""].some((value) => String(value).toLowerCase().includes(needle))
    );
  }

  // public/lib/measurement-plots.js
  var FIELDS = [
    { key: "oxygen_mole_fraction", en: "Oxygen mole fraction", ar: "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646", unit: "%", scale: 100 },
    { key: "pressure_mmHg", en: "Ambient pressure", ar: "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0645\u062D\u064A\u0637", unit: "mmHg", scale: 1 },
    { key: "initial_droplet_diameter_mm", en: "Initial droplet diameter", ar: "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A", unit: "mm", scale: 1 },
    { key: "visible_flame_extinction_diameter_mm", en: "Visible flame extinction diameter", ar: "\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A", unit: "mm", scale: 1 },
    { key: "burning_rate_mm_s", en: "Droplet burning-rate constant", ar: "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629", unit: "mm\xB2/s", scale: 1 },
    { key: "burn_time_s", en: "Burn duration", ar: "\u0645\u062F\u0629 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642", unit: "s", scale: 1 }
  ];
  var fieldLabel = (field, ar) => `${ar ? field.ar : field.en} \xB7 ${field.unit}`;
  var optionMarkup = (ar, selected) => FIELDS.map((field) => `<option value="${field.key}"${field.key === selected ? " selected" : ""}>${esc(fieldLabel(field, ar))}</option>`).join("");
  function measurementPlotStudioMarkup(lang2 = "en") {
    const ar = lang2 === "ar";
    return `<section class="measurement-plot-studio card" data-measurement-plot-studio>
    <div class="card-head"><div><span class="eyebrow">NASA PSI-69 \xB7 FLEX</span><h2>${ar ? "\u0627\u0633\u062A\u0648\u062F\u064A\u0648 \u0631\u0633\u0645 \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A" : "Measurement Plot Studio"}</h2><p class="sub">${ar ? "\u0627\u0631\u0633\u0645 \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u062E\u0627\u0645 \u0628\u0645\u062D\u0627\u0648\u0631 \u062A\u062E\u062A\u0627\u0631\u0647\u0627\u060C \u0648\u0627\u0641\u062D\u0635 \u0643\u0644 \u0646\u0642\u0637\u0629. \u0644\u0627 \u0646\u062F\u0645\u062C \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0648\u0642\u0648\u062F \u0623\u0648 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0635\u0645\u062A." : "Plot measured source rows on axes you choose and inspect every point. Fuel and test conditions are never silently pooled."}</p></div><span class="tag obs">${ar ? "\u0642\u064A\u0627\u0633\u0627\u062A \u0645\u0631\u0635\u0648\u062F\u0629" : "OBSERVED MEASUREMENTS"}</span></div>
    <div class="toolbar plot-studio-controls">
      <label>${ar ? "\u0627\u0644\u0645\u062D\u0648\u0631 \u0627\u0644\u0623\u0641\u0642\u064A" : "X axis"}<select data-plot-x>${optionMarkup(ar, "oxygen_mole_fraction")}</select></label>
      <label>${ar ? "\u0627\u0644\u0645\u062D\u0648\u0631 \u0627\u0644\u0639\u0645\u0648\u062F\u064A" : "Y axis"}<select data-plot-y>${optionMarkup(ar, "burning_rate_mm_s")}</select></label>
      <label>${ar ? "\u0627\u0644\u0648\u0642\u0648\u062F" : "Fuel"}<select data-plot-fuel><option value="">${ar ? "\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0648\u0642\u0648\u062F" : "All fuels"}</option></select></label>
      <label>${ar ? "\u0627\u0644\u0646\u062A\u064A\u062C\u0629" : "Test outcome"}<select data-plot-outcome><option value="">${ar ? "\u0643\u0644 \u0627\u0644\u0646\u062A\u0627\u0626\u062C" : "All outcomes"}</option></select></label>
      <label class="plot-fit-toggle"><input type="checkbox" data-plot-fit> ${ar ? "\u062E\u0637 \u0645\u0644\u0627\u0621\u0645\u0629 \u0648\u0635\u0641\u064A" : "Descriptive linear fit"}</label>
      <div class="plot-zoom-controls"><button type="button" class="outline-btn" data-plot-action="zoom-in" aria-label="${ar ? "\u062A\u0643\u0628\u064A\u0631" : "Zoom in"}">\uFF0B</button><button type="button" class="outline-btn" data-plot-action="zoom-out" aria-label="${ar ? "\u062A\u0635\u063A\u064A\u0631" : "Zoom out"}">\u2212</button><button type="button" class="outline-btn" data-plot-action="reset">${ar ? "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u0642\u064A\u0627\u0633" : "Reset scale"}</button></div>
    </div>
    <div class="measurement-plot" data-measurement-plot role="region" aria-label="${ar ? "\u0645\u062E\u0637\u0637 \u0642\u064A\u0627\u0633\u0627\u062A FLEX \u062A\u0641\u0627\u0639\u0644\u064A" : "Interactive FLEX measurements plot"}"></div>
    <p class="sub" data-plot-summary aria-live="polite"></p>
    <div class="callout warn">${ar ? "\u062A\u0633\u0645\u064A\u0627\u062A \u0627\u0644\u0645\u062D\u0627\u0648\u0631 \u0648\u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0645\u0646 \u062C\u062F\u0648\u0644 NASA PSI-69. \u062E\u0637 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629 \u064A\u062D\u0633\u0628 \u0628\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0645\u0631\u0628\u0639\u0627\u062A \u0627\u0644\u0635\u063A\u0631\u0649 \u0644\u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0641\u0642\u0637\u061B \u0627\u062E\u062A\u0644\u0627\u0641 \u0627\u0644\u0636\u063A\u0637 \u0648\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u063A\u0627\u0632 \u0648\u062D\u062C\u0645 \u0627\u0644\u0642\u0637\u0631\u0629 \u064A\u0645\u0646\u0639 \u062A\u0641\u0633\u064A\u0631\u0647 \u0643\u0623\u062B\u0631 \u0633\u0628\u0628\u064A \u0623\u0648 \u0642\u0627\u0646\u0648\u0646 \u0639\u0627\u0645. \u0647\u0630\u0647 \u0642\u064A\u0627\u0633\u0627\u062A \u0627\u062D\u062A\u0631\u0627\u0642 \u0642\u0637\u0631\u0627\u062A\u060C \u0648\u0644\u064A\u0633\u062A \u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u062D\u0631\u064A\u0642 \u0645\u0627\u062F\u0629 \u0635\u0644\u0628\u0629." : "Axis names and units follow the NASA PSI-69 table. The least-squares fit is exploratory only; varying pressure, gas composition, and droplet size prevent causal or universal interpretation. These are droplet-combustion measurements, not solid-material flame-spread speeds."} <a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-69" target="_blank" rel="noreferrer">NASA PSI-69 \u2197</a></div>
  </section>
  <section class="evidence-tree card" aria-labelledby="evidence-tree-title"><div class="card-head"><div><span class="eyebrow">TRACEABLE INTERPRETATION</span><h2 id="evidence-tree-title">${ar ? "\u0634\u062C\u0631\u0629 \u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u062F\u0644\u064A\u0644" : "Evidence-to-claim tree"}</h2><p class="sub">${ar ? "\u0643\u0644 \u0627\u0633\u062A\u0646\u062A\u0627\u062C \u064A\u0633\u064A\u0631 \u0639\u0628\u0631 \u0634\u0631\u0648\u0637 \u0648\u0627\u0636\u062D\u0629 \u0645\u0646 \u0627\u0644\u0642\u064A\u0627\u0633 \u0625\u0644\u0649 \u062D\u062F\u0648\u062F \u0627\u0644\u062A\u0639\u0645\u064A\u0645." : "Every conclusion follows explicit steps from measurements to the limits of generalization."}</p></div></div><div class="evidence-tree-root">${ar ? "\u0645\u0635\u062F\u0631 NASA PSI-69 \xB7 \u062A\u062C\u0627\u0631\u0628 FLEX" : "NASA PSI-69 \xB7 FLEX experiments"}</div><div class="evidence-tree-branches"><article><b>${ar ? "\u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631" : "Test conditions"}</b><span>${ar ? "\u0648\u0642\u0648\u062F \xB7 O\u2082/N\u2082/CO\u2082/He \xB7 \u0636\u063A\u0637 \xB7 \u062D\u062C\u0645 \u0627\u0644\u0642\u0637\u0631\u0629" : "Fuel \xB7 O\u2082/N\u2082/CO\u2082/He \xB7 pressure \xB7 droplet size"}</span></article><article><b>${ar ? "\u0642\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631" : "Source measurements"}</b><span>${ar ? "\u0642\u0637\u0631 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A \xB7 \u062B\u0627\u0628\u062A \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \xB7 \u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \xB7 \u0627\u0644\u0646\u062A\u064A\u062C\u0629" : "Visible flame diameter \xB7 burning-rate constant \xB7 burn time \xB7 outcome"}</span></article></div><div class="evidence-tree-leaves"><article><b>${ar ? "\u064A\u062C\u0648\u0632 \u0648\u0635\u0641\u0647" : "Supported description"}</b><span>${ar ? "\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0635\u0641\u0648\u0641 \u0648\u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062A \u062F\u0627\u062E\u0644 \u0627\u0644\u0634\u0631\u0648\u0637 \u0627\u0644\u0645\u0639\u0644\u0646\u0629" : "Distributions and associations within stated conditions"}</span></article><article class="warn-leaf"><b>${ar ? "\u0644\u0627 \u064A\u062C\u0648\u0632 \u0627\u0633\u062A\u0646\u062A\u0627\u062C\u0647" : "Not established"}</b><span>${ar ? "\u0633\u0628\u0628\u064A\u0629 \u0645\u0624\u0643\u062F\u0629 \xB7 \u0627\u062D\u062A\u0645\u0627\u0644 \u062E\u0637\u0631 \u0639\u0627\u0645 \xB7 \u0633\u0644\u0648\u0643 \u0643\u0644 \u0644\u0647\u0628 \u0623\u0648 \u0645\u0647\u0645\u0629 \u0641\u0636\u0627\u0626\u064A\u0629" : "Causation \xB7 universal hazard probability \xB7 behavior of every flame or mission"}</span></article></div></section>`;
  }
  function bindMeasurementPlotStudio(root, rows, lang2 = "en") {
    const studio = root.querySelector("[data-measurement-plot-studio]");
    if (!studio || !Array.isArray(rows)) return;
    const ar = lang2 === "ar";
    const xSelect = studio.querySelector("[data-plot-x]");
    const ySelect = studio.querySelector("[data-plot-y]");
    const fuelSelect = studio.querySelector("[data-plot-fuel]");
    const outcomeSelect = studio.querySelector("[data-plot-outcome]");
    const fitToggle = studio.querySelector("[data-plot-fit]");
    const plot2 = studio.querySelector("[data-measurement-plot]");
    const summary = studio.querySelector("[data-plot-summary]");
    let zoom = 1;
    [...new Set(rows.map((row) => row.fuel).filter(Boolean))].sort().forEach((fuel) => fuelSelect.add(new Option(fuel, fuel)));
    [...new Set(rows.map((row) => row.test_end).filter(Boolean))].sort().forEach((outcome) => outcomeSelect.add(new Option(outcome, outcome)));
    const draw = () => {
      const xField = FIELDS.find((item) => item.key === xSelect.value);
      const yField = FIELDS.find((item) => item.key === ySelect.value);
      const filtered = rows.filter((row) => (!fuelSelect.value || row.fuel === fuelSelect.value) && (!outcomeSelect.value || row.test_end === outcomeSelect.value));
      const points = filtered.filter((row) => Number.isFinite(row[xField.key]) && Number.isFinite(row[yField.key])).map((row) => ({ row, x: row[xField.key] * xField.scale, y: row[yField.key] * yField.scale }));
      if (points.length < 2) {
        plot2.innerHTML = `<div class="empty">${ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0643\u0627\u0641\u064A\u0629 \u062A\u062D\u062A\u0648\u064A \u0627\u0644\u0642\u064A\u0645\u062A\u064A\u0646 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u062A\u064A\u0646." : "Not enough source rows contain both selected measurements."}</div>`;
        summary.textContent = `${ar ? "\u0635\u0641\u0648\u0641 \u0635\u0627\u0644\u062D\u0629" : "Valid rows"}: n=${points.length}/${filtered.length}`;
        return;
      }
      const width = 820, height = 440, p = { left: 82, right: 24, top: 24, bottom: 70 };
      const xmin = Math.min(...points.map((item) => item.x)), xmax = Math.max(...points.map((item) => item.x));
      const ymin = Math.min(...points.map((item) => item.y)), ymax = Math.max(...points.map((item) => item.y));
      const xpad = (xmax - xmin) * 0.06 || Math.max(Math.abs(xmin) * 0.06, 0.01);
      const ypad = (ymax - ymin) * 0.08 || Math.max(Math.abs(ymin) * 0.08, 0.01);
      const xcenter = (xmin + xmax) / 2, ycenter = (ymin + ymax) / 2;
      const domain = { x0: xcenter - (xmax - xmin + 2 * xpad) / (2 * zoom), x1: xcenter + (xmax - xmin + 2 * xpad) / (2 * zoom), y0: ycenter - (ymax - ymin + 2 * ypad) / (2 * zoom), y1: ycenter + (ymax - ymin + 2 * ypad) / (2 * zoom) };
      const sx = (x) => p.left + (x - domain.x0) / (domain.x1 - domain.x0) * (width - p.left - p.right);
      const sy = (y) => height - p.bottom - (y - domain.y0) / (domain.y1 - domain.y0) * (height - p.top - p.bottom);
      const ticks = Array.from({ length: 6 }, (_, index) => index / 5);
      const grid = ticks.map((ratio) => {
        const x = domain.x0 + (domain.x1 - domain.x0) * ratio, y = domain.y0 + (domain.y1 - domain.y0) * ratio;
        return `<line x1="${sx(x)}" y1="${p.top}" x2="${sx(x)}" y2="${height - p.bottom}" class="chart-gridline"/><line x1="${p.left}" y1="${sy(y)}" x2="${width - p.right}" y2="${sy(y)}" class="chart-gridline"/><text x="${sx(x)}" y="${height - p.bottom + 20}" class="chart-tick" text-anchor="middle">${Number(x.toPrecision(3))}</text><text x="${p.left - 9}" y="${sy(y) + 4}" class="chart-tick" text-anchor="end">${Number(y.toPrecision(3))}</text>`;
      }).join("");
      const groups = [...new Set(points.map(({ row }) => row.fuel || "Unreported"))];
      const palette = ["#1688be", "#d59a3d", "#39a77e", "#7d73d3", "#d36d7c", "#5077a8"];
      const colors = new Map(groups.map((group, index) => [group, palette[index % palette.length]]));
      const marks = points.map(({ row, x, y }) => {
        var _a;
        const details = `${row.id || `Test ${row.test}`} \xB7 ${row.fuel || "Fuel unreported"} \xB7 ${fieldLabel(xField, ar)}: ${Number(x.toPrecision(5))} \xB7 ${fieldLabel(yField, ar)}: ${Number(y.toPrecision(5))} \xB7 O\u2082 ${(row.oxygen_mole_fraction * 100).toFixed(1)}% \xB7 ${(_a = row.pressure_mmHg) != null ? _a : "\u2014"} mmHg \xB7 ${row.test_end || "Outcome unreported"}`;
        return `<circle cx="${sx(x)}" cy="${sy(y)}" r="5" fill="${colors.get(row.fuel || "Unreported")}" fill-opacity=".82" tabindex="0" role="img" aria-label="${esc(details)}"><title>${esc(details)}</title></circle>`;
      }).join("");
      let fitMarkup = "", fitText = ar ? "\u0644\u0645 \u064A\u062D\u0633\u0628 \u062E\u0637 \u0645\u0644\u0627\u0621\u0645\u0629." : "No fit calculated.";
      if (fitToggle.checked) {
        const summaries = [];
        groups.forEach((group) => {
          const subset = points.filter(({ row }) => (row.fuel || "Unreported") === group);
          if (subset.length < 3) return;
          const mx = subset.reduce((sum, point) => sum + point.x, 0) / subset.length;
          const my = subset.reduce((sum, point) => sum + point.y, 0) / subset.length;
          const variance = subset.reduce((sum, point) => sum + (point.x - mx) ** 2, 0);
          if (!variance) return;
          const slope = subset.reduce((sum, point) => sum + (point.x - mx) * (point.y - my), 0) / variance;
          const intercept = my - slope * mx;
          const total = subset.reduce((sum, point) => sum + (point.y - my) ** 2, 0);
          const residual = subset.reduce((sum, point) => sum + (point.y - intercept - slope * point.x) ** 2, 0);
          const r2 = total ? 1 - residual / total : 1;
          const groupMin = Math.min(...subset.map((point) => point.x)), groupMax = Math.max(...subset.map((point) => point.x));
          fitMarkup += `<line x1="${sx(groupMin)}" y1="${sy(intercept + slope * groupMin)}" x2="${sx(groupMax)}" y2="${sy(intercept + slope * groupMax)}" class="chart-trendline" stroke="${colors.get(group)}" visibility="visible"/>`;
          summaries.push(`${group}: R\xB2=${r2.toFixed(3)} (n=${subset.length})`);
        });
        fitText = summaries.length ? `${ar ? "\u0645\u0644\u0627\u0621\u0645\u0629 OLS \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u0648\u062F" : "Exploratory OLS by fuel"} \xB7 ${summaries.join(" \xB7 ")}` : ar ? "\u0644\u0627 \u062A\u0643\u0641\u064A 3 \u0646\u0642\u0627\u0637 \u0628\u0648\u0642\u0648\u062F \u0648\u0627\u062D\u062F \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629." : "No fuel group has at least 3 points for a fit.";
      }
      const legend = groups.map((group) => `<span><i style="--legend-color:${colors.get(group)}"></i>${esc(group)}</span>`).join("");
      plot2.innerHTML = `<div class="chart-legend">${legend}</div><svg class="measurement-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(fieldLabel(xField, ar))} versus ${esc(fieldLabel(yField, ar))}"><g>${grid}</g><line class="chart-axis" x1="${p.left}" y1="${height - p.bottom}" x2="${width - p.right}" y2="${height - p.bottom}"/><line class="chart-axis" x1="${p.left}" y1="${p.top}" x2="${p.left}" y2="${height - p.bottom}"/>${fitMarkup}${marks}<text x="${(p.left + width - p.right) / 2}" y="${height - 15}" class="chart-axis-label" text-anchor="middle">${esc(fieldLabel(xField, ar))}</text><text transform="translate(18 ${(p.top + height - p.bottom) / 2}) rotate(-90)" class="chart-axis-label" text-anchor="middle">${esc(fieldLabel(yField, ar))}</text></svg>`;
      summary.textContent = `${ar ? "\u0635\u0641\u0648\u0641 \u0635\u0627\u0644\u062D\u0629" : "Valid source rows"}: n=${points.length}/${filtered.length} \xB7 ${fitText}`;
    };
    [xSelect, ySelect, fuelSelect, outcomeSelect, fitToggle].forEach((control) => control.addEventListener("change", draw));
    studio.querySelectorAll("[data-plot-action]").forEach((button) => button.addEventListener("click", () => {
      const action = button.dataset.plotAction;
      zoom = action === "zoom-in" ? Math.min(8, zoom * 1.35) : action === "zoom-out" ? Math.max(0.25, zoom / 1.35) : 1;
      draw();
    }));
    draw();
  }

  // public/lib/system-concepts.js
  var copy = {
    en: {
      title: "Research system concepts",
      intro: "Concepts inspired by the Flame in Freefall work. The diagrams explain questions and measurement ideas; they are not qualified hardware or validated suppression systems.",
      model: "HARBOR \xB7 perimeter observation concept",
      modelIntro: "Browse and rotate the original GLB concept models in your browser. The models show research concepts, not qualified hardware.",
      orbit: "Drag to rotate \xB7 scroll to zoom \xB7 use arrow keys to navigate controls",
      spin: "Auto-rotate",
      reset: "Reset camera",
      select: "Choose a 3D concept",
      download: "Download selected GLB",
      gallery: "Download Blender gallery",
      modelLoaded: "3D model ready",
      modelLoading: "Loading 3D model\u2026",
      labelRing: "Perimeter sensor ring",
      labelHood: "Test hood / enclosure",
      labelBase: "Mounting frame",
      concern: "ENGINEERING BOUNDARY",
      concernText: "The current Blender report records about 15 mm minimum sampled surface separation and no sampled BVH overlap for this assembly pose. This is only a visual CAD check; it does not assess manufacturing tolerance, deflection, loads, installation envelope, thermal behavior, or flight qualification.",
      pathway: "2D \xB7 candidate extinction pathways",
      pathwayIntro: "A proposed comparison framework for controlled tests: change one transport or boundary condition at a time and record the response. Pathways below are hypotheses and measurement prompts, not proven suppression outcomes.",
      oxygen: "Oxygen availability",
      oxygenText: "Candidate variable: local oxidizer concentration. Measure concentration and flow independently.",
      flow: "Forced flow",
      flowText: "Candidate variable: imposed ventilation velocity and direction. Do not infer it from flame shape.",
      heat: "Heat transfer",
      heatText: "Candidate response: temperature history and heat loss at defined locations.",
      fuel: "Fuel boundary",
      fuelText: "Candidate variable: fuel form, exposed area, and supply condition, controlled per test protocol.",
      source: "Evidence and design boundary",
      sourceText: "NASA research motivates the scientific questions. These concepts are MORS research proposals; the cited studies did not test or endorse these devices.",
      ntrs: "NASA NTRS \xB7 SoFIE-GEL investigation",
      psi: "NASA PSI \xB7 Combustion Science",
      note: "PSI-69 droplet burning-rate measurements do not validate solid-material behavior or these proposed system concepts.",
      status: "Concept only \xB7 no prototype test or qualification"
    },
    ar: {
      title: "\u062A\u0635\u0627\u0645\u064A\u0645 \u0623\u0646\u0638\u0645\u0629 \u0628\u062D\u062B\u064A\u0629",
      intro: "\u0623\u0641\u0643\u0627\u0631 \u0645\u0633\u062A\u0644\u0647\u0645\u0629 \u0645\u0646 \u0639\u0645\u0644 Flame in Freefall. \u062A\u0634\u0631\u062D \u0627\u0644\u0631\u0633\u0648\u0645\u0627\u062A \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0628\u062D\u062B \u0648\u0623\u0641\u0643\u0627\u0631 \u0627\u0644\u0642\u064A\u0627\u0633\u061B \u0648\u0644\u064A\u0633\u062A \u0639\u062A\u0627\u062F\u0627\u064B \u0645\u0624\u0647\u0644\u0627\u064B \u0623\u0648 \u0623\u0646\u0638\u0645\u0629 \u0625\u062E\u0645\u0627\u062F \u0645\u062B\u0628\u062A\u0629.",
      model: "HARBOR \xB7 \u0645\u0641\u0647\u0648\u0645 \u0631\u0635\u062F \u0645\u062D\u064A\u0637\u064A",
      modelIntro: "\u062A\u0635\u0641\u0651\u062D \u0646\u0645\u0627\u0630\u062C GLB \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0648\u062F\u0648\u0651\u0631\u0647\u0627 \u0641\u064A \u0627\u0644\u0645\u062A\u0635\u0641\u062D. \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0645\u0641\u0627\u0647\u064A\u0645 \u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0639\u062A\u0627\u062F\u0627\u064B \u0645\u0624\u0647\u0644\u0627\u064B.",
      orbit: "\u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062F\u0648\u064A\u0631 \xB7 \u0643\u0628\u0651\u0631 \u0628\u0639\u062C\u0644\u0629 \u0627\u0644\u0641\u0623\u0631\u0629 \xB7 \u0627\u0633\u062A\u062E\u062F\u0645 Tab \u0644\u0644\u062A\u0646\u0642\u0644 \u0628\u064A\u0646 \u0627\u0644\u0623\u0632\u0631\u0627\u0631",
      spin: "\u062A\u062F\u0648\u064A\u0631 \u062A\u0644\u0642\u0627\u0626\u064A",
      reset: "\u0625\u0639\u0627\u062F\u0629 \u0632\u0627\u0648\u064A\u0629 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627",
      select: "\u0627\u062E\u062A\u0631 \u062A\u0635\u0645\u064A\u0645\u0627\u064B \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F",
      download: "\u062A\u0646\u0632\u064A\u0644 \u0646\u0645\u0648\u0630\u062C GLB \u0627\u0644\u0645\u062E\u062A\u0627\u0631",
      gallery: "\u062A\u0646\u0632\u064A\u0644 \u0645\u0639\u0631\u0636 Blender",
      modelLoaded: "\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u062C\u0627\u0647\u0632",
      modelLoading: "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F\u2026",
      labelRing: "\u062D\u0644\u0642\u0629 \u062D\u0633\u0627\u0633\u0627\u062A \u0645\u062D\u064A\u0637\u064A\u0629",
      labelHood: "\u063A\u0637\u0627\u0621 / \u062D\u064A\u0632 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631",
      labelBase: "\u0625\u0637\u0627\u0631 \u062A\u062B\u0628\u064A\u062A",
      concern: "\u062D\u062F\u0648\u062F \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0647\u0646\u062F\u0633\u064A",
      concernText: "\u064A\u0633\u062C\u0644 \u062A\u0642\u0631\u064A\u0631 Blender \u0627\u0644\u062D\u0627\u0644\u064A \u0641\u0627\u0635\u0644\u0627\u064B \u0633\u0637\u062D\u064A\u0627\u064B \u0623\u062F\u0646\u0649 \u064A\u0642\u0627\u0631\u0628 \u0661\u0665 \u0645\u0645 \u062F\u0648\u0646 \u062A\u062F\u0627\u062E\u0644 BVH \u0645\u0631\u0635\u0648\u062F \u0641\u064A \u0648\u0636\u0639\u064A\u0629 \u0627\u0644\u062A\u062C\u0645\u064A\u0639\u0629. \u0647\u0630\u0627 \u0641\u062D\u0635 CAD \u0628\u0635\u0631\u064A \u0641\u0642\u0637\u061B \u0644\u0627 \u064A\u0642\u064A\u0651\u0645 \u0633\u0645\u0627\u062D\u0627\u062A \u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0623\u0648 \u0627\u0644\u0627\u0646\u062D\u0631\u0627\u0641 \u0623\u0648 \u0627\u0644\u0623\u062D\u0645\u0627\u0644 \u0623\u0648 \u062D\u064A\u0632 \u0627\u0644\u062A\u0631\u0643\u064A\u0628 \u0623\u0648 \u0627\u0644\u0633\u0644\u0648\u0643 \u0627\u0644\u062D\u0631\u0627\u0631\u064A \u0623\u0648 \u0627\u0644\u062A\u0623\u0647\u064A\u0644 \u0644\u0644\u0637\u064A\u0631\u0627\u0646.",
      pathway: "\u0662D \xB7 \u0645\u0633\u0627\u0631\u0627\u062A \u0625\u062E\u0645\u0627\u062F \u0645\u062D\u062A\u0645\u0644\u0629",
      pathwayIntro: "\u0625\u0637\u0627\u0631 \u0645\u0642\u0627\u0631\u0646\u0629 \u0645\u0642\u062A\u0631\u062D \u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0645\u0636\u0628\u0648\u0637\u0629: \u062A\u063A\u064A\u064A\u0631 \u0634\u0631\u0637 \u0627\u0646\u062A\u0642\u0627\u0644 \u0623\u0648 \u062D\u062F\u0651\u064A \u0648\u0627\u062D\u062F \u0641\u064A \u0643\u0644 \u0645\u0631\u0629 \u0648\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629. \u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062A \u0623\u062F\u0646\u0627\u0647 \u0641\u0631\u0636\u064A\u0627\u062A \u0648\u0645\u062D\u0641\u0632\u0627\u062A \u0644\u0644\u0642\u064A\u0627\u0633\u060C \u0648\u0644\u064A\u0633\u062A \u0646\u062A\u0627\u0626\u062C \u0625\u062E\u0645\u0627\u062F \u0645\u062B\u0628\u062A\u0629.",
      oxygen: "\u062A\u0648\u0641\u0631 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646",
      oxygenText: "\u0645\u062A\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644: \u062A\u0631\u0643\u064A\u0632 \u0627\u0644\u0645\u0624\u0643\u0633\u062F \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u0642\u0627\u0633 \u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0648\u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0643\u0644\u0651\u064C \u0639\u0644\u0649 \u062D\u062F\u0629.",
      flow: "\u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0642\u0633\u0631\u064A",
      flowText: "\u0645\u062A\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644: \u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0641\u0631\u0648\u0636\u0629 \u0648\u0627\u062A\u062C\u0627\u0647\u0647\u0627. \u0644\u0627 \u064A\u064F\u0633\u062A\u0646\u062A\u062C \u0645\u0646 \u0634\u0643\u0644 \u0627\u0644\u0644\u0647\u0628.",
      heat: "\u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u0629",
      heatText: "\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0645\u062D\u062A\u0645\u0644\u0629: \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u0629 \u0648\u0641\u0642\u062F\u0647\u0627 \u0639\u0646\u062F \u0645\u0648\u0627\u0636\u0639 \u0645\u062D\u062F\u062F\u0629.",
      fuel: "\u062D\u062F\u0648\u062F \u0627\u0644\u0648\u0642\u0648\u062F",
      fuelText: "\u0645\u062A\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644: \u0634\u0643\u0644 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0645\u0633\u0627\u062D\u062A\u0647 \u0627\u0644\u0645\u0643\u0634\u0648\u0641\u0629 \u0648\u0638\u0631\u0648\u0641 \u062A\u063A\u0630\u064A\u062A\u0647\u060C \u0648\u0641\u0642 \u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631.",
      source: "\u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u062D\u062F\u0648\u062F \u0627\u0644\u062A\u0635\u0645\u064A\u0645",
      sourceText: "\u062A\u064F\u0644\u0647\u0645 \u0623\u0628\u062D\u0627\u062B NASA \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0639\u0644\u0645\u064A\u0629. \u0647\u0630\u0647 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u0628\u062D\u062B\u064A\u0629 \u0645\u0646 MORS\u061B \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0644\u0645 \u062A\u062E\u062A\u0628\u0631 \u0647\u0630\u0647 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0648\u0644\u0645 \u062A\u0639\u062A\u0645\u062F\u0647\u0627.",
      ntrs: "NASA NTRS \xB7 \u062A\u062D\u0642\u064A\u0642 SoFIE-GEL",
      psi: "NASA PSI \xB7 \u0639\u0644\u0648\u0645 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642",
      note: "\u0642\u064A\u0627\u0633\u0627\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0627\u062A \u0641\u064A PSI-69 \u0644\u0627 \u062A\u062A\u062D\u0642\u0642 \u0645\u0646 \u0633\u0644\u0648\u0643 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0623\u0648 \u0645\u0646 \u0645\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0629 \u0647\u0646\u0627.",
      status: "\u0645\u0641\u0647\u0648\u0645 \u0641\u0642\u0637 \xB7 \u0644\u0627 \u0627\u062E\u062A\u0628\u0627\u0631 \u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648\u0644\u064A \u0623\u0648 \u062A\u0623\u0647\u064A\u0644"
    }
  };
  async function renderSystemConcepts(lang2 = "en") {
    const x = copy[lang2 === "ar" ? "ar" : "en"];
    const t2 = (key) => x[key];
    await import("/vendor/model-viewer.min.js");
    const response = await fetch("/models/catalog.json");
    if (!response.ok) throw new Error("3D model catalog is unavailable.");
    const models = await response.json();
    const featured = [
      "HARBOR-PERIMETER-SCAN-assembly.glb",
      "HARBOR-perimeter-sensor-ring.glb",
      "HARBOR-DOCK-MIST-robot.glb",
      "PULSE-MIST-cassette.glb",
      "VAPOR-TRACE-spool.glb"
    ];
    const ordered = [
      ...featured.map((name) => models.find((model) => model.file === name)).filter(Boolean),
      ...models.filter((model) => !featured.includes(model.file))
    ];
    const selected = ordered[0];
    return `<div class="system-concepts">
    <div class="page-head"><div><div class="eyebrow">MORS AEGIS \xB7 FLAME IN FREEFALL</div><h2>${t2("title")}</h2><p class="sub">${t2("intro")}</p></div></div>
    <article class="card concept-card"><div class="card-head"><div><h3>${t2("model")}</h3><p class="sub">${t2("modelIntro")}</p></div><span class="concept-badge">${ordered.length} ${lang2 === "ar" ? "\u0646\u0645\u0648\u0630\u062C\u0627\u064B \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F" : "3D models"}</span></div>
      <div class="concept-controls" role="group" aria-label="${t2("model")}"><label class="model-picker">${t2("select")}<select id="conceptModel">${ordered.map((model) => `<option value="${model.file}"${model.file === selected.file ? " selected" : ""}>${model.title}</option>`).join("")}</select></label><button class="outline-btn" type="button" data-model-spin aria-pressed="false">${t2("spin")}</button><button class="quiet-btn" type="button" data-model-reset>${t2("reset")}</button><span class="sub">${t2("orbit")}</span></div>
      <model-viewer id="conceptViewer" class="model-viewer" src="/models/${selected.file}" alt="${selected.title} \u2014 ${t2("status")}" camera-controls shadow-intensity="0.8" exposure="1" interaction-prompt="auto" loading="eager" reveal="auto"></model-viewer>
      <div class="concept-model-meta"><span id="modelStatus" class="sub" role="status" aria-live="polite">${t2("modelLoading")}</span><a id="modelDownload" class="outline-btn" href="/models/${selected.file}" download>${t2("download")}</a><a class="outline-btn" href="/models/FLAME-IN-FREEFALL-3D-GALLERY.blend" download>${t2("gallery")}</a></div>
      <div class="callout warn"><b>${t2("concern")}:</b> ${t2("concernText")} <a href="/models/methods/harbor_perimeter_scan_clearance.json" target="_blank" rel="noopener noreferrer">${lang2 === "ar" ? "\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0641\u062D\u0635" : "View clearance report"} \u2197</a></div></article>
    <article class="card concept-card"><div class="card-head"><div><h3>${t2("pathway")}</h3><p class="sub">${t2("pathwayIntro")}</p></div><span class="concept-badge">${t2("status")}</span></div>
      <svg class="pathway-svg" viewBox="0 0 900 300" role="img" aria-label="${t2("pathway")}"><defs><marker id="pathArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#64bddd"/></marker></defs><rect class="path-core" x="370" y="105" width="160" height="90" rx="20"/><text class="path-core-text" x="450" y="141">${lang2 === "ar" ? "\u062D\u062C\u0645 \u0627\u062E\u062A\u0628\u0627\u0631" : "TEST VOLUME"}</text><text class="path-core-sub" x="450" y="166">${lang2 === "ar" ? "\u0645\u0642\u062A\u0631\u062D \u0644\u0644\u0642\u064A\u0627\u0633" : "PROPOSED MEASUREMENTS"}</text>
      <path class="path-link" d="M365 122 245 72"/><path class="path-link" d="M535 122 655 72"/><path class="path-link" d="M365 178 245 228"/><path class="path-link" d="M535 178 655 228"/>
      <g class="path-node"><rect x="20" y="28" width="230" height="82" rx="14"/><text x="135" y="60">${t2("oxygen")}</text><text class="path-small" x="135" y="83">O\u2082 \xB7 \u0394C (measure)</text></g><g class="path-node"><rect x="650" y="28" width="230" height="82" rx="14"/><text x="765" y="60">${t2("flow")}</text><text class="path-small" x="765" y="83">u \xB7 direction (measure)</text></g><g class="path-node"><rect x="20" y="190" width="230" height="82" rx="14"/><text x="135" y="222">${t2("heat")}</text><text class="path-small" x="135" y="245">T(t) \xB7 q (measure)</text></g><g class="path-node"><rect x="650" y="190" width="230" height="82" rx="14"/><text x="765" y="222">${t2("fuel")}</text><text class="path-small" x="765" y="245">form \xB7 area \xB7 feed</text></g></svg>
      <div class="grid two concept-notes"><div><h4>${t2("oxygen")}</h4><p class="sub">${t2("oxygenText")}</p></div><div><h4>${t2("flow")}</h4><p class="sub">${t2("flowText")}</p></div><div><h4>${t2("heat")}</h4><p class="sub">${t2("heatText")}</p></div><div><h4>${t2("fuel")}</h4><p class="sub">${t2("fuelText")}</p></div></div>
      <div class="list-row"><span>EXTINCTION-PATHWAY-MAP \xB7 GLB</span><a href="/models/EXTINCTION-PATHWAY-MAP-rig.glb" download>${lang2 === "ar" ? "\u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F" : "Download 3D rig"} \u2197</a></div><div class="list-row"><span>EXTINCTION-PATHWAY-MAP \xB7 method</span><a href="/models/methods/extinction_pathway_map_method_ar.md" target="_blank" rel="noopener noreferrer">${lang2 === "ar" ? "\u0627\u0644\u0645\u0646\u0647\u062C \u0648\u0627\u0644\u062D\u062F\u0648\u062F" : "Method and limits"} \u2197</a></div></article>
    <article class="card"><h3>${t2("source")}</h3><p class="sub">${t2("sourceText")}</p>
      <div class="list-row"><span>NASA PSI-25 \xB7 BASS-II</span><a href="https://psi.nasa.gov/physci/repo/investigation/PSI-25" target="_blank" rel="noopener noreferrer">NASA PSI \u2197</a></div>
      <div class="list-row"><span>NASA NTRS 20130000582 \xB7 local jet/wake</span><a href="https://ntrs.nasa.gov/citations/20130000582" target="_blank" rel="noopener noreferrer">NASA NTRS \u2197</a></div>
      <div class="list-row"><span>NASA NTRS 20240007628 \xB7 SoFIE-GEL</span><a href="https://ntrs.nasa.gov/citations/20240007628" target="_blank" rel="noopener noreferrer">NASA NTRS \u2197</a></div>
      <div class="list-row"><span>NASA MIST \xB7 NASA NTRS 20040053582</span><a href="https://ntrs.nasa.gov/citations/20040053582" target="_blank" rel="noopener noreferrer">NASA NTRS \u2197</a></div>
      <div class="list-row"><span>NASA FWM PFE \xB7 NTRS 20110012300</span><a href="https://ntrs.nasa.gov/citations/20110012300" target="_blank" rel="noopener noreferrer">NASA NTRS \u2197</a></div>
      <div class="callout">${t2("note")}</div><a href="/models/methods/harbor_perimeter_scan_method_ar.md" target="_blank" rel="noopener noreferrer">HARBOR measurement method \u2197</a> \xB7 <a href="/models/methods/pulse_mist_method_ar.md" target="_blank" rel="noopener noreferrer">PULSE-MIST method \u2197</a> \xB7 <a href="/models/methods/vapor_trace_method_ar.md" target="_blank" rel="noopener noreferrer">VAPOR-TRACE method \u2197</a></article>
  </div>`;
  }
  function bindSystemConcepts(root, lang2 = "en") {
    const viewer = root.querySelector("#conceptViewer");
    const picker = root.querySelector("#conceptModel");
    const status = root.querySelector("#modelStatus");
    const download2 = root.querySelector("#modelDownload");
    const spin = root.querySelector("[data-model-spin]");
    const reset = root.querySelector("[data-model-reset]");
    if (!viewer || !picker) return;
    const ready = copy[lang2 === "ar" ? "ar" : "en"].modelLoaded;
    const loading = copy[lang2 === "ar" ? "ar" : "en"].modelLoading;
    viewer.addEventListener("load", () => {
      if (status) status.textContent = ready;
    });
    viewer.addEventListener("error", () => {
      if (status)
        status.textContent = lang2 === "ar" ? "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u0627\u0633\u062A\u062E\u062F\u0645 \u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631." : "Could not load this model. Use the direct download link.";
    });
    if (viewer.loaded && status) status.textContent = ready;
    picker.addEventListener("change", () => {
      var _a;
      const file = picker.value;
      viewer.src = `/models/${encodeURIComponent(file)}`;
      viewer.alt = `${((_a = picker.selectedOptions[0]) == null ? void 0 : _a.textContent) || file} \u2014 ${copy[lang2 === "ar" ? "ar" : "en"].status}`;
      if (download2) download2.href = `/models/${encodeURIComponent(file)}`;
      if (status) status.textContent = loading;
    });
    spin == null ? void 0 : spin.addEventListener("click", () => {
      viewer.autoRotate = !viewer.autoRotate;
      spin.setAttribute("aria-pressed", String(viewer.autoRotate));
      spin.classList.toggle("active", viewer.autoRotate);
    });
    reset == null ? void 0 : reset.addEventListener("click", () => {
      viewer.cameraOrbit = "auto auto auto";
      viewer.fieldOfView = "auto";
      viewer.jumpCameraToGoal();
      viewer.resetTurntableRotation();
    });
  }

  // public/lib/model-gallery.js
  var copy2 = {
    en: {
      title: "Interactive 3D model library",
      intro: "Explore all MORS system concepts, what each one is for, and the research question it can help investigate.",
      search: "Search models and descriptions",
      category: "Filter by category",
      all: "All categories",
      shown: "models shown",
      loading: "Loading model\u2026",
      ready: "3D model ready \xB7 drag to rotate \xB7 scroll or pinch to zoom",
      unavailable: "This browser could not start the 3D viewer. The model description and direct download are still available.",
      failed: "Model could not be rendered. Use its direct GLB download.",
      purpose: "What it represents",
      value: "Why it is useful",
      download: "Download GLB",
      viewer: "Interactive 3D view",
      select: "Select any model below to inspect it.",
      noResults: "No models match these filters.",
      catalogError: "The model library could not load. Reload this page to try again.",
      disclaimer: "These are research concepts and visual CAD models, not qualified hardware. The condition controls below change a separate explanatory scene; they do not alter the CAD model or predict fire suppression.",
      conditions: "Illustrative conditions",
      scenarioFor: "Condition scene for selected concept",
      noMeasured: "Schematic only \xB7 not CFD \xB7 not a test result"
    },
    ar: {
      title: "\u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F",
      intro: "\u062A\u0635\u0641\u0651\u062D \u062C\u0645\u064A\u0639 \u0645\u0641\u0627\u0647\u064A\u0645 \u0623\u0646\u0638\u0645\u0629 MORS\u060C \u0648\u0627\u0644\u063A\u0631\u0636 \u0645\u0646 \u0643\u0644 \u0646\u0645\u0648\u0630\u062C\u060C \u0648\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u0628\u062D\u062B\u064A \u0627\u0644\u0630\u064A \u0642\u062F \u064A\u0633\u0627\u0639\u062F \u0641\u064A \u062F\u0631\u0627\u0633\u062A\u0647.",
      search: "\u0627\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0648\u0627\u0644\u0634\u0631\u0648\u062D",
      category: "\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629",
      all: "\u0643\u0644 \u0627\u0644\u0641\u0626\u0627\u062A",
      shown: "\u0646\u0645\u0648\u0630\u062C \u0645\u0639\u0631\u0648\u0636",
      loading: "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C\u2026",
      ready: "\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u062C\u0627\u0647\u0632 \xB7 \u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062F\u0648\u064A\u0631 \xB7 \u0643\u0628\u0651\u0631 \u0628\u0627\u0644\u0639\u062C\u0644\u0629 \u0623\u0648 \u0628\u0625\u0635\u0628\u0639\u064A\u0646",
      unavailable: "\u062A\u0639\u0630\u0631 \u062A\u0634\u063A\u064A\u0644 \u0639\u0627\u0631\u0636 3D \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D. \u064A\u0628\u0642\u0649 \u0627\u0644\u0634\u0631\u062D \u0648\u0627\u0644\u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0645\u062A\u0627\u062D\u064A\u0646.",
      failed: "\u062A\u0639\u0630\u0631 \u0639\u0631\u0636 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u0627\u0633\u062A\u062E\u062F\u0645 \u0631\u0627\u0628\u0637 \u062A\u0646\u0632\u064A\u0644 GLB \u0627\u0644\u0645\u0628\u0627\u0634\u0631.",
      purpose: "\u0645\u0627\u0630\u0627 \u064A\u0645\u062B\u0651\u0644",
      value: "\u0645\u0627 \u0641\u0627\u0626\u062F\u062A\u0647 \u0627\u0644\u0628\u062D\u062B\u064A\u0629",
      download: "\u062A\u0646\u0632\u064A\u0644 GLB",
      viewer: "\u0639\u0631\u0636 \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u062A\u0641\u0627\u0639\u0644\u064A",
      select: "\u0627\u062E\u062A\u0631 \u0623\u064A \u0646\u0645\u0648\u0630\u062C \u0623\u062F\u0646\u0627\u0647 \u0644\u0645\u0639\u0627\u064A\u0646\u062A\u0647.",
      noResults: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u0645\u0627\u0630\u062C \u062A\u0637\u0627\u0628\u0642 \u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629.",
      catalogError: "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C. \u0623\u0639\u062F \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0644\u0645\u062D\u0627\u0648\u0644\u0629.",
      disclaimer: "\u0647\u0630\u0647 \u0645\u0641\u0627\u0647\u064A\u0645 \u0628\u062D\u062B\u064A\u0629 \u0648\u0646\u0645\u0627\u0630\u062C CAD \u0628\u0635\u0631\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0645\u0639\u062F\u0627\u062A \u0645\u0624\u0647\u0644\u0629. \u062A\u063A\u064A\u0651\u0631 \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629 \u0623\u062F\u0646\u0627\u0647 \u0645\u0634\u0647\u062F\u0627\u064B \u062A\u0641\u0633\u064A\u0631\u064A\u0627\u064B \u0645\u0646\u0641\u0635\u0644\u0627\u064B\u061B \u0648\u0644\u0627 \u062A\u0639\u062F\u0651\u0644 \u0646\u0645\u0648\u0630\u062C CAD \u0648\u0644\u0627 \u062A\u062A\u0646\u0628\u0623 \u0628\u0625\u062E\u0645\u0627\u062F \u0627\u0644\u062D\u0631\u064A\u0642.",
      conditions: "\u062D\u0627\u0644\u0627\u062A \u062A\u0648\u0636\u064A\u062D\u064A\u0629",
      scenarioFor: "\u0645\u0634\u0647\u062F \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0644\u0644\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u0645\u062D\u062F\u062F",
      noMeasured: "\u0631\u0633\u0645 \u062A\u062E\u0637\u064A\u0637\u064A \u0641\u0642\u0637 \xB7 \u0644\u064A\u0633 CFD \xB7 \u0648\u0644\u064A\u0633 \u0646\u062A\u064A\u062C\u0629 \u0627\u062E\u062A\u0628\u0627\u0631"
    }
  };
  var escPath = (file) => `/models/${encodeURIComponent(file)}`;
  async function renderModelGallery(lang2 = "en") {
    const ar = lang2 === "ar";
    const t2 = copy2[ar ? "ar" : "en"];
    let models;
    let descriptions;
    let viewerAvailable = true;
    try {
      const [catalogResponse, descriptionsResponse] = await Promise.all([
        fetch("/models/catalog.json"),
        fetch("/models/descriptions.json")
      ]);
      if (!catalogResponse.ok || !descriptionsResponse.ok) throw new Error("Model catalogue request failed.");
      [models, descriptions] = await Promise.all([catalogResponse.json(), descriptionsResponse.json()]);
      if (!Array.isArray(models) || models.length === 0 || models.some((model) => !descriptions[model.file]))
        throw new Error("Model catalogue is incomplete.");
    } catch (e) {
      return `${pageHead(t2.title, t2.catalogError)}<div class="callout warn" role="alert">${t2.catalogError}</div>`;
    }
    try {
      await import("/vendor/model-viewer.min.js");
    } catch (e) {
      viewerAvailable = false;
    }
    const categories = [
      ...new Set(models.map((model) => descriptions[model.file][ar ? "categoryAr" : "categoryEn"]))
    ].sort();
    const first = models[0];
    const initial = descriptions[first.file];
    const itemCards = models.map((model) => {
      const detail = descriptions[model.file];
      const title = model.title.replace(/-/g, " ");
      const category = detail[ar ? "categoryAr" : "categoryEn"];
      const value = detail[ar ? "valueAr" : "valueEn"];
      const search = `${title} ${detail.categoryEn} ${detail.categoryAr} ${detail.purposeEn} ${detail.purposeAr} ${detail.valueEn} ${detail.valueAr}`;
      const selected = model.file === first.file;
      return `<button class="model-gallery-item${selected ? " selected" : ""}" type="button" data-model-file="${esc(model.file)}" data-model-title="${esc(title)}" data-category-en="${esc(detail.categoryEn)}" data-category-ar="${esc(detail.categoryAr)}" data-purpose-en="${esc(detail.purposeEn)}" data-purpose-ar="${esc(detail.purposeAr)}" data-value-en="${esc(detail.valueEn)}" data-value-ar="${esc(detail.valueAr)}" data-search="${esc(search.toLocaleLowerCase())}" data-category="${esc(detail.categoryEn)}" aria-pressed="${selected}"><span class="model-gallery-item-top"><b>${esc(title)}</b><small>${esc(category)}</small></span><span class="model-gallery-item-summary">${esc(value)}</span></button>`;
    }).join("");
    return `<div class="model-gallery">
    ${pageHead(t2.title, t2.intro)}
    <div class="callout model-gallery-boundary">${t2.disclaimer}</div>
    <section class="card model-inspector" aria-label="${esc(t2.viewer)}">
      <div class="model-inspector-viewer">
        <div class="card-head"><div><h2 id="galleryModelTitle">${esc(first.title.replace(/-/g, " "))}</h2><p class="sub">${t2.viewer}</p></div><span class="concept-badge">${models.length} ${ar ? "\u0646\u0645\u0648\u0630\u062C\u0627\u064B" : "models"}</span></div>
        <model-viewer id="galleryModelViewer" class="model-viewer" src="${escPath(first.file)}" alt="${esc(first.title)}" camera-controls shadow-intensity="0.8" exposure="1" interaction-prompt="auto" loading="eager" reveal="auto"></model-viewer>
        <div class="concept-model-meta"><span id="galleryModelStatus" class="sub" role="status" aria-live="polite">${viewerAvailable ? t2.loading : t2.unavailable}</span><a id="galleryModelDownload" class="outline-btn" href="${escPath(first.file)}" download>${t2.download}</a></div>
      </div>
      <div class="model-inspector-details">
        <div><span class="eyebrow" id="galleryModelCategory">${esc(initial[ar ? "categoryAr" : "categoryEn"])}</span><h3>${t2.purpose}</h3><p id="galleryModelPurpose" class="sub">${esc(initial[ar ? "purposeAr" : "purposeEn"])}</p></div>
        <div><h3>${t2.value}</h3><p id="galleryModelValue" class="sub">${esc(initial[ar ? "valueAr" : "valueEn"])}</p></div>
      </div>
    </section>
    <section class="model-scenario-wrap"><div class="model-scenario-heading"><div><span class="eyebrow">${t2.conditions}</span><p id="modelScenarioSelection" class="sub">${t2.scenarioFor}: ${esc(first.title.replace(/-/g, " "))}</p></div><span class="concept-badge">${t2.noMeasured}</span></div>${flameScene3d(lang2)}</section>
    <section class="card model-catalog" aria-label="${esc(t2.title)}">
      <div class="card-head"><div><h2>${ar ? "\u0643\u0644 \u0627\u0644\u0646\u0645\u0627\u0630\u062C" : "Browse every model"}</h2><p id="modelGalleryCount" class="sub">${models.length} ${t2.shown}</p></div></div>
      <div class="model-gallery-filters"><label>${t2.search}<input id="modelGallerySearch" type="search" autocomplete="off" placeholder="${esc(t2.search)}"></label><label>${t2.category}<select id="modelGalleryCategory"><option value="">${t2.all}</option>${categories.map((category) => `<option value="${esc(descriptions[models.find((item) => descriptions[item.file][ar ? "categoryAr" : "categoryEn"] === category).file].categoryEn)}">${esc(category)}</option>`).join("")}</select></label></div>
      <div id="modelGalleryEmpty" class="callout" hidden>${t2.noResults}</div>
      <div id="modelGalleryItems" class="model-gallery-grid">${itemCards}</div>
    </section>
  </div>`;
  }
  function bindModelGallery(root, lang2 = "en") {
    var _a;
    const ar = lang2 === "ar";
    const t2 = copy2[ar ? "ar" : "en"];
    const viewer = root.querySelector("#galleryModelViewer");
    const status = root.querySelector("#galleryModelStatus");
    const scenarioSelection = root.querySelector("#modelScenarioSelection");
    const download2 = root.querySelector("#galleryModelDownload");
    const search = root.querySelector("#modelGallerySearch");
    const category = root.querySelector("#modelGalleryCategory");
    const items = [...root.querySelectorAll(".model-gallery-item")];
    const empty = root.querySelector("#modelGalleryEmpty");
    const count = root.querySelector("#modelGalleryCount");
    bindFlameScene3d(root, lang2);
    if (!viewer || !items.length) return;
    if (!((_a = window.customElements) == null ? void 0 : _a.get("model-viewer"))) {
      if (status) status.textContent = t2.unavailable;
    } else {
      viewer.addEventListener("load", () => {
        if (status) status.textContent = t2.ready;
      });
      viewer.addEventListener("error", () => {
        if (status) status.textContent = t2.failed;
      });
      if (viewer.loaded && status) status.textContent = t2.ready;
    }
    const filter = () => {
      const query = ((search == null ? void 0 : search.value) || "").trim().toLocaleLowerCase();
      const selectedCategory = (category == null ? void 0 : category.value) || "";
      let visible = 0;
      for (const item of items) {
        const matches = (!query || item.dataset.search.includes(query)) && (!selectedCategory || item.dataset.category === selectedCategory);
        item.hidden = !matches;
        if (matches) visible++;
      }
      if (count) count.textContent = `${visible} ${t2.shown}`;
      if (empty) empty.hidden = visible > 0;
    };
    search == null ? void 0 : search.addEventListener("input", filter);
    category == null ? void 0 : category.addEventListener("change", filter);
    for (const item of items) {
      item.addEventListener("click", () => {
        var _a2;
        const file = item.dataset.modelFile;
        const title = item.dataset.modelTitle || file;
        const path = escPath(file);
        for (const candidate of items) {
          candidate.setAttribute("aria-pressed", candidate === item ? "true" : "false");
          candidate.classList.toggle("selected", candidate === item);
        }
        root.querySelector("#galleryModelTitle").textContent = title;
        root.querySelector("#galleryModelCategory").textContent = item.dataset[ar ? "categoryAr" : "categoryEn"];
        root.querySelector("#galleryModelPurpose").textContent = item.dataset[ar ? "purposeAr" : "purposeEn"];
        root.querySelector("#galleryModelValue").textContent = item.dataset[ar ? "valueAr" : "valueEn"];
        if (scenarioSelection) scenarioSelection.textContent = `${t2.scenarioFor}: ${title}`;
        if (download2) download2.href = path;
        if (viewer && ((_a2 = window.customElements) == null ? void 0 : _a2.get("model-viewer"))) {
          if (status) status.textContent = t2.loading;
          viewer.alt = title;
          viewer.src = path;
        }
      });
    }
  }

  // public/lib/judging-trail.js
  function judgingTrail(evidence, lang2 = "en") {
    const ar = lang2 === "ar";
    const inventoryCount = esc(evidence.officialInventory.total);
    const tableCount = esc(evidence.investigations.length);
    const rowCount = esc(evidence.recordCountAcrossFiles);
    const steps = ar ? [
      {
        number: "01",
        title: "\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u062F\u0644\u064A\u0644",
        body: `\u0627\u0628\u062F\u0623 \u0628\u0641\u0647\u0631\u0633 NASA PSI: ${inventoryCount} \u062A\u062D\u0642\u064A\u0642\u0627\u064B\u060C \u0645\u0646\u0647\u0627 ${tableCount} \u062C\u062F\u0627\u0648\u0644 \u0623\u0635\u0644\u064A\u0629 \u0645\u0631\u0641\u0642\u0629 \u0628\u0628\u0635\u0645\u0627\u062A \u062A\u062D\u0642\u0642. \u0643\u0644 \u062F\u0631\u0627\u0633\u0629 \u062A\u0628\u0642\u0649 \u0645\u0633\u062A\u0642\u0644\u0629.`,
        action: "\u0627\u0641\u062A\u062D \u0641\u0647\u0631\u0633 \u0627\u0644\u0623\u062F\u0644\u0629 \u2190",
        page: "Challenge Evidence"
      },
      {
        number: "02",
        title: "\u0627\u0641\u062D\u0635 \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A",
        body: `\u0627\u0633\u062A\u0643\u0634\u0641 ${rowCount} \u0635\u0641 \u0645\u0635\u062F\u0631 \u0639\u0628\u0631 \u0645\u062E\u0637\u0637\u0627\u062A \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0628\u062D\u0633\u0628 \u0627\u0644\u062F\u0631\u0627\u0633\u0629\u060C \u0648\u0627\u0641\u062A\u062D \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0646\u0642\u0637\u0629 \u0648\u0638\u0631\u0648\u0641\u0647\u0627 \u062F\u0648\u0646 \u062F\u0645\u062C \u062A\u062C\u0627\u0631\u0628 \u0645\u062E\u062A\u0644\u0641\u0629.`,
        action: "\u0627\u0639\u0631\u0636 \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A \u2190",
        page: "Chart Guide"
      },
      {
        number: "03",
        title: "\u062D\u0648\u0651\u0644\u0647\u0627 \u0625\u0644\u0649 \u0633\u0624\u0627\u0644",
        body: "\u0627\u0631\u0628\u0637 \u0645\u0627 \u062A\u062F\u0639\u0645\u0647 \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A \u0628\u0623\u0633\u0626\u0644\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u062D\u0648\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0643\u0634\u0641 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F. \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0647\u0646\u062F\u0633\u064A\u0629 \u0641\u0631\u0636\u064A\u0627\u062A \u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0639\u062A\u0627\u062F\u0627\u064B \u0645\u0639\u062A\u0645\u062F\u0627\u064B.",
        action: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u2190",
        page: "Safety Insights",
        extraAction: "\u0634\u0627\u0647\u062F \u0645\u0641\u0627\u0647\u064A\u0645 3D",
        extraPage: "3D Models"
      }
    ] : [
      {
        number: "01",
        title: "Find the evidence",
        body: `Start with the NASA PSI index: ${inventoryCount} investigations, including ${tableCount} bundled original tables with verified hashes. Each study stays separate.`,
        action: "Open source evidence \u2192",
        page: "Challenge Evidence"
      },
      {
        number: "02",
        title: "Inspect measurements",
        body: `Explore ${rowCount} source rows through study-specific interactive plots; inspect point details and conditions without pooling unlike experiments.`,
        action: "Open interactive plots \u2192",
        page: "Chart Guide"
      },
      {
        number: "03",
        title: "Turn evidence into a question",
        body: "Connect what measurements support to testable questions about materials, detection, and suppression. Engineering concepts remain research hypotheses, not qualified hardware.",
        action: "Open bounded safety questions \u2192",
        page: "Safety Insights",
        extraAction: "Explore 3D concepts",
        extraPage: "3D Models"
      }
    ];
    const heading = ar ? "\u0645\u0633\u0627\u0631 \u0639\u0631\u0636 \u062A\u062D\u0643\u064A\u0645\u064A \xB7 \u0669\u0660 \u062B\u0627\u0646\u064A\u0629" : "90-second judging path";
    const intro = ar ? "\u062B\u0644\u0627\u062B \u062E\u0637\u0648\u0627\u062A \u062A\u064F\u0638\u0647\u0631 \u0643\u064A\u0641 \u064A\u0646\u062A\u0642\u0644 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0646 \u0645\u0635\u062F\u0631 NASA \u0625\u0644\u0649 \u0641\u062D\u0635 \u0627\u0644\u0642\u064A\u0627\u0633 \u062B\u0645 \u0625\u0644\u0649 \u0633\u0624\u0627\u0644 \u0633\u0644\u0627\u0645\u0629 \u0642\u0627\u0628\u0644 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631." : "Three short stops show how the project moves from NASA sources to inspected measurements to a testable safety question.";
    const pitch = ar ? "\u062A\u0645\u064A\u0651\u0632\u0646\u0627: \u0646\u062C\u0639\u0644 \u062F\u0644\u064A\u0644 NASA \u0642\u0627\u0628\u0644\u0627\u064B \u0644\u0644\u062A\u062A\u0628\u0639 \u0645\u0646 \u0635\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0625\u0644\u0649 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u060C \u062B\u0645 \u0646\u0648\u0636\u062D \u062D\u062F\u0648\u062F\u0647 \u0642\u0628\u0644 \u0635\u064A\u0627\u063A\u0629 \u0633\u0624\u0627\u0644 \u0647\u0646\u062F\u0633\u064A." : "Our edge: trace NASA evidence from source row through analysis, make its limits visible, then frame a testable engineering question.";
    return `<section class="card judging-trail" aria-labelledby="judgingTrailTitle">
    <div class="card-head"><div><span class="eyebrow">MORS AEGIS \xB7 LIVE DEMO</span><h2 id="judgingTrailTitle">${heading}</h2><p class="sub">${intro}</p></div><span class="tag">90 s</span></div>
    <div class="grid three judging-trail-steps">${steps.map(
      (step) => `<article class="judging-trail-step"><span class="stepnum">${step.number}</span><h3>${step.title}</h3><p class="sub">${step.body}</p><button class="outline-btn" data-go="${esc(step.page)}">${step.action}</button>${step.extraAction ? `<button class="text-btn" data-go="${esc(step.extraPage)}">${step.extraAction} \u2192</button>` : ""}</article>`
    ).join("")}</div>
    <p class="callout judging-trail-pitch">${pitch}</p>
  </section>`;
  }

  // public/lib/theme-accent.js
  var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  function normalizeHexColor(value) {
    if (typeof value !== "string") return null;
    const match = value.trim().match(/^#?([\da-f]{3}|[\da-f]{6})$/i);
    if (!match) return null;
    const hex = match[1].length === 3 ? [...match[1]].map((x) => x + x).join("") : match[1];
    return `#${hex.toLowerCase()}`;
  }
  function rgb(hex) {
    return normalizeHexColor(hex).slice(1).match(/.{2}/g).map((part) => parseInt(part, 16) / 255);
  }
  function luminance(hex) {
    const channels = rgb(hex).map(
      (channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
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
      if (max === r) h = (g - b) / delta % 6;
      else if (max === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      h = (h * 60 + 360) % 360;
    }
    return [h, s, l];
  }
  function fromHsl(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(h / 60 % 2 - 1));
    const m = l - c / 2;
    const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return `#${[r, g, b].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, "0")).join("")}`;
  }
  function accessibleAccent(value, surfaces) {
    var _a, _b;
    const normalized = normalizeHexColor(value);
    if (!normalized || !Array.isArray(surfaces) || !surfaces.length) return null;
    const backgrounds = surfaces.map(normalizeHexColor);
    if (backgrounds.some((background) => !background)) return null;
    const passes = (color) => backgrounds.every((background) => contrast(color, background) >= 4.5);
    if (passes(normalized)) return normalized;
    const [h, s, l] = toHsl(normalized);
    const candidates = [];
    for (let lightness = 0.08; lightness <= 0.92; lightness += 5e-3) {
      const saturation = s < 0.08 ? 0 : clamp(Math.max(s, 0.56), 0, 1);
      const candidate = fromHsl(h, saturation, lightness);
      if (passes(candidate)) candidates.push({ color: candidate, distance: Math.abs(lightness - l) });
    }
    candidates.sort((a, b) => a.distance - b.distance);
    return (_b = (_a = candidates[0]) == null ? void 0 : _a.color) != null ? _b : null;
  }

  // public/app.js
  var nav = [
    ["Overview", "Challenge overview", "\u2302", "COMMAND"],
    ["Flame Lab", "Interactive flame physics & scenarios", "\u223F", "SCIENCE"],
    ["Mission Lab", "Target environments & evidence fit", "\u2295", "SCIENCE"],
    ["Mission Atmospheres", "Oxygen, pressure & EVA transitions", "\u25C9", "SCIENCE"],
    ["Safety Insights", "Prevention, detection & suppression", "\u25C7", "SCIENCE"],
    ["System Concepts", "HARBOR observation concept & microgravity fire-response map", "\u2318", "SCIENCE"],
    ["3D Models", "Interactive models, research purposes & scenario controls", "\u2B21", "SCIENCE"],
    ["Mission Lessons", "NASA incidents & technology transfer", "\u2301", "SCIENCE"],
    ["Challenge Evidence", "Dataset Explorer \xB7 NASA PSI source tables", "\u25A4", "SCIENCE"],
    ["Investigation Lab", "Study-specific NASA PSI evidence summaries", "\u25C9", "ANALYSIS"],
    ["Analysis Workbench", "FLEX-only descriptive analysis", "\u2211", "ANALYSIS"],
    ["Chart Guide", "Chart purposes, variables & limits", "\u25A5", "ANALYSIS"],
    ["Comparison Studio", "Compare matched FLEX tests", "\u25EB", "ANALYSIS"],
    ["Project Video", "30-second English project film", "\u25B6", "RESEARCH"],
    ["AI Copilot", "Evidence-grounded research assistant", "\u2727", "RESEARCH"],
    ["Sources", "NASA PSI sources & methods", "\u25CE", "RESEARCH"],
    ["Reports", "Scientific reports & exports", "\u2197", "RESEARCH"],
    ["Settings", "Language & appearance", "\u2699", "SYSTEM"]
  ];
  function pageFromHash() {
    try {
      const requested = decodeURIComponent(location.hash.slice(1));
      return nav.some(([name]) => name === requested) || requested === "Flame Physics" ? requested : "Overview";
    } catch (e) {
      return "Overview";
    }
  }
  function storageGet(key, fallback = null) {
    var _a;
    try {
      return (_a = window.localStorage.getItem(key)) != null ? _a : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
    }
  }
  var current = pageFromHash();
  var lang = storageGet("mors-lang", "en");
  var theme = storageGet("mors-theme", "arctic");
  var dataset = null;
  var analysis = null;
  var chatThread = [];
  var chatBusy = false;
  var navigationId = 0;
  try {
    const saved = JSON.parse(storageGet("mors-chat-v1", "[]"));
    if (Array.isArray(saved))
      chatThread = saved.filter((m) => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string").slice(-60).map((m) => ({
        role: m.role,
        content: m.content.slice(0, 8e3),
        provider: typeof m.provider === "string" ? m.provider.slice(0, 120) : "",
        citation: m.role === "assistant" ? "/psi-69" : "",
        toolsExecuted: Array.isArray(m.toolsExecuted) ? m.toolsExecuted.slice(0, 3).filter(
          (x) => x && ["runAnalysis", "compareExperiments", "pearson", "lookupExperiment"].includes(x.tool) && x.status === "complete"
        ).map((x) => ({
          tool: x.tool,
          status: "complete",
          evidence: x.tool === "lookupExperiment" ? "OBSERVED" : "COMPUTED",
          resultSha256: typeof x.resultSha256 === "string" ? x.resultSha256.slice(0, 64) : ""
        })) : []
      }));
  } catch (e) {
    chatThread = [];
  }
  var t = (a, b) => lang === "ar" ? b : a;
  var navArabic = {
    Overview: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629",
    "Flame Lab": "\u0645\u062E\u062A\u0628\u0631 \u0627\u0644\u0644\u0647\u0628",
    "Flame Physics": "\u0641\u064A\u0632\u064A\u0627\u0621 \u0627\u0644\u0644\u0647\u0628",
    "Mission Lab": "\u0645\u062E\u062A\u0628\u0631 \u0627\u0644\u0645\u0647\u0645\u0627\u062A",
    "Mission Atmospheres": "\u0623\u062C\u0648\u0627\u0621 \u0627\u0644\u0645\u0647\u0645\u0627\u062A",
    "Safety Insights": "\u0631\u0624\u0649 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u064A\u0642",
    "System Concepts": "\u062A\u0635\u0627\u0645\u064A\u0645 \u0627\u0644\u0623\u0646\u0638\u0645\u0629",
    "3D Models": "\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F",
    "Mission Lessons": "\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0647\u0645\u0627\u062A \u0648\u0627\u0644\u062A\u0642\u0646\u064A\u0629",
    "Challenge Evidence": "\u0645\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",
    "Investigation Lab": "\u0645\u062E\u062A\u0628\u0631 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A",
    "Analysis Workbench": "\u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644",
    "Chart Guide": "\u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A",
    "Comparison Studio": "\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u0628",
    "Project Video": "\u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    "AI Copilot": "\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0623\u0628\u062D\u0627\u062B",
    Sources: "\u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0648\u0627\u0644\u0645\u0646\u0647\u062C\u064A\u0629",
    Reports: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",
    Settings: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"
  };
  var sectionArabic = {
    COMMAND: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
    SCIENCE: "\u0627\u0644\u0639\u0644\u0645",
    ANALYSIS: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644",
    RESEARCH: "\u0627\u0644\u0628\u062D\u062B",
    SYSTEM: "\u0627\u0644\u0646\u0638\u0627\u0645"
  };
  var pageLabel = (key) => lang === "ar" ? navArabic[key] || key : key;
  function setTheme() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $("#langBtn").textContent = lang === "ar" ? "English" : "\u0639\u0631\u0628\u064A";
    document.body.className = (theme === "space" ? "theme-space" : theme === "observatory" ? "theme-observatory" : "") + (lang === "ar" ? " rtl" : "");
    const customAccent = normalizeHexColor(storageGet("mors-custom-accent", ""));
    if (customAccent) {
      const css = getComputedStyle(document.body);
      const accent = accessibleAccent(customAccent, [css.getPropertyValue("--surface").trim(), css.getPropertyValue("--surface2").trim()]);
      if (accent) {
        document.body.style.setProperty("--accent", accent);
        document.body.style.setProperty("--link", accent);
        document.body.style.setProperty("--eyebrow", accent);
      }
    } else {
      for (const property of ["--accent", "--link", "--eyebrow"]) document.body.style.removeProperty(property);
    }
    $("#themeBtn").textContent = t(
      "Theme \xB7 " + { arctic: "Arctic", space: "Deep Space", observatory: "Observatory" }[theme],
      "\u0627\u0644\u0645\u0638\u0647\u0631 \xB7 " + { arctic: "\u0642\u0637\u0628\u064A", space: "\u0641\u0636\u0627\u0621 \u0639\u0645\u064A\u0642", observatory: "\u0645\u0631\u0635\u062F" }[theme]
    );
    $("#navSearch").setAttribute("aria-label", t("Find a page", "\u0627\u0628\u062D\u062B \u0639\u0646 \u0635\u0641\u062D\u0629"));
    $("#navSearch").placeholder = t("Find a page\u2026", "\u0627\u0628\u062D\u062B \u0639\u0646 \u0635\u0641\u062D\u0629\u2026");
  }
  function accentPickerMarkup(id) {
    const ar = lang === "ar";
    const custom = normalizeHexColor(storageGet("mors-custom-accent", "")) || "#38b9e8";
    return `<div class="custom-accent"><label for="${id}"><b>${ar ? "\u0627\u062E\u062A\u0631 \u0644\u0648\u0646 \u0627\u0644\u0644\u0645\u0633\u0627\u062A" : "Choose an accent color"}</b><input id="${id}" type="color" value="${custom}" aria-label="${ar ? "\u0644\u0648\u0646 \u0627\u0644\u0644\u0645\u0633\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635" : "Custom accent color"}" data-accent-picker></label><p class="sub">${ar ? "\u064A\u062A\u0643\u064A\u0641 \u0627\u0644\u0644\u0648\u0646 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0648\u0636\u0648\u062D \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0648\u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646. \u0644\u0627 \u062A\u062A\u063A\u064A\u0631 \u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0645\u0639\u0627\u0646\u064A\u0647\u0627." : "The accent adjusts automatically for readable links and headings. Scientific series colors and their meanings stay unchanged."}</p><button class="quiet-btn" type="button" data-accent-reset>${ar ? "\u0625\u0639\u0627\u062F\u0629 \u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u0646\u0645\u0637" : "Reset theme colors"}</button></div>`;
  }
  function renderNav() {
    const n = $("#nav");
    const search = $("#navSearch");
    const entries = filterNavEntries(nav, search.value, navArabic);
    if (!entries.length) {
      n.innerHTML = `<div class="nav-empty" role="status">${t("No pages match this search.", "\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u062D\u0627\u062A \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0628\u062D\u062B.")}</div><button class="nav-clear" type="button">${t("Clear search", "\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B")}</button>`;
      n.querySelector(".nav-clear").onclick = () => {
        search.value = "";
        renderNav();
        search.focus();
      };
      return;
    }
    let group = "";
    n.innerHTML = entries.map(([k, label, ico, section]) => {
      const heading = section !== group ? `<div class="nav-group">${lang === "ar" ? sectionArabic[section] : section}</div>` : "";
      group = section;
      return `${heading}<button data-page="${k}" title="${esc(lang === "ar" ? label : navArabic[k] || label)}" ${current === k ? 'aria-current="page"' : ""} class="${current === k ? "active" : ""}"><span class="nav-icon">${ico}</span>${esc(lang === "ar" ? navArabic[k] || label : label)}</button>`;
    }).join("");
    n.querySelectorAll("button").forEach((b) => b.onclick = () => go(b.dataset.page));
  }
  function bindNavigationSearch() {
    const search = $("#navSearch");
    search.addEventListener("input", renderNav);
    search.addEventListener("keydown", (event) => {
      var _a;
      if (event.key === "Enter") {
        event.preventDefault();
        (_a = $("#nav [data-page]")) == null ? void 0 : _a.click();
      } else if (event.key === "Escape") {
        event.preventDefault();
        search.value = "";
        renderNav();
        search.blur();
      }
    });
    document.addEventListener("keydown", (event) => {
      var _a;
      const target = event.target;
      const editing = (_a = target == null ? void 0 : target.matches) == null ? void 0 : _a.call(target, 'input, textarea, select, [contenteditable="true"]');
      if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !editing) {
        event.preventDefault();
        search.focus();
      }
    });
  }
  function rowsTable(rows) {
    return `<div class="table-wrap"><table><thead><tr><th>${t("Test ID", "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631")}</th><th>${t("Date \xB7 UTC", "\u0627\u0644\u062A\u0627\u0631\u064A\u062E \xB7 UTC")}</th><th>${t("Fuel", "\u0627\u0644\u0648\u0642\u0648\u062F")}</th><th>${t("Pressure \xB7 mmHg", "\u0627\u0644\u0636\u063A\u0637 \xB7 mmHg")}</th><th>O\u2082</th><th>CO\u2082</th><th>He</th><th>${t("Droplet \xB7 mm", "\u0627\u0644\u0642\u0637\u0631\u0629 \xB7 mm")}</th><th>${t("Extinction \xB7 mm", "\u0627\u0644\u0625\u062E\u0645\u0627\u062F \xB7 mm")}</th><th>${t("Burn-rate constant \xB7 mm\xB2/s", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \xB7 mm\xB2/s")}</th><th>${t("Burn \xB7 s", "\u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \xB7 s")}</th><th>${t("End state", "\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629")}</th></tr></thead><tbody>${rows.map((r) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return `<tr><td class="mono">${esc(r.id)}</td><td>${esc(r.date)} <span class="mono">${esc(r.time_utc)}</span></td><td>${esc(r.fuel)}</td><td>${esc((_a = r.pressure_mmHg) != null ? _a : "\u2014")}</td><td>${esc((_b = r.oxygen_mole_fraction) != null ? _b : "\u2014")}</td><td>${esc((_c = r.carbon_dioxide_mole_fraction) != null ? _c : "\u2014")}</td><td>${esc((_d = r.helium_mole_fraction) != null ? _d : "\u2014")}</td><td>${esc((_e = r.initial_droplet_diameter_mm) != null ? _e : "\u2014")}</td><td>${esc((_f = r.visible_flame_extinction_diameter_mm) != null ? _f : "\u2014")}</td><td>${esc((_g = r.burning_rate_mm_s) != null ? _g : "\u2014")}</td><td>${esc((_h = r.burn_time_s) != null ? _h : "\u2014")}</td><td>${esc(r.test_end)}</td></tr>`;
    }).join("")}</tbody></table></div>`;
  }
  function hero() {
    return `<div class="hero"><div class="hero-copy"><div class="eyebrow">MORS AEGIS \xB7 FLAME IN FREEFALL</div><h2>${t("A source-linked workspace for spaceflight fire-safety research.", "\u0645\u0633\u0627\u062D\u0629 \u0628\u062D\u062B \u0645\u0648\u062B\u0642\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 \u0644\u0623\u0628\u062D\u0627\u062B \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u0627\u0626\u0642 \u0641\u064A \u0627\u0644\u0631\u062D\u0644\u0627\u062A \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629.")}</h2><p>${t("Microgravity weakens buoyancy-driven flow and changes flame and droplet behavior. MORS AEGIS brings NASA PSI investigations and original tables into a searchable, condition-aware workspace so teams can inspect measurements and form testable safety questions. It explains research evidence; it does not certify equipment or operating procedures.", "\u062A\u0636\u0639\u0641 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u062A\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0648\u062A\u063A\u064A\u0651\u0631 \u0633\u0644\u0648\u0643 \u0627\u0644\u0644\u0647\u0628 \u0648\u0627\u0644\u0642\u0637\u0631\u0627\u062A. \u064A\u062C\u0645\u0639 MORS AEGIS \u062A\u062D\u0642\u064A\u0642\u0627\u062A NASA PSI \u0648\u062C\u062F\u0627\u0648\u0644\u0647\u0627 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0641\u064A \u0645\u0633\u0627\u062D\u0629 \u0628\u062D\u062B \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0628\u062D\u062B \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u060C \u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0641\u0631\u0642 \u0639\u0644\u0649 \u0641\u062D\u0635 \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A \u0648\u0635\u064A\u0627\u063A\u0629 \u0623\u0633\u0626\u0644\u0629 \u0633\u0644\u0627\u0645\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u064A\u0634\u0631\u062D \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0623\u062F\u0644\u0629 \u0627\u0644\u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u0627 \u064A\u0635\u0627\u062F\u0642 \u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0623\u0648 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644.")}</p><div class="hero-actions"><button class="primary-btn" data-go="Challenge Evidence">${t("Explore NASA PSI data \u2192", "\u0627\u0633\u062A\u0643\u0634\u0641 \u0628\u064A\u0627\u0646\u0627\u062A NASA PSI \u2190")}</button><button class="secondary-btn" data-go="Flame Physics">${t("Study flame physics \u2192", "\u0627\u0641\u0647\u0645 \u0641\u064A\u0632\u064A\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u2190")}</button></div></div><div class="hero-meta">NASA PSI \xB7 COMBUSTION SCIENCE<br>${t("CHALLENGE-SCOPED \xB7 INVESTIGATION-LEVEL EVIDENCE", "\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u062D\u062F\u064A \xB7 \u0627\u0644\u0623\u062F\u0644\u0629 \u062D\u0633\u0628 \u0643\u0644 \u062A\u062D\u0642\u064A\u0642")}</div></div>`;
  }
  function themeWelcome() {
    if (storageGet("mors-welcome-theme-picked") === "1") return "";
    const choices2 = [
      ["arctic", t("Light \xB7 Arctic", "\u0641\u0627\u062A\u062D \xB7 \u0642\u0637\u0628\u064A"), "theme-preview-arctic"],
      ["space", t("Dark \xB7 Deep Space", "\u062F\u0627\u0643\u0646 \xB7 \u0641\u0636\u0627\u0621 \u0639\u0645\u064A\u0642"), "theme-preview-space"],
      ["observatory", t("Neutral \xB7 Observatory", "\u0645\u062D\u0627\u064A\u062F \xB7 \u0645\u0631\u0635\u062F"), "theme-preview-observatory"]
    ];
    return `<section class="card welcome-theme" id="theme-welcome"><div><span class="eyebrow">${t("FIRST VISIT \xB7 PERSONALIZE", "\u0627\u0644\u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \xB7 \u062E\u0635\u0651\u0635 \u0627\u0644\u0645\u0638\u0647\u0631")}</span><h3>${t("Choose your research workspace look", "\u0627\u062E\u062A\u0631 \u0645\u0638\u0647\u0631 \u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0628\u062D\u062B")}</h3><p class="sub">${t("Choose one of the MORS themes, then pick an accent color. You can change both later in Settings.", "\u0627\u062E\u062A\u0631 \u0646\u0645\u0637\u0627\u064B \u0645\u0646 \u0623\u0646\u0645\u0627\u0637 MORS \u062B\u0645 \u0644\u0648\u0646 \u0627\u0644\u0644\u0645\u0633\u0627\u062A \u0627\u0644\u0630\u064A \u062A\u0631\u064A\u062F\u0647. \u064A\u0645\u0643\u0646\u0643 \u062A\u063A\u064A\u064A\u0631\u0647\u0645\u0627 \u0644\u0627\u062D\u0642\u0627\u064B \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.")}</p></div><div class="welcome-theme-options" role="group" aria-label="${t("Choose a visual theme", "\u0627\u062E\u062A\u0631 \u0646\u0645\u0637 \u0627\u0644\u0639\u0631\u0636")}">${choices2.map(([value, label, preview]) => `<button type="button" class="theme-choice ${preview}" data-theme="${value}" aria-pressed="${theme === value}"><span class="theme-preview" aria-hidden="true"><i></i><b></b><em></em></span><span>${label}</span></button>`).join("")}</div>${accentPickerMarkup("welcomeAccent")}</section>`;
  }
  function flexScatterPanel() {
    const fuels = [...new Set(dataset.rows.map((row) => row.fuel).filter(Boolean))].sort();
    const options = fuels.map((fuel) => `<option value="${esc(fuel)}">${esc(fuel)}</option>`).join("");
    const included = dataset.rows.filter(
      (row) => Number.isFinite(row.oxygen_mole_fraction) && Number.isFinite(row.burning_rate_mm_s)
    ).length;
    return `<article class="card flex-scatter-card"><div class="card-head"><div><h3>${t("PSI-69 \xB7 Oxygen fraction and droplet burning rate", "PSI-69 \xB7 \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629")}</h3><p class="sub">${t("Each point is one NASA FLEX source row. Click or tap a point for test details; drag empty space to pan, zoom, or draw a guide line.", "\u0643\u0644 \u0646\u0642\u0637\u0629 \u062A\u0645\u062B\u0644 \u0635\u0641\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0645\u0646 NASA FLEX. \u0627\u0646\u0642\u0631 \u0627\u0644\u0646\u0642\u0637\u0629 \u0644\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u061B \u0627\u0633\u062D\u0628 \u0627\u0644\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629 \u0644\u0644\u062A\u062D\u0631\u064A\u0643 \u0623\u0648 \u0627\u0644\u062A\u0643\u0628\u064A\u0631 \u0623\u0648 \u0631\u0633\u0645 \u062E\u0637 \u0625\u0631\u0634\u0627\u062F\u064A.")}</p></div><span class="tag obs">${t("OBSERVED ROWS", "\u0635\u0641\u0648\u0641 \u0645\u0631\u0635\u0648\u062F\u0629")}</span></div><div class="toolbar"><label>${t("Fuel", "\u0627\u0644\u0648\u0642\u0648\u062F")} <select id="flexScatterFuel"><option value="">${t("All fuels", "\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0648\u0642\u0648\u062F")}</option>${options}</select></label><label>${t("Pressure \xB7 mmHg", "\u0627\u0644\u0636\u063A\u0637 \xB7 mmHg")} <select id="flexScatterPressure"><option value="all">${t("All pressures", "\u0643\u0644 \u0627\u0644\u0636\u063A\u0648\u0637")}</option><option value="low">\u2264 760</option><option value="mid">760\u20131520</option><option value="high">&gt; 1520</option><option value="unknown">${t("Unreported", "\u063A\u064A\u0631 \u0645\u0633\u062C\u0644")}</option></select></label></div><div id="flexScatterPlot" aria-live="polite"></div><p class="sub" id="flexScatterCount">${t("Rows shown", "\u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629")}: n=${included} / ${dataset.rows.length} ${t("source rows with both plotted values", "\u0635\u0641 \u0645\u0635\u062F\u0631 \u064A\u062D\u0648\u064A \u0627\u0644\u0642\u064A\u0645\u062A\u064A\u0646")}</p><div class="legend"><span style="--legend-color:#39a77e">${t("Source test_end: Extinction", "\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 test_end: Extinction")}</span><span style="--legend-color:#d59a3d">${t("Source test_end: Disruption", "\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 test_end: Disruption")}</span><span style="--legend-color:#7d73d3">${t("Other / source label", "\u0623\u062E\u0631\u0649 / \u062A\u0633\u0645\u064A\u0629 \u0627\u0644\u0645\u0635\u062F\u0631")}</span></div><div class="callout warn">${t("The FLEX burning-rate constant is for liquid droplets under the d\xB2 law, not solid-material flame-spread speed. These points are descriptive; mixed conditions do not establish an oxygen effect or causality. Source: PSI-69 \xB7 DOI 10.60555/mbq8-0451.", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0641\u064A FLEX \u062E\u0627\u0635 \u0628\u0627\u0644\u0642\u0637\u0631\u0627\u062A \u0627\u0644\u0633\u0627\u0626\u0644\u0629 \u0648\u0641\u0642 \u0642\u0627\u0646\u0648\u0646 d\xB2\u060C \u0648\u0644\u064A\u0633 \u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628 \u0639\u0644\u0649 \u0645\u0627\u062F\u0629 \u0635\u0644\u0628\u0629. \u0627\u0644\u0646\u0642\u0627\u0637 \u0648\u0635\u0641\u064A\u0629\u061B \u0627\u062E\u062A\u0644\u0627\u0641 \u0627\u0644\u0634\u0631\u0648\u0637 \u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062B\u0631 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0648 \u0627\u0644\u0633\u0628\u0628\u064A\u0629. \u0627\u0644\u0645\u0635\u062F\u0631: PSI-69 \xB7 DOI 10.60555/mbq8-0451.")}</div></article>`;
  }
  function bindFlexScatter(root) {
    const fuel = root.querySelector("#flexScatterFuel");
    const pressure = root.querySelector("#flexScatterPressure");
    const plot2 = root.querySelector("#flexScatterPlot");
    const count = root.querySelector("#flexScatterCount");
    if (!fuel || !pressure || !plot2) return;
    const update = () => {
      const rows = dataset.rows.filter((row) => {
        if (fuel.value && row.fuel !== fuel.value) return false;
        if (pressure.value === "unknown") return !Number.isFinite(row.pressure_mmHg);
        if (!Number.isFinite(row.pressure_mmHg) && pressure.value !== "all") return false;
        if (pressure.value === "low") return row.pressure_mmHg <= 760;
        if (pressure.value === "mid") return row.pressure_mmHg > 760 && row.pressure_mmHg <= 1520;
        if (pressure.value === "high") return row.pressure_mmHg > 1520;
        return true;
      });
      const config = FLEX_CHART_GUIDE[0];
      plot2.innerHTML = scientificScatter({
        rows,
        xKey: config.xKey,
        yKey: config.yKey,
        xLabel: config.xLabel[lang],
        yLabel: config.yLabel[lang],
        xUnit: config.xUnit,
        yUnit: config.yUnit,
        xFactor: config.xFactor || 1,
        groupKey: "fuel",
        labels: chartControlLabels(lang)
      });
      bindInteractiveCharts(plot2);
      const shown = rows.filter(
        (row) => Number.isFinite(row.oxygen_mole_fraction) && Number.isFinite(row.burning_rate_mm_s)
      ).length;
      if (count)
        count.textContent = `${t("Rows shown", "\u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629")}: n=${shown} / ${rows.length} ${t("filtered source rows with both plotted values", "\u0635\u0641 \u0645\u0641\u0644\u062A\u0631 \u064A\u062D\u0648\u064A \u0627\u0644\u0642\u064A\u0645\u062A\u064A\u0646")}`;
    };
    fuel.onchange = update;
    pressure.onchange = update;
  }
  function fuelOutcomeMatrix() {
    const ar = lang === "ar";
    const fuels = [...new Set(dataset.rows.map((row) => row.fuel || (ar ? "\u063A\u064A\u0631 \u0645\u0633\u062C\u0644" : "Unreported")))].sort();
    const outcomes = [...new Set(dataset.rows.map((row) => row.test_end || (ar ? "\u063A\u064A\u0631 \u0645\u0633\u062C\u0644" : "Unreported")))].sort();
    const count = (fuel, outcome) => dataset.rows.filter(
      (row) => (row.fuel || (ar ? "\u063A\u064A\u0631 \u0645\u0633\u062C\u0644" : "Unreported")) === fuel && (row.test_end || (ar ? "\u063A\u064A\u0631 \u0645\u0633\u062C\u0644" : "Unreported")) === outcome
    ).length;
    return `<article class="card fuel-outcome-card"><div class="card-head"><div><span class="eyebrow">${ar ? "\u062A\u0648\u0632\u064A\u0639 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631" : "SOURCE ROW DISTRIBUTION"}</span><h3>${ar ? "\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0628\u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u0648\u062F \xB7 NASA PSI-69" : "PSI-69 test outcomes by fuel"}</h3><p class="sub">${ar ? "\u0639\u062F\u062F \u062A\u0633\u0645\u064A\u0627\u062A test_end \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629 \u0644\u0643\u0644 \u0648\u0642\u0648\u062F\u060C \u062F\u0648\u0646 \u062A\u062D\u0648\u064A\u0644\u0647\u0627 \u0644\u0627\u062D\u062A\u0645\u0627\u0644\u0627\u062A \u0623\u0648 \u062A\u0631\u062A\u064A\u0628 \u062E\u0637\u0648\u0631\u0629." : "Counts of NASA-reported test_end labels for each fuel; not probabilities or a hazard ranking."}</p></div><span class="tag obs">${ar ? "\u0639\u062F\u062F \u0627\u0644\u0635\u0641\u0648\u0641" : "SOURCE COUNTS"}</span></div><div class="table-wrap"><table><caption class="sr-only">${ar ? "\u0639\u062F\u062F \u0635\u0641\u0648\u0641 NASA PSI-69 \u0628\u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629" : "NASA PSI-69 source row counts by fuel and reported test outcome"}</caption><thead><tr><th>${ar ? "\u0627\u0644\u0648\u0642\u0648\u062F" : "Fuel"}</th>${outcomes.map((outcome) => `<th>${esc(outcome)}</th>`).join("")}<th>${ar ? "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A" : "Total"}</th></tr></thead><tbody>${fuels.map((fuel) => {
      const values = outcomes.map((outcome) => count(fuel, outcome));
      return `<tr><th scope="row">${esc(fuel)}</th>${values.map((value) => `<td><span class="outcome-count">${value}</span></td>`).join("")}<td><b>${values.reduce((sum, value) => sum + value, 0)}</b></td></tr>`;
    }).join("")}</tbody></table></div><p class="sub">${ar ? `\u0627\u0644\u0645\u0635\u062F\u0631: NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \xB7 ${dataset.rows.length} \u0635\u0641\u0627\u064B \u0643\u0645\u0627 \u0648\u0631\u062F\u062A \u062A\u0633\u0645\u064A\u0627\u062A\u0647\u0627.` : `Source: NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \xB7 ${dataset.rows.length} records using the reported labels.`}</p><div class="callout warn">${ar ? "\u062A\u0639\u0643\u0633 \u0627\u0644\u0623\u0639\u062F\u0627\u062F \u062A\u0631\u0643\u064A\u0628 \u062C\u062F\u0648\u0644 FLEX \u0627\u0644\u0645\u062D\u062F\u062F \u0641\u0642\u0637\u061B \u0644\u0627 \u062A\u0645\u062B\u0644 \u062A\u0643\u0631\u0627\u0631\u0627\u064B \u0639\u0627\u0645\u0627\u064B \u0644\u0644\u0648\u0642\u0648\u062F \u0648\u0644\u0627 \u0639\u062A\u0628\u0629 \u0627\u0634\u062A\u0639\u0627\u0644." : "These counts describe this FLEX table only; they do not estimate general fuel frequency or an ignition threshold."}</div></article>`;
  }
  function challengeGoals() {
    const goals = lang === "ar" ? [
      [
        "1 \xB7 \u0627\u0643\u062A\u0634\u0627\u0641 \u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u0637\u0627\u0642\u0645",
        "\u064A\u0639\u0631\u0636 \u0641\u0647\u0631\u0633 NASA PSI \u0627\u0644\u0643\u0627\u0645\u0644 (24 \u062A\u062D\u0642\u064A\u0642\u0627\u064B) \u0645\u0639 \u062F\u0631\u062C\u0629 \u0635\u0644\u0629 \u0628\u0627\u0644\u0645\u0647\u0645\u0629 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0635\u0641\u064A\u0629. \u062A\u0648\u0641\u0631 \u0627\u0644\u062C\u062F\u0648\u0644 \u0638\u0627\u0647\u0631 \u0645\u0646\u0641\u0635\u0644\u0627\u064B \u0648\u0644\u0627 \u064A\u062F\u062E\u0644 \u0641\u064A \u0627\u0644\u062F\u0631\u062C\u0629\u061B \u0644\u064A\u0633\u062A \u062F\u0631\u062C\u0629 \u062E\u0637\u0648\u0631\u0629."
      ],
      [
        "2 \xB7 \u0623\u062F\u0644\u0629 \u0644\u0644\u0646\u0645\u0630\u062C\u0629 \u0627\u0644\u062A\u0646\u0628\u0624\u064A\u0629",
        "\u064A\u0643\u0634\u0641 \u0627\u0644\u0645\u062E\u062A\u0628\u0631 \u0638\u0631\u0648\u0641 \u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0627\u0644\u062D\u0642\u0648\u0644 \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0648\u0627\u0644\u0646\u0642\u0635 \u0644\u0643\u0644 \u062F\u0631\u0627\u0633\u0629\u061B \u0648\u064A\u062D\u0644\u0644 FLEX \u0645\u0646\u0641\u0635\u0644\u0627\u064B \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641\u0647. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0627 \u062A\u062B\u0628\u062A \u0646\u0645\u0648\u0630\u062C \u062E\u0637\u0631 \u0645\u0648\u062D\u062F\u0627\u064B \u0639\u0628\u0631 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A."
      ],
      [
        "3 \xB7 \u0623\u0646\u0638\u0645\u0629 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062C\u064A\u0644 \u0627\u0644\u0642\u0627\u062F\u0645",
        "\u062A\u0631\u0628\u0637 \u0635\u0641\u062D\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0623\u062F\u0644\u0629 \u0628\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u0644\u0643\u0634\u0641 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F. \u0647\u0630\u0647 \u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u062A\u0648\u0635\u064A\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0645\u0635\u062F\u0651\u0642\u0629."
      ]
    ] : [
      [
        "1 \xB7 Find crew-relevant studies",
        "Browse all 24 NASA PSI investigations with a metadata-based mission-relevance score. Table availability is separate and does not change the score; this is not a fire-hazard ranking."
      ],
      [
        "2 \xB7 Expose evidence for predictive models",
        "Inspect conditions, fields, outcomes, and gaps per study; analyze FLEX separately by test conditions. Current evidence does not validate a universal cross-study risk model."
      ],
      [
        "3 \xB7 Inform next-generation safety systems",
        "Connect evidence to prevention, detection, and suppression research questions. These are design directions, not certified operating recommendations."
      ]
    ];
    return `<article class="card" style="margin:15px 0"><div class="card-head"><div><span class="eyebrow">OFFICIAL CHALLENGE VIDEO \xB7 07:15\u201308:39</span><h3>${t("What the challenge asks us to deliver", "\u0645\u0627 \u0627\u0644\u0630\u064A \u064A\u0637\u0644\u0628\u0647 \u0627\u0644\u062A\u062D\u062F\u064A \u0645\u0646 \u0627\u0644\u0645\u0634\u0631\u0648\u0639")}</h3></div><a href="https://www.youtube.com/watch?v=AVuEiKxOpc0" target="_blank" rel="noreferrer">${t("Watch video \u2197", "\u0634\u0627\u0647\u062F \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u2197")}</a></div><div class="grid three">${goals.map(([title, body]) => `<section class="card"><h3>${title}</h3><p class="sub">${body}</p></section>`).join("")}</div><p class="sub">${t("SI is used to help navigate and explain cited evidence; generated text is not an experimental measurement. Optional Earth applications are documented separately.", "\u064A\u0633\u0627\u0639\u062F SI \u0639\u0644\u0649 \u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0627\u0644\u0623\u062F\u0644\u0629 \u0627\u0644\u0645\u0648\u062B\u0642\u0629 \u0648\u0634\u0631\u062D\u0647\u0627\u061B \u0627\u0644\u0646\u0635 \u0627\u0644\u0645\u0648\u0644\u0651\u062F \u0644\u064A\u0633 \u0642\u064A\u0627\u0633\u0627\u064B \u062A\u062C\u0631\u064A\u0628\u064A\u0627\u064B. \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0623\u0631\u0636 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629 \u0645\u0648\u062B\u0642\u0629 \u0645\u0646\u0641\u0635\u0644\u0629.")}</p></article>`;
  }
  function flexBurnRateHistogram() {
    return scientificHistogram({
      rows: dataset.rows,
      key: "burning_rate_mm_s",
      label: t("Droplet burning-rate constant", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629"),
      unit: "mm\xB2/s",
      labels: chartControlLabels(lang),
      idField: "id"
    });
  }
  async function overview() {
    const evidence = await get("/api/challenge/catalog");
    return `${hero()}${themeWelcome()}${challengeGoals()}${judgingTrail(evidence, lang)}<article class="card ai-entry"><div><span class="eyebrow">${t("AI RESEARCH COPILOT", "\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0623\u0628\u062D\u0627\u062B \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A")}</span><h3>${t("Ask a question; inspect the evidence behind the answer.", "\u0627\u0633\u0623\u0644\u060C \u062B\u0645 \u0627\u0641\u062D\u0635 \u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0630\u064A \u064A\u0633\u062A\u0646\u062F \u0625\u0644\u064A\u0647 \u0627\u0644\u062C\u0648\u0627\u0628.")}</h3><p class="sub">${t("The assistant works with NASA PSI-69 records, computes descriptive results, cites the source, and labels its AI explanation separately.", "\u064A\u0639\u0645\u0644 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0639\u0644\u0649 \u0633\u062C\u0644\u0627\u062A NASA PSI-69\u060C \u0648\u064A\u062D\u0633\u0628 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0648\u0635\u0641\u064A\u0629\u060C \u0648\u064A\u0630\u0643\u0631 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u064A\u0641\u0635\u0644 \u062A\u0641\u0633\u064A\u0631 AI \u0639\u0646\u0647\u0627.")}</p></div><button class="primary-btn" data-go="AI Copilot">${t("Open AI Copilot \u2192", "\u0627\u0641\u062A\u062D \u0645\u0633\u0627\u0639\u062F AI \u2190")}</button></article><div class="grid stats">${stat(t("PSI COMBUSTION INVESTIGATIONS", "\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0641\u064A PSI"), evidence.officialInventory.total, t("Official NASA inventory snapshot", "\u0644\u0642\u0637\u0629 \u0645\u0646 \u0641\u0647\u0631\u0633 NASA \u0627\u0644\u0631\u0633\u0645\u064A"), "\u25C9")}${stat(t("TABLES BUNDLED", "\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642\u0629"), evidence.investigations.length, t("NASA PSI tables \xB7 checksums verified", "\u062C\u062F\u0627\u0648\u0644 NASA PSI \xB7 \u0627\u0644\u0628\u0635\u0645\u0627\u062A \u0645\u062A\u062D\u0642\u0642\u0629"), "\u25A4")}${stat(t("SEPARATE SOURCE ROWS", "\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0645\u0646\u0641\u0635\u0644\u0629"), evidence.recordCountAcrossFiles, t("Separate studies; never pooled", "\u062F\u0631\u0627\u0633\u0627\u062A \u0645\u0646\u0641\u0635\u0644\u0629\u061B \u063A\u064A\u0631 \u0645\u062F\u0645\u062C\u0629"), "\u25A4")}${stat(t("VERIFIED TABLE HASHES", "\u0628\u0635\u0645\u0627\u062A \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u062A\u062D\u0642\u0642\u0629"), evidence.investigations.filter((x) => x.sourceIntegrity === "VERIFIED").length, t("Original source bytes verified", "\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0628\u0627\u064A\u062A\u0627\u062A \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0623\u0635\u0644\u064A\u0629"), "\u2713")}</div><div class="grid two"><article class="card"><div class="card-head"><div><h3>FLEX \xB7 PSI-69</h3><p class="sub">${t("One investigation selected for detailed, condition-stratified analysis.", "\u062A\u062D\u0642\u064A\u0642 \u0648\u0627\u062D\u062F \u0644\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631.")}</p></div><span class="tag obs">${t("OBSERVED", "\u0645\u0631\u0635\u0648\u062F")}</span></div>${flexBurnRateHistogram()}<div class="legend"><span>PSI-69 \xB7 DOI 10.60555/mbq8-0451</span></div></article><article class="card"><h3>${t("NASA challenge-source coverage", "\u062A\u063A\u0637\u064A\u0629 \u0645\u0635\u062F\u0631 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u062F\u064A")}</h3><p class="sub">${t(`Measurements come from the challenge-relevant NASA PSI Combustion Science repository. NASA PSI lists ${evidence.officialInventory.total} investigations; ${evidence.investigations.length} original table files are bundled, checksummed, and inspectable. Studies remain separate because their methods and outcomes differ.`, `\u062A\u0623\u062A\u064A \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A \u0645\u0646 \u0645\u0633\u062A\u0648\u062F\u0639 NASA PSI Combustion Science \u0627\u0644\u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u062A\u062D\u062F\u064A. \u064A\u0633\u062C\u0644 \u0627\u0644\u0641\u0647\u0631\u0633 ${evidence.officialInventory.total} \u062A\u062D\u0642\u064A\u0642\u0627\u064B\u061B \u0623\u0631\u0641\u0642\u0646\u0627 ${evidence.investigations.length} \u062C\u062F\u0648\u0644\u0627\u064B \u0623\u0635\u0644\u064A\u0627\u064B \u0645\u0639 \u0628\u0635\u0645\u0627\u062A\u0647\u0627 \u0644\u0641\u062D\u0635\u0647\u0627. \u0628\u0642\u064A\u062A \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A \u0645\u0646\u0641\u0635\u0644\u0629 \u0644\u0627\u062E\u062A\u0644\u0627\u0641 \u0637\u0631\u0642\u0647\u0627 \u0648\u0646\u062A\u0627\u0626\u062C\u0647\u0627.`)}</p><div class="list-row"><span>${t("Flame and droplet studies", "\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u0644\u0647\u0628 \u0648\u0627\u0644\u0642\u0637\u0631\u0627\u062A")}</span><b>ACME \xB7 CFI \xB7 FLEX \xB7 SPICE</b></div><div class="list-row"><span>${t("Solid materials and spacecraft fires", "\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0648\u062D\u0631\u0627\u0626\u0642 \u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062A")}</span><b>BASS \xB7 SAFFIRE</b></div><div class="list-row"><span>${t("Smoke and aerosol studies", "\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621")}</span><b>SAME \xB7 DAFT</b></div><div class="callout warn">${t("Other PSI records remain metadata and source links. Unlike experiments are not pooled into a universal fire-hazard rank.", "\u062A\u0628\u0642\u0649 \u0633\u062C\u0644\u0627\u062A PSI \u0627\u0644\u0623\u062E\u0631\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0648\u0631\u0648\u0627\u0628\u0637 \u0644\u0644\u0645\u0635\u0627\u062F\u0631. \u0644\u0627 \u0646\u062F\u0645\u062C \u062A\u062C\u0627\u0631\u0628 \u0645\u062E\u062A\u0644\u0641\u0629 \u0641\u064A \u062A\u0635\u0646\u064A\u0641 \u0639\u0627\u0645 \u0644\u062E\u0637\u0631 \u0627\u0644\u062D\u0631\u064A\u0642.")}</div></article></div>${flexScatterPanel()}${fuelOutcomeMatrix()}<div class="grid three"><article class="card"><h3>${t("Study the physics", "\u0627\u062F\u0631\u0633 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621")}</h3><p class="sub">${t("Buoyancy-driven convection weakens in microgravity; diffusion and forced ventilation remain.", "\u064A\u0636\u0639\u0641 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0646\u0627\u062A\u062C \u0639\u0646 \u0627\u0644\u0637\u0641\u0648 \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\u060C \u0628\u064A\u0646\u0645\u0627 \u064A\u0633\u062A\u0645\u0631 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0648\u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0642\u0633\u0631\u064A\u0629.")}</p><button class="outline-btn" data-go="Flame Lab">${t("Open Flame Lab \u2192", "\u0627\u0641\u062A\u062D \u0645\u062E\u062A\u0628\u0631 \u0627\u0644\u0644\u0647\u0628 \u2190")}</button></article><article class="card"><h3>${t("Inspect primary data", "\u0627\u0641\u062D\u0635 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629")}</h3><p class="sub">${t("Browse source rows, missing values, DOIs, and integrity checks for each study.", "\u0627\u0633\u062A\u0639\u0631\u0636 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629 \u0648DOI \u0648\u0641\u062D\u0648\u0635 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0643\u0644 \u062F\u0631\u0627\u0633\u0629.")}</p><button class="outline-btn" data-go="Challenge Evidence">${t("Open Dataset Explorer \u2192", "\u0627\u0641\u062A\u062D \u0645\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u2190")}</button></article><article class="card"><h3>${t("Decision-support boundary", "\u062D\u062F\u0648\u062F \u062F\u0639\u0645 \u0627\u0644\u0642\u0631\u0627\u0631")}</h3><p class="sub">${t("This research dashboard does not certify spacecraft fire risk or replace flight-safety procedures.", "\u0644\u0648\u062D\u0629 \u0627\u0644\u0623\u0628\u062D\u0627\u062B \u0644\u0627 \u062A\u0635\u0627\u062F\u0642 \u0639\u0644\u0649 \u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0631\u064A\u0642 \u0648\u0644\u0627 \u062A\u0633\u062A\u0628\u062F\u0644 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0637\u064A\u0631\u0627\u0646.")}</p><a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">NASA \xB7 ${t("fire-safety research", "\u0623\u0628\u062D\u0627\u062B \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u064A\u0642")} \u2197</a></article></div>`;
  }
  var WB_VARIABLES = [
    ["burning_rate_mm_s", "Burning-rate constant (mm\xB2/s)"],
    ["initial_droplet_diameter_mm", "Initial droplet diameter (mm)"],
    ["visible_flame_extinction_diameter_mm", "Flame extinction diameter (mm)"],
    ["burn_time_s", "Burn time (s)"],
    ["pressure_mmHg", "Pressure (mmHg)"],
    ["oxygen_mole_fraction", "Oxygen mole fraction"]
  ];
  var WB_DEFAULT = { fuel: "", pressureBand: "", diluent: "", variable: "burning_rate_mm_s" };
  var wbFilter = __spreadValues({}, WB_DEFAULT);
  var fmt = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : "\u2014";
  function ciCell(ci) {
    if (!ci) return "\u2014";
    if (ci.low === null)
      return `<span style="color:var(--muted)" title="${esc(ci.reason || "")}">${ci.n < 5 ? t("not reported (n &lt; 5)", "\u063A\u064A\u0631 \u0645\u064F\u0628\u0644\u063A \u0639\u0646\u0647 (n &lt; 5)") : t("not reported", "\u063A\u064A\u0631 \u0645\u064F\u0628\u0644\u063A \u0639\u0646\u0647")}</span>`;
    return `${fmt(ci.low)} \u2013 ${fmt(ci.high)}`;
  }
  function wbSelect(id, label, options, value) {
    return `<label style="font-size:10px;color:var(--muted)">${label} <select id="${id}">${options.map(([v, text]) => `<option value="${esc(v)}" ${v === value ? "selected" : ""}>${esc(text)}</option>`).join("")}</select></label>`;
  }
  function wbGroupRow(label, g, bold = false) {
    const a = g.association, name = bold ? `<b>${esc(label)}</b>` : esc(label);
    return `<tr><td>${name}</td><td>${g.records}</td><td>${g.n}</td><td><b>${fmt(g.mean)}</b></td><td>${ciCell(g.ci95)}</td><td>${fmt(g.sampleSd)}</td><td>${a.r === null ? "\u2014" : fmt(a.r)} <span style="color:var(--muted)">(n=${a.n})</span></td><td>${a.r === null ? "\u2014" : ciCell(a.ci95)}</td></tr>`;
  }
  function scientificChartGallery(rows, { explain = false } = {}) {
    const labels2 = {
      controls: t("Chart controls", "\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0645\u062E\u0637\u0637"),
      interactionHint: t(
        "Tap or click a point for details \xB7 drag the plot to pan \xB7 use +/\u2212 or the wheel to zoom.",
        "\u0627\u0646\u0642\u0631 \u0627\u0644\u0646\u0642\u0637\u0629 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \xB7 \u0627\u0633\u062D\u0628 \u0627\u0644\u0645\u062E\u0637\u0637 \u0644\u062A\u062D\u0631\u064A\u0643\u0647 \xB7 \u0627\u0633\u062A\u062E\u062F\u0645 +/\u2212 \u0623\u0648 \u0639\u062C\u0644\u0629 \u0627\u0644\u0641\u0623\u0631\u0629 \u0644\u0644\u062A\u0643\u0628\u064A\u0631."
      ),
      zoomIn: t("Zoom in", "\u062A\u0643\u0628\u064A\u0631"),
      zoomOut: t("Zoom out", "\u062A\u0635\u063A\u064A\u0631"),
      reset: t("Reset view", "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0639\u0631\u0636"),
      fitLine: t("Linear fit", "\u062E\u0637 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629"),
      drawLine: t("Draw guide line", "\u0627\u0631\u0633\u0645 \u062E\u0637\u0627\u064B \u0625\u0631\u0634\u0627\u062F\u064A\u0627\u064B"),
      drawLineActive: t("Drag to draw \xB7 tap to stop", "\u0627\u0633\u062D\u0628 \u0644\u0631\u0633\u0645 \u0627\u0644\u062E\u0637 \xB7 \u0627\u0636\u063A\u0637 \u0644\u0644\u0625\u064A\u0642\u0627\u0641"),
      undo: t("Undo line", "\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0627\u0644\u062E\u0637"),
      fit: t("Exploratory linear fit", "\u0645\u0644\u0627\u0621\u0645\u0629 \u062E\u0637\u064A\u0629 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A\u0629"),
      fitUnavailable: t("Fit unavailable (need at least 3 points)", "\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629 (\u064A\u0644\u0632\u0645 3 \u0646\u0642\u0627\u0637 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644)"),
      fitNote: t("Exploratory association only; it does not show causation.", "\u0627\u0631\u062A\u0628\u0627\u0637 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A \u0641\u0642\u0637\u061B \u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0633\u0628\u0628\u064A\u0629."),
      rows: t("Valid source rows", "\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0635\u0627\u0644\u062D\u0629")
    };
    const language = lang === "ar" ? "ar" : "en";
    const configs = FLEX_CHART_GUIDE.map((cfg) => __spreadProps(__spreadValues({}, cfg), {
      title: cfg.title[language],
      xLabel: cfg.xLabel[language],
      yLabel: cfg.yLabel[language],
      question: cfg.question[language],
      use: cfg.use[language],
      limit: cfg.limit[language]
    }));
    const guidance = (cfg) => explain ? `<div class="grid three" style="margin:12px 0"><p class="sub"><b>${t("Question", "\u0627\u0644\u0633\u0624\u0627\u0644")}</b><br>${esc(cfg.question)}</p><p class="sub"><b>${t("How to use it", "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645")}</b><br>${esc(cfg.use)}</p><p class="sub"><b>${t("Interpretation limit", "\u062D\u062F\u0648\u062F \u0627\u0644\u062A\u0641\u0633\u064A\u0631")}</b><br>${esc(cfg.limit)}</p></div>` : "";
    return `<section class="chart-gallery"><div class="section-title"><div><h2>${t("Interactive FLEX research plots", "\u0645\u062E\u0637\u0637\u0627\u062A FLEX \u0627\u0644\u0628\u062D\u062B\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629")}</h2><p>${t("Each dot is one source test. Missing pairs are omitted only from that plot. Fuel is shown by color; fitted lines are exploratory and never establish causation.", "\u0643\u0644 \u0646\u0642\u0637\u0629 \u062A\u0645\u062B\u0644 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0635\u062F\u0631. \u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0646\u0627\u0642\u0635\u0629 \u0645\u0646 \u0630\u0644\u0643 \u0627\u0644\u0645\u062E\u0637\u0637 \u0641\u0642\u0637. \u064A\u0645\u064A\u0632 \u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0648\u0642\u0648\u062F\u061B \u0648\u062E\u0637 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A \u0648\u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0633\u0628\u0628\u064A\u0629.")}</p></div></div><div class="grid two">${configs.map((cfg) => `<article class="card" data-chart-guide="${cfg.id}"><h3>${cfg.title}</h3>${guidance(cfg)}${scientificScatter(__spreadProps(__spreadValues({}, cfg), { rows, groupKey: "fuel", labels: labels2 }))}</article>`).join("")}</div></section>`;
  }
  function chartGuidePage() {
    const ar = lang === "ar";
    const intro = ar ? "\u064A\u062C\u0645\u0639 \u0647\u0630\u0627 \u0627\u0644\u062F\u0644\u064A\u0644 \u0645\u062E\u0637\u0637\u064A \u0627\u0644\u0646\u0638\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0648\u0645\u062E\u0637\u0637\u0627\u062A \u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u062A\u0629. \u062C\u0645\u064A\u0639 \u0627\u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0623\u062F\u0646\u0627\u0647 \u0645\u0646 NASA PSI-69 (FLEX)\u060C \u0648\u0644\u064A\u0633\u062A \u062E\u0644\u064A\u0637\u0627\u064B \u0645\u0646 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629." : "This guide collects the two Overview plots and the six Analysis Workbench plots. Experimental points below come from NASA PSI-69 (FLEX); they are not pooled across unrelated investigations.";
    return `${pageHead(t("Chart Guide", "\u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A"), t("What each plot asks, how to read it, and what it cannot establish.", "\u0633\u0624\u0627\u0644 \u0643\u0644 \u0645\u062E\u0637\u0637 \u0648\u0637\u0631\u064A\u0642\u0629 \u0642\u0631\u0627\u0621\u062A\u0647 \u0648\u0645\u0627 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u0646\u062A\u0627\u062C\u0647 \u0645\u0646\u0647."))}
    <div class="callout" style="margin-bottom:18px">${intro} <a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-69" target="_blank" rel="noreferrer">NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \u2197</a></div>
    <h2 style="margin:22px 0 12px">${t("Overview plots", "\u0645\u062E\u0637\u0637\u0627 \u0627\u0644\u0646\u0638\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629")}</h2>
    <div class="grid two">
      <article class="card"><h3>${t("Distribution of FLEX droplet burning-rate constants", "\u062A\u0648\u0632\u064A\u0639 \u062B\u0648\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0642\u0637\u0631\u0627\u062A FLEX")}</h3><p class="sub">${t("Purpose: scan the spread of reported burning-rate constants and spot values worth inspecting.", "\u0627\u0644\u063A\u0631\u0636: \u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u062A\u0634\u062A\u062A \u062B\u0648\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0631\u0635\u062F \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u062A\u064A \u062A\u0633\u062A\u062D\u0642 \u0627\u0644\u0641\u062D\u0635.")}</p>${flexBurnRateHistogram()}<div class="callout warn">${t("Each bar counts valid PSI-69 source rows within a burning-rate interval. Click a bar to inspect its source test IDs; binning is descriptive.", "\u064A\u0645\u062B\u0644 \u0643\u0644 \u0639\u0645\u0648\u062F \u0639\u062F\u062F \u0635\u0641\u0648\u0641 NASA PSI-69 \u0627\u0644\u0635\u0627\u0644\u062D\u0629 \u0636\u0645\u0646 \u0645\u062C\u0627\u0644 \u0644\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642. \u0627\u0646\u0642\u0631 \u0639\u0645\u0648\u062F\u0627\u064B \u0644\u0641\u062D\u0635 \u0645\u0639\u0631\u0651\u0641\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u061B \u0648\u0627\u0644\u062A\u062C\u0645\u064A\u0639 \u0648\u0635\u0641\u064A.")}</div></article>
      ${flexScatterPanel()}
    </div>
    <h2 style="margin:24px 0 12px">${t("Six interactive Workbench plots", "\u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0627\u0644\u0633\u062A\u0629 \u0641\u064A \u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644")}</h2>
    ${scientificChartGallery(dataset.rows, { explain: true })}
    <div class="callout warn" style="margin-top:16px">${t("The Earth and microgravity flame drawings in Flame Physics are conceptual schematics, not measured NASA plots. The 3D models are research concepts, not validated fire-suppression hardware.", "\u0631\u0633\u0645\u0627 \u0627\u0644\u0644\u0647\u0628 \u0644\u0644\u0623\u0631\u0636 \u0648\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u0641\u064A \u0635\u0641\u062D\u0629 \u0641\u064A\u0632\u064A\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u062A\u062E\u0637\u064A\u0637\u064A\u0627\u0646 \u0645\u0641\u0647\u0648\u0645\u0627\u0646 \u0648\u0644\u064A\u0633\u0627 \u0645\u062E\u0637\u0637\u064E\u064A \u0642\u064A\u0627\u0633\u0627\u062A \u0645\u0646 \u0646\u0627\u0633\u0627. \u0648\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0645\u0641\u0627\u0647\u064A\u0645 \u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0645\u0639\u062F\u0627\u062A \u0625\u062E\u0645\u0627\u062F \u0645\u0639\u062A\u0645\u062F\u0629.")}</div>`;
  }
  async function analysisPage() {
    var _a, _b, _c, _d;
    const params = new URLSearchParams(Object.entries(wbFilter).filter(([, v]) => v));
    const wb = await get(`/api/analysis?${params}`);
    const variableLabels = WB_VARIABLES.map(([key, label]) => [
      key,
      t(
        label,
        {
          "Burning-rate constant (mm\xB2/s)": "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 (mm\xB2/s)",
          "Initial droplet diameter (mm)": "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A (mm)",
          "Flame extinction diameter (mm)": "\u0642\u0637\u0631 \u0625\u062E\u0645\u0627\u062F \u0627\u0644\u0644\u0647\u0628 (mm)",
          "Burn time (s)": "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 (s)",
          "Pressure (mmHg)": "\u0627\u0644\u0636\u063A\u0637 (mmHg)",
          "Oxygen mole fraction": "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646"
        }[label]
      )
    ]);
    const c = wb.conditions, strata = wb.strata, filtered = Object.keys(wb.filter).length > 0, varLabel = ((_a = variableLabels.find(([k]) => k === wbFilter.variable)) == null ? void 0 : _a[1]) || wbFilter.variable, any = (label) => [["", label]];
    const bar = `<article class="card"><div class="card-head"><div><h3>${t("Test-condition filter", "\u062A\u0635\u0641\u064A\u0629 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631")}</h3><p class="sub">${esc(c.bandDefinition)} ${t("Diluent is the added inert gas (CO\u2082 or He); \u201Cno diluent\u201D means O\u2082/N\u2082 only.", "\u0627\u0644\u0645\u062E\u0641\u0641 \u0647\u0648 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u062E\u0627\u0645\u0644 \u0627\u0644\u0645\u0636\u0627\u0641 (CO\u2082 \u0623\u0648 He)\u061B \u0648\u062A\u0639\u0646\u064A \xAB\u0645\u0646 \u062F\u0648\u0646 \u0645\u062E\u0641\u0641\xBB \u0645\u0632\u064A\u062C O\u2082/N\u2082 \u0641\u0642\u0637.")}</p></div><span class="tag obs">${wb.records} ${t("OF", "\u0645\u0646 \u0623\u0635\u0644")} ${dataset.dataset.records} ${t("TESTS", "\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u064B")}</span></div><div class="toolbar" style="margin:0">${wbSelect("wbFuel", t("Fuel", "\u0627\u0644\u0648\u0642\u0648\u062F"), any(t("All fuels", "\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0648\u0642\u0648\u062F")).concat(c.fuels.map((f) => [f.id, `${f.label} (${f.n})`])), wbFilter.fuel)}${wbSelect("wbBand", t("Pressure", "\u0627\u0644\u0636\u063A\u0637"), any(t("All pressures", "\u0643\u0644 \u0627\u0644\u0636\u063A\u0648\u0637")).concat(c.pressureBands.map((b) => [b.id, `${b.label} \xB7 ${b.observed} (${b.n})`])), wbFilter.pressureBand)}${wbSelect("wbDiluent", t("Diluent", "\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641"), any(t("All diluents", "\u0643\u0644 \u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u062E\u0641\u0641\u0629")).concat(c.diluents.map((d) => [d.id, `${d.label} (${d.n})`])), wbFilter.diluent)}${wbSelect("wbVariable", t("Grouped variable", "\u0645\u062A\u063A\u064A\u0631 \u0627\u0644\u062A\u062C\u0645\u064A\u0639"), variableLabels, wbFilter.variable)}<button class="outline-btn" id="wbReset">${t("Reset", "\u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637")}</button></div></article>`;
    if (!strata)
      return `${pageHead(t("Scientific Analysis Workbench", "\u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0639\u0644\u0645\u064A"), t("Reproducible summary statistics computed from source rows.", "\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0645\u062D\u0633\u0648\u0628\u0629 \u0645\u0646 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631."))}${bar}<div class="callout warn" style="margin-top:15px">${t("No bundled test matches", "\u0644\u0627 \u064A\u0648\u062C\u062F \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0631\u0641\u0642 \u064A\u0637\u0627\u0628\u0642")} ${esc(wb.conditionLabel)}. ${t("Summary statistics are withheld; reset the conditions to inspect all records.", "\u062D\u064F\u062C\u0628\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0621\u0627\u062A\u061B \u0623\u0639\u062F \u0636\u0628\u0637 \u0627\u0644\u0638\u0631\u0648\u0641 \u0644\u0641\u062D\u0635 \u0627\u0644\u0633\u062C\u0644\u0627\u062A.")}</div>${measurementPlotStudioMarkup(lang)}${flex3DMarkup(lang)}`;
    const st = wb.summary.stats, pooled = strata.pooled, boot = strata.bootstrap, highBand = c.pressureBands.find((b) => b.id === ">2atm");
    const metrics = Object.entries(st).map(
      ([k, v]) => {
        var _a2, _b2;
        return `<article class="card metric"><div class="label">${t({ burning_rate_mm_s: "Burning-rate constant", burn_time_s: "Burn time", initial_droplet_diameter_mm: "Initial droplet diameter", visible_flame_extinction_diameter_mm: "Visible flame extinction diameter" }[k] || k.replaceAll("_", " "), { burning_rate_mm_s: "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642", burn_time_s: "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642", initial_droplet_diameter_mm: "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A", visible_flame_extinction_diameter_mm: "\u0642\u0637\u0631 \u0625\u062E\u0645\u0627\u062F \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A" }[k] || k.replaceAll("_", " "))}</div><strong>${v.mean === null ? "\u2014" : v.mean.toFixed(3)}</strong><small>${t("Mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637")} \xB7 ${v.unit} \xB7 n=${v.n} \xB7 ${t("missing", "\u0645\u0641\u0642\u0648\u062F")}=${v.missing}</small><p class="sub">${t("Sample SD", "\u0627\u0644\u0627\u0646\u062D\u0631\u0627\u0641 \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A \u0644\u0644\u0639\u064A\u0646\u0629")} ${v.sd === null ? "\u2014" : v.sd.toFixed(3)} \xB7 ${t("range", "\u0627\u0644\u0646\u0637\u0627\u0642")} ${(_a2 = v.min) != null ? _a2 : "\u2014"}\u2013${(_b2 = v.max) != null ? _b2 : "\u2014"}</p></article>`;
      }
    ).join("");
    const table = `<article class="card" style="margin-top:15px"><div class="card-head"><div><h3>${t("Per-condition results", "\u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631")} \xB7 ${esc(varLabel)}</h3><p class="sub">${esc(wb.conditionLabel)} \xB7 ${t("grouped by fuel, pressure band and diluent. 95% CIs are seeded percentile bootstrap intervals", "\u0645\u062C\u0645\u0639\u0629 \u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0646\u0637\u0627\u0642 \u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641. \u0641\u0648\u0627\u0635\u0644 \u0627\u0644\u062B\u0642\u0629 95% \u0645\u062D\u0633\u0648\u0628\u0629 \u0628\u0625\u0639\u0627\u062F\u0629 \u0645\u0639\u0627\u064A\u0646\u0629 bootstrap \u0630\u0627\u062A \u0628\u0630\u0631\u0629 \u062B\u0627\u0628\u062A\u0629")} (seed ${boot.seed}, ${boot.resamples} ${t("resamples; withheld when n", "\u0625\u0639\u0627\u062F\u0629 \u0645\u0639\u0627\u064A\u0646\u0629\u061B \u0644\u0627 \u062A\u064F\u0639\u0631\u0636 \u0639\u0646\u062F\u0645\u0627 n")} &lt; ${boot.minN}.</p></div><span class="tag comp">${t("COMPUTED", "\u0645\u062D\u0633\u0648\u0628")}</span></div><div class="table-wrap"><table><thead><tr><th>${t("Condition", "\u0627\u0644\u0638\u0631\u0641")}</th><th>${t("Tests", "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A")}</th><th>n</th><th>${t("Mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637")}</th><th>95% CI (${t("mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637")})</th><th>SD (${t("sample", "\u0627\u0644\u0639\u064A\u0646\u0629")})</th><th>Pearson r \xB7 ${t("diameter vs burning rate", "\u0627\u0644\u0642\u0637\u0631 \u0645\u0642\u0627\u0628\u0644 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642")}</th><th>95% CI (r)</th></tr></thead><tbody>${wbGroupRow(filtered ? `${wb.conditionLabel} (${t("all", "\u0627\u0644\u0643\u0644")})` : t("All tests (pooled)", "\u0643\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A (\u0645\u062C\u0645\u0639\u0629)"), pooled, true)}${strata.groups.map((g) => wbGroupRow(g.label, g)).join("")}</tbody></table></div><div class="callout warn" style="margin-top:12px">${filtered ? t("Oxygen fraction, diluent fraction and droplet size still vary among tests within each row.", "\u0645\u0627 \u062A\u0632\u0627\u0644 \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641 \u0648\u062D\u062C\u0645 \u0627\u0644\u0642\u0637\u0631\u0629 \u062A\u062E\u062A\u0644\u0641 \u0628\u064A\u0646 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u0635\u0641 \u0627\u0644\u0648\u0627\u062D\u062F.") : t("The first row pools different fuels, pressures and diluents; prefer the per-condition rows.", "\u064A\u062C\u0645\u0639 \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u0648\u0644 \u0623\u0646\u0648\u0627\u0639 \u0648\u0642\u0648\u062F \u0648\u0636\u063A\u0648\u0637\u0627\u064B \u0648\u063A\u0627\u0632\u0627\u062A \u0645\u062E\u0641\u0641\u0629 \u0645\u062E\u062A\u0644\u0641\u0629\u061B \u0627\u0639\u062A\u0645\u062F \u0635\u0641\u0648\u0641 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u0646\u0641\u0635\u0644\u0629.")} ${t("The >2 atm band spans 2.0\u20133.1 atm and contains", "\u064A\u0645\u062A\u062F \u0646\u0637\u0627\u0642 >2 atm \u0645\u0646 2.0 \u0625\u0644\u0649 3.1 atm \u0648\u064A\u0636\u0645")} ${(_b = highBand == null ? void 0 : highBand.n) != null ? _b : 0} ${t("tests. Intervals describe resampling, not instrument uncertainty.", "\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u064B. \u062A\u0635\u0641 \u0627\u0644\u0641\u0648\u0627\u0635\u0644 \u0625\u0639\u0627\u062F\u0629 \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0648\u0644\u0627 \u062A\u0645\u062B\u0644 \u0639\u062F\u0645 \u064A\u0642\u064A\u0646 \u0627\u0644\u0623\u062C\u0647\u0632\u0629.")}</div></article>`;
    const assoc = `<article class="card"><div class="card-head"><div><h3>${t("Exploratory association", "\u0627\u0631\u062A\u0628\u0627\u0637 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A")}</h3><p class="sub">${t("Initial droplet diameter vs. burning rate", "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A \u0645\u0642\u0627\u0628\u0644 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642")} \xB7 ${esc(wb.conditionLabel)}</p></div><span class="tag comp">${t("COMPUTED", "\u0645\u062D\u0633\u0648\u0628")}</span></div><div style="font-size:34px;font-weight:800;margin:18px 0">${(_d = (_c = wb.associations.r) == null ? void 0 : _c.toFixed(3)) != null ? _d : "\u2014"}</div><p class="sub">Pearson r \xB7 n = ${wb.associations.n} \xB7 95% CI ${wb.associations.r === null ? "\u2014" : ciCell(pooled.association.ci95)}. ${t("Conditions still vary within this selection, so this association cannot establish causality.", "\u062A\u0628\u0642\u0649 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u062A\u063A\u064A\u0631\u0629 \u0636\u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u060C \u0644\u0630\u0644\u0643 \u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0627\u0631\u062A\u0628\u0627\u0637 \u0639\u0644\u0627\u0642\u0629 \u0633\u0628\u0628\u064A\u0629.")}</p><div class="callout warn">${t("No hypothesis test is run. Small-group r values are exploratory.", "\u0644\u0645 \u064A\u064F\u062C\u0631\u064E \u0627\u062E\u062A\u0628\u0627\u0631 \u0641\u0631\u0636\u064A\u0629. \u0642\u064A\u0645 r \u0644\u0644\u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0627\u0644\u0635\u063A\u064A\u0631\u0629 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A\u0629.")}</div></article>`;
    const methods = `<article class="card"><h3>${t("Methods & reproducibility", "\u0627\u0644\u0637\u0631\u0642 \u0648\u0642\u0627\u0628\u0644\u064A\u0629 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C")}</h3><div class="list-row"><span>${t("Mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637")}</span><b>${t("Arithmetic mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u064A")}</b></div><div class="list-row"><span>${t("Spread", "\u0627\u0644\u062A\u0634\u062A\u062A")}</span><b>${t("Sample standard deviation (n \u2212 1)", "\u0627\u0644\u0627\u0646\u062D\u0631\u0627\u0641 \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A \u0644\u0644\u0639\u064A\u0646\u0629 (n \u2212 1)")}</b></div><div class="list-row"><span>${t("Interval", "\u0627\u0644\u0641\u0627\u0635\u0644")}</span><b>95% ${t("percentile bootstrap", "bootstrap \u0627\u0644\u0645\u0626\u064A\u0646\u064A")} \xB7 seed ${boot.seed} \xB7 ${boot.resamples} \xB7 n \u2265 ${boot.minN}</b></div><div class="list-row"><span>${t("Grouping", "\u0627\u0644\u062A\u062C\u0645\u064A\u0639")}</span><b>${t("Fuel \xB7 pressure band \xB7 diluent", "\u0627\u0644\u0648\u0642\u0648\u062F \xB7 \u0646\u0637\u0627\u0642 \u0627\u0644\u0636\u063A\u0637 \xB7 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641")}</b></div><div class="list-row"><span>${t("Missing values", "\u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629")}</span><b>${t("Excluded per variable; no imputation", "\u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0644\u0643\u0644 \u0645\u062A\u063A\u064A\u0631\u061B \u0628\u0644\u0627 \u062A\u0639\u0648\u064A\u0636")}</b></div><div class="list-row"><span>${t("Source table", "\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631")}</span><b>NASA PSI-69</b></div><div class="list-row"><span>${t("Software", "\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C")}</span><b>MORS AEGIS 3.0 \xB7 JS</b></div></article>`;
    return `${pageHead(t("Scientific Analysis Workbench", "\u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0639\u0644\u0645\u064A"), t("Reproducible statistics computed from source rows by test condition; nulls are excluded per variable.", "\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0642\u0627\u0628\u0644\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0645\u0646 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0628\u062D\u0633\u0628 \u0638\u0631\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u061B \u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0641\u0627\u0631\u063A\u0629 \u0644\u0643\u0644 \u0645\u062A\u063A\u064A\u0631."))}${bar}${scientificChartGallery(dataset.rows)}${measurementPlotStudioMarkup(lang)}${flex3DMarkup(lang)}<div class="grid three" style="margin-top:15px">${metrics}</div>${table}<div class="grid two" style="margin-top:15px">${assoc}${methods}</div>`;
  }
  function comparePage() {
    return `${pageHead(t("Experiment Comparison Studio", "\u0627\u0633\u062A\u0648\u062F\u064A\u0648 \u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u0628"), t("Compare two FLEX tests. Differences are computed only when fuel and gas composition match.", "\u0642\u0627\u0631\u0646 \u0627\u062E\u062A\u0628\u0627\u0631\u064A\u0646 \u0645\u0646 FLEX. \u0644\u0627 \u062A\u064F\u062D\u0633\u0628 \u0627\u0644\u0641\u0631\u0648\u0642 \u0625\u0644\u0627 \u0625\u0630\u0627 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u063A\u0627\u0632."))}<div class="grid two"><article class="card"><h3>${t("Test A", "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 A")}</h3><label class="field-label">${t("Select record", "\u0627\u062E\u062A\u0631 \u0633\u062C\u0644\u0627\u064B")}</label><select id="compareA" class="field">${dataset.rows.map((r) => {
      var _a;
      return `<option value="${esc(r.id)}">${esc(r.id)} \xB7 ${(_a = r.burning_rate_mm_s) != null ? _a : "\u2014"} mm\xB2/s</option>`;
    }).join("")}</select><div id="compareResultA"></div></article><article class="card"><h3>${t("Test B", "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 B")}</h3><label class="field-label">${t("Select record", "\u0627\u062E\u062A\u0631 \u0633\u062C\u0644\u0627\u064B")}</label><select id="compareB" class="field">${dataset.rows.map((r, i) => {
      var _a;
      return `<option value="${esc(r.id)}" ${i === 1 ? "selected" : ""}>${esc(r.id)} \xB7 ${(_a = r.burning_rate_mm_s) != null ? _a : "\u2014"} mm\xB2/s</option>`;
    }).join("")}</select><div id="compareResultB"></div></article></div><article class="card" style="margin-top:15px"><div class="card-head"><div><h3>${t("Paired variables", "\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629")}</h3><p class="sub">${t("Observed source values shown side by side", "\u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629 \u0645\u0639\u0631\u0648\u0636\u0629 \u062C\u0646\u0628\u0627\u064B \u0625\u0644\u0649 \u062C\u0646\u0628")}</p></div><span class="tag obs">${t("OBSERVED", "\u0645\u0631\u0635\u0648\u062F")}</span></div><div id="compareTable"></div></article><div class="callout warn" style="margin-top:14px">${t("These are individual records, not controlled matched groups. A difference does not establish a physical effect.", "\u0647\u0630\u0647 \u0633\u062C\u0644\u0627\u062A \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0646\u0641\u0631\u062F\u0629 \u0648\u0644\u064A\u0633\u062A \u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0645\u0636\u0628\u0648\u0637\u0629 \u0648\u0645\u062A\u0637\u0627\u0628\u0642\u0629\u061B \u0648\u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0638\u0627\u0647\u0631 \u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062B\u0631\u0627\u064B \u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0627\u064B.")}</div>`;
  }
  function renderCompare() {
    var _a, _b;
    const a = dataset.rows.find((r) => r.id === $("#compareA").value), b = dataset.rows.find((r) => r.id === $("#compareB").value);
    for (const [id, r] of [
      ["compareResultA", a],
      ["compareResultB", b]
    ])
      $("#" + id).innerHTML = `<div style="margin:20px 0 5px;font-size:29px;font-weight:800">${(_a = r.burning_rate_mm_s) != null ? _a : "\u2014"} <small style="font-size:11px;color:var(--muted)">mm\xB2/s</small></div><p class="sub">${r.date} ${(_b = r.time_utc) != null ? _b : "\u2014"} UTC \xB7 ${r.test_end}</p>`;
    const conditions = [
      "fuel",
      "oxygen_mole_fraction",
      "nitrogen_mole_fraction",
      "carbon_dioxide_mole_fraction",
      "helium_mole_fraction"
    ];
    const mismatched = conditions.filter((k) => a[k] == null || b[k] == null || a[k] !== b[k]);
    const comparable = a.id !== b.id && mismatched.length === 0;
    const keys = [
      ...conditions,
      "pressure_mmHg",
      "initial_droplet_diameter_mm",
      "visible_flame_extinction_diameter_mm",
      "burning_rate_mm_s",
      "burn_time_s"
    ];
    const difference = (k) => !conditions.includes(k) && comparable && Number.isFinite(a[k]) && Number.isFinite(b[k]) ? (b[k] - a[k]).toFixed(3) : "\u2014";
    const notice = comparable ? "" : `<div class="callout warn" style="margin-bottom:12px">${a.id === b.id ? t("Select two different tests.", "\u0627\u062E\u062A\u0631 \u0627\u062E\u062A\u0628\u0627\u0631\u064A\u0646 \u0645\u062E\u062A\u0644\u0641\u064A\u0646.") : `${t("Differences withheld; the tests differ in", "\u062D\u064F\u062C\u0628\u062A \u0627\u0644\u0641\u0631\u0648\u0642 \u0644\u0627\u062E\u062A\u0644\u0627\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u064A\u0646 \u0641\u064A")} ${mismatched.map((k) => k.replaceAll("_", " ")).join(", ")}. ${t("A numeric comparison requires the same fuel and gas composition.", "\u062A\u062A\u0637\u0644\u0628 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0639\u062F\u062F\u064A\u0629 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u063A\u0627\u0632.")}`}</div>`;
    $("#compareTable").innerHTML = `${notice}<table><thead><tr><th>${t("Variable", "\u0627\u0644\u0645\u062A\u063A\u064A\u0631")}</th><th>${esc(a.id)}</th><th>${esc(b.id)}</th><th>${t("Difference \xB7 B \u2212 A", "\u0627\u0644\u0641\u0631\u0642 \xB7 B \u2212 A")}</th></tr></thead><tbody>${keys.map((k) => {
      var _a2, _b2;
      return `<tr${mismatched.includes(k) ? ' class="mismatch"' : ""}><td>${k.replaceAll("_", " ")}</td><td>${esc((_a2 = a[k]) != null ? _a2 : "\u2014")}</td><td>${esc((_b2 = b[k]) != null ? _b2 : "\u2014")}</td><td>${difference(k)}</td></tr>`;
    }).join("")}</tbody></table>`;
  }
  function copilot() {
    const ar = lang === "ar";
    return `${pageHead(ar ? "\u0645\u0633\u0627\u0639\u062F \u0623\u0628\u062D\u0627\u062B MORS AEGIS" : "AEGIS AI Research Chat", ar ? "\u0645\u0633\u0627\u0639\u062F \u0628\u062D\u062B\u064A \u062A\u0641\u0627\u0639\u0644\u064A \u0644\u0628\u064A\u0627\u0646\u0627\u062A NASA PSI-69\u061B \u064A\u062D\u0633\u0628 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u064A\u0641\u0635\u0644\u0647\u0627 \u0639\u0646 \u062A\u0641\u0633\u064A\u0631 AI." : "Ask the AI about NASA PSI-69 evidence, methods, statistics, or limitations. Computed results are shown separately from AI interpretation.")}<article class="card copilot-brief"><div><span class="eyebrow">${ar ? "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644 \u0645\u0633\u0627\u0639\u062F AI" : "HOW THE AI COPILOT WORKS"}</span><p>${ar ? "\u064A\u062D\u0648\u0651\u0644 \u0633\u0624\u0627\u0644\u0643 \u0625\u0644\u0649 \u062A\u062D\u0644\u064A\u0644 \u0645\u062D\u062F\u062F\u060C \u064A\u062D\u0633\u0628 \u0627\u0644\u062C\u0648\u0627\u0628 \u0645\u0646 \u0635\u0641\u0648\u0641 NASA \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629\u060C \u062B\u0645 \u064A\u0636\u064A\u0641 \u062A\u0641\u0633\u064A\u0631\u0627\u064B \u0642\u0635\u064A\u0631\u0627\u064B \u0636\u0645\u0646 \u062D\u062F\u0648\u062F \u0627\u0644\u062F\u0644\u064A\u0644." : "Your question selects a bounded analysis; deterministic tools compute results from NASA source rows, then AI adds a short evidence-bounded interpretation."}</p></div><ol><li>${ar ? "\u0627\u0633\u0623\u0644 \u0639\u0646 \u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0623\u0648 \u0627\u0644\u0639\u0644\u0627\u0642\u0629 \u0623\u0648 \u0645\u0642\u0627\u0631\u0646\u0629 \u0633\u062C\u0644\u064A\u0646 \u0623\u0648 \u062D\u062F\u0648\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A." : "Ask for a mean, association, two-record comparison, or data limitation."}</li><li>${ar ? "\u0627\u0642\u0631\u0623 \u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0645\u062D\u0633\u0648\u0628\u0629 \u0648\u0645\u0635\u062F\u0631 PSI-69 \u0645\u0646\u0641\u0635\u0644\u0629 \u0639\u0646 \u0635\u064A\u0627\u063A\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C." : "Read the computed result and PSI-69 citation separately from model wording."}</li><li>${ar ? "\u0625\u0630\u0627 \u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0646\u0645\u0648\u0630\u062C\u060C \u064A\u0628\u0642\u0649 \u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u0639\u0644\u0645\u064A \u0627\u0644\u062D\u062A\u0645\u064A \u0645\u062A\u0627\u062D\u0627\u064B." : "If the model is offline, the deterministic research summary remains available."}</li></ol></article><article class="card chat-shell"><div class="chat-top"><div class="chat-brand"><div class="chat-avatar">\u2727</div><div><h3>${ar ? "\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0639\u0644\u0645\u064A" : "AEGIS Research Assistant"}</h3><p class="sub">${ar ? "NASA PSI-69 \xB7 \u062C\u062F\u0648\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0643\u0627\u0645\u0644 \xB7 DOI 10.60555/mbq8-0451" : "NASA PSI-69 \xB7 full experimental table \xB7 DOI 10.60555/mbq8-0451"}</p></div></div><div class="chat-top-actions"><span class="tag" id="copilotMode">${ar ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062E\u062F\u0645\u0629\u2026" : "Checking provider\u2026"}</span><button class="outline-btn" id="newChat" type="button">${ar ? "\u0645\u062D\u0627\u062F\u062B\u0629 \u062C\u062F\u064A\u062F\u0629" : "New chat"}</button></div></div><div class="chat-context"><span class="tag obs">OBSERVED \xB7 PSI-69</span><span class="tag comp">COMPUTED \xB7 ${ar ? "\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0648\u0635\u0641\u064A\u0629" : "descriptive statistics"}</span><span class="tag">${ar ? "\u0627\u0644\u0633\u062C\u0644 \u0645\u062D\u0641\u0648\u0638 \u0645\u062D\u0644\u064A\u064B\u0627 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D" : "Chat saved locally in this browser"}</span></div><div class="chat-log" id="chatLog" role="log" aria-live="polite" aria-relevant="additions text"></div><div id="chatTyping" class="chat-typing" hidden>${ar ? "\u064A\u0641\u062D\u0635 \u0627\u0644\u0623\u062F\u0644\u0629\u2026" : "Checking the evidence\u2026"}</div><div class="chat-suggestions" id="chatSuggestions"><button class="suggestion" data-question="${t("What is the mean burning rate, and how was it computed?", "\u0645\u0627 \u0645\u062A\u0648\u0633\u0637 \u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u060C \u0648\u0643\u064A\u0641 \u062D\u064F\u0633\u0628\u061F")}">${t("Mean burning rate", "\u0645\u062A\u0648\u0633\u0637 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642")}</button><button class="suggestion" data-question="${t("What do these records tell us about droplet diameter and burning rate?", "\u0645\u0627\u0630\u0627 \u062A\u062E\u0628\u0631\u0646\u0627 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0639\u0646 \u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0648\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u061F")}">${t("Explore relationship", "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0639\u0644\u0627\u0642\u0629")}</button><button class="suggestion" data-question="${t("What are the main limitations of this table?", "\u0645\u0627 \u0623\u0628\u0631\u0632 \u062D\u062F\u0648\u062F \u0647\u0630\u0627 \u0627\u0644\u062C\u062F\u0648\u0644\u061F")}">${t("Evidence limits", "\u062D\u062F\u0648\u062F \u0627\u0644\u0623\u062F\u0644\u0629")}</button></div><div class="chat-compose"><form id="chatForm"><textarea class="field" id="question" rows="2" maxlength="1500" required aria-label="${ar ? "\u0631\u0633\u0627\u0644\u0629 \u0625\u0644\u0649 \u0645\u0633\u0627\u0639\u062F \u0623\u0628\u062D\u0627\u062B AEGIS" : "Message AEGIS research assistant"}" placeholder="${ar ? "\u0627\u0643\u062A\u0628 \u0633\u0624\u0627\u0644\u0643 \u0639\u0646 \u0627\u0644\u0623\u062F\u0644\u0629\u2026" : "Message AEGIS about the evidence\u2026"}"></textarea><button class="primary-btn chat-send" id="chatSend" type="submit">${ar ? "\u0625\u0631\u0633\u0627\u0644 \u2191" : "Send \u2191"}</button></form><div class="chat-disclosure">${ar ? "\u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629 \u0641\u064A \u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0641\u0642\u0637. \u0644\u0627 \u062A\u062F\u062E\u0644 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0634\u062E\u0635\u064A\u0629 \u0623\u0648 \u0633\u0631\u064A\u0629." : "Conversation is stored in this browser only. Do not enter personal or confidential information."} \xB7 ${ar ? "\u062A\u064F\u0631\u0633\u0644 \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0628\u062D\u062B \u0625\u0644\u0649 \u0646\u0645\u0648\u0630\u062C \u0645\u062D\u0644\u064A \u0639\u0628\u0631 \u0634\u0628\u0643\u0629 Tailscale \u0627\u0644\u062E\u0627\u0635\u0629\u060C \u0623\u0648 \u064A\u0639\u0631\u0636 \u0627\u0644\u0646\u0638\u0627\u0645 \u0645\u0644\u062E\u0635\u0627\u064B \u0645\u062D\u0644\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u0648\u0642\u0641 \u0627\u0644\u0646\u0645\u0648\u0630\u062C." : "Questions go to a local model over private Tailscale; a deterministic evidence summary appears if it is offline."}</div></div></article>`;
  }
  function missionLessons() {
    const ar = lang === "ar";
    const incidents = [
      {
        title: "Apollo 1 \xB7 Pad test, 1967",
        tag: ar ? "\u062D\u0627\u062F\u062B \u0623\u0631\u0636\u064A \xB7 \u0644\u064A\u0633 \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u0627\u0630\u0628\u064A\u0629 \u0635\u063A\u0631\u0649" : "GROUND INCIDENT \xB7 NOT MICROGRAVITY DATA",
        facts: ar ? "\u0643\u0627\u0646 \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u0625\u0637\u0644\u0627\u0642 \u062F\u0627\u062E\u0644 \u0627\u0644\u0643\u0628\u0633\u0648\u0644\u0629 \u0627\u0644\u0645\u0636\u063A\u0648\u0637\u0629 \u0628\u0623\u0643\u0633\u062C\u064A\u0646 \u0646\u0642\u064A. \u0644\u0645 \u064A\u062D\u062F\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0645\u0635\u062F\u0631 \u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u0627\u062D\u062F\u0627\u064B \u0628\u0634\u0643\u0644 \u0642\u0627\u0637\u0639\u060C \u0644\u0643\u0646\u0647 \u0648\u062C\u062F \u0623\u062F\u0644\u0629 \u0639\u0644\u0649 \u062A\u0642\u0648\u0633 \u0643\u0647\u0631\u0628\u0627\u0626\u064A. \u0623\u062F\u0649 \u0627\u0644\u062C\u0648 \u0627\u0644\u063A\u0646\u064A \u0628\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0625\u0644\u0649 \u0627\u0646\u062A\u0634\u0627\u0631 \u0633\u0631\u064A\u0639 \u0648\u0627\u0631\u062A\u0641\u0627\u0639 \u0627\u0644\u0636\u063A\u0637\u060C \u0648\u062A\u0639\u0630\u0631 \u0641\u062A\u062D \u0627\u0644\u0641\u062A\u062D\u0629 \u0628\u0633\u0631\u0639\u0629." : "The prelaunch capsule test used a pressurized, pure-oxygen atmosphere. Investigators did not identify one definitive ignition source, but found evidence of electrical arcing. The oxygen-rich environment supported rapid fire growth and pressure rise; the hatch could not be opened quickly.",
        insight: ar ? "\u062F\u0631\u0633 \u0627\u0644\u062A\u0635\u0645\u064A\u0645: \u0627\u0636\u0628\u0637 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u060C \u0648\u0631\u0627\u062C\u0639 \u0641\u062A\u062D\u0627\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u0648\u0627\u0644\u0625\u0646\u0642\u0627\u0630 \u0641\u064A \u0638\u0631\u0648\u0641 \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0641\u0639\u0644\u064A\u0629. \u0627\u0644\u062D\u0627\u062F\u062B \u064A\u0648\u0636\u062D \u0627\u0644\u062E\u0637\u0631 \u0648\u0644\u0627 \u064A\u0642\u064A\u0633 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628 \u0641\u064A \u0627\u0646\u0639\u062F\u0627\u0645 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629." : "Design lesson: control ignition sources and combustible materials, and validate egress and rescue under the actual pressure condition. This incident demonstrates a hazard; it does not measure flame spread in microgravity.",
        url: "https://sma.nasa.gov/sma-disciplines/accllp/apollo-1",
        label: "NASA Apollo 1 accident record"
      },
      {
        title: "Apollo 13 \xB7 Oxygen-tank failure, 1970",
        tag: ar ? "\u0639\u0637\u0644 \u0646\u0638\u0627\u0645 \u0623\u0643\u0633\u062C\u064A\u0646 \xB7 \u0644\u064A\u0633 \u062A\u062C\u0631\u0628\u0629 \u0644\u0647\u0628" : "OXYGEN-SYSTEM FAILURE \xB7 NOT A FLAME TEST",
        facts: ar ? "\u062A\u0636\u0631\u0631\u062A \u0623\u0633\u0644\u0627\u0643 \u0648\u0639\u0648\u0627\u0632\u0644 \u062F\u0627\u062E\u0644 \u062E\u0632\u0627\u0646 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0628\u0639\u062F \u062A\u0633\u062E\u064A\u0646 \u0645\u0641\u0631\u0637 \u0641\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0623\u0631\u0636\u064A\u060C \u062B\u0645 \u0648\u0642\u0639 \u0627\u0646\u0641\u062C\u0627\u0631 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0631\u062D\u0644\u0629 \u0648\u0641\u064F\u0642\u062F \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0637\u0627\u0642\u0629 \u0645\u0646 \u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0648\u0642\u0648\u062F. \u0643\u0627\u0646\u062A \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u062A\u0641\u0627\u0639\u0644\u0627\u064B \u0628\u064A\u0646 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0648\u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0647\u0646\u062F\u0633\u064A \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631." : "Wiring and insulation inside an oxygen tank were damaged by overheating during ground testing. The tank later failed in flight, causing oxygen loss and fuel-cell power loss. The review identified interacting design, configuration, and test-process failures.",
        insight: ar ? "\u062F\u0631\u0633 \u0627\u0644\u062A\u0635\u0645\u064A\u0645: \u062A\u062A\u0628\u0639 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u062A\u0647\u064A\u0626\u0629\u060C \u0648\u0647\u0648\u0627\u0645\u0634 \u062F\u0631\u062C\u0627\u062A \u0627\u0644\u062D\u0631\u0627\u0631\u0629 \u0648\u0627\u0644\u062C\u0647\u062F\u060C \u0648\u0627\u0639\u0632\u0644 \u0623\u0639\u0637\u0627\u0644 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0637\u0627\u0642\u0629. \u0644\u0627 \u0646\u0639\u0627\u0645\u0644 \u0627\u0646\u0641\u062C\u0627\u0631 \u0627\u0644\u062E\u0632\u0627\u0646 \u0643\u0642\u064A\u0627\u0633 \u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629." : "Design lesson: maintain configuration control, temperature and voltage margins, and fault isolation for oxygen and power systems. Do not treat the tank failure as a cabin-fire propagation measurement.",
        url: "https://sma.nasa.gov/sma-disciplines/accllp/apollo-13",
        label: "NASA Apollo 13 accident record"
      },
      {
        title: "Mir \xB7 Solid-fuel oxygen generator fire, 1997",
        tag: ar ? "\u062D\u0631\u064A\u0642 \u0639\u0644\u0649 \u0645\u062A\u0646 \u0645\u062D\u0637\u0629 \xB7 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0627\u0644\u062F\u062E\u0627\u0646" : "ON-ORBIT FIRE \xB7 CREW RESPONSE & SMOKE",
        facts: ar ? "\u0627\u0634\u062A\u0639\u0644 \u0645\u0648\u0644\u062F \u0623\u0643\u0633\u062C\u064A\u0646 \u0643\u064A\u0645\u064A\u0627\u0626\u064A \u0635\u0644\u0628 \u0623\u062B\u0646\u0627\u0621 \u0648\u062C\u0648\u062F \u0633\u062A\u0629 \u0623\u0641\u0631\u0627\u062F. \u0623\u0646\u062A\u062C \u0644\u0647\u0628\u0627\u064B \u0648\u0634\u0631\u0631\u0627\u064B \u0648\u062F\u062E\u0627\u0646\u0627\u064B \u0643\u062B\u064A\u0641\u0627\u064B \u0648\u0633\u062F\u0651 \u0645\u0633\u0627\u0631\u0627\u064B \u0625\u0644\u0649 \u0645\u0631\u0643\u0628\u0629 \u0647\u0631\u0648\u0628. \u0623\u062E\u0645\u062F \u0627\u0644\u0637\u0627\u0642\u0645 \u0627\u0644\u062D\u0631\u064A\u0642 \u0628\u0637\u0641\u0627\u064A\u0627\u062A\u061B \u062B\u0645 \u0627\u062D\u062A\u0627\u062C\u062A \u0623\u0646\u0638\u0645\u0629 \u062F\u0639\u0645 \u0627\u0644\u062D\u064A\u0627\u0629 \u0633\u0627\u0639\u0627\u062A \u0644\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062F\u062E\u0627\u0646. \u0631\u062C\u0651\u062D \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u062F\u062E\u0648\u0644 \u0645\u0627\u062F\u0629 \u0647\u064A\u062F\u0631\u0648\u0643\u0631\u0628\u0648\u0646\u064A\u0629 \u0625\u0644\u0649 \u0627\u0644\u0639\u0628\u0648\u0629." : "A solid-fuel oxygen generator ignited with six crew aboard, producing flame, sparks, and dense smoke that blocked an escape route. The crew used extinguishers; life support took hours to clear the smoke. Investigators later considered hydrocarbon contamination of the canister the likely cause.",
        insight: ar ? "\u062F\u0631\u0633 \u0627\u0644\u062A\u0635\u0645\u064A\u0645: \u0642\u064A\u0651\u0645 \u0645\u0648\u0644\u062F\u0627\u062A \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0643\u0645\u0635\u062F\u0631 \u0627\u0634\u062A\u0639\u0627\u0644 \u0645\u0633\u062A\u0642\u0644\u060C \u062E\u0637\u0637 \u0644\u0644\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0628\u062F\u064A\u0644\u0629\u060C \u0648\u0627\u062C\u0645\u0639 \u0628\u064A\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0648\u0643\u0634\u0641 \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u062A\u0646\u0642\u064A\u062A\u0647. \u0647\u0630\u0627 \u062D\u0627\u062F\u062B \u062A\u0634\u063A\u064A\u0644\u064A \u0648\u0644\u064A\u0633 \u062A\u062C\u0631\u0628\u0629 \u0627\u062D\u062A\u0631\u0627\u0642 \u0645\u0636\u0628\u0648\u0637\u0629." : "Design lesson: treat oxygen-generation hardware as a potential ignition source, protect alternate egress, and combine training, suppression, smoke detection, and cleanup. This is an operational incident, not a controlled combustion experiment.",
        url: "https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/",
        label: "NASA Mir fire history"
      }
    ];
    const transfers = [
      {
        title: ar ? "\u0643\u0634\u0641 \u0627\u0644\u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0628\u0643\u0631" : "Incipient-fire detection",
        facts: ar ? "\u064A\u0639\u0631\u0636 \u0645\u0648\u0631\u062F NASA Spinoff \u0643\u0627\u0634\u0641\u0627\u064B \u0644\u0645\u0643\u0648\u0643 \u0627\u0644\u0641\u0636\u0627\u0621 \u064A\u0631\u0635\u062F \u062C\u0633\u064A\u0645\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0648\u064A\u0645\u064A\u0651\u0632\u0647\u0627 \u0639\u0646 \u0627\u0644\u063A\u0628\u0627\u0631\u060C \u0648\u0642\u062F \u0635\u064F\u0645\u0645 \u0644\u0644\u062A\u0646\u0628\u064A\u0647 \u0642\u0628\u0644 \u0638\u0647\u0648\u0631 \u0644\u0647\u0628 \u0623\u0648 \u062F\u062E\u0627\u0646 \u0648\u0627\u0636\u062D." : "The NASA Spinoff resource describes a Shuttle detector that samples combustion particles and distinguishes them from dust, aiming to signal a fire condition before visible flame or smoke.",
        use: ar ? "\u0641\u0631\u0635\u0629 \u0628\u062D\u062B: \u0627\u062E\u062A\u0628\u0631 \u0632\u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0648\u0627\u0644\u0625\u0646\u0630\u0627\u0631\u0627\u062A \u0627\u0644\u0643\u0627\u0630\u0628\u0629 \u0645\u0639 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0648\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0645\u0631\u0643\u0628\u0627\u062A \u0627\u0644\u0645\u0623\u0647\u0648\u0644\u0629." : "Research opportunity: test response time and false alarms across smoke/aerosol types and ventilation paths relevant to crewed vehicles.",
        url: "https://spinoff.nasa.gov/node/9407",
        label: "NASA Spinoff \xB7 Fire Detector"
      },
      {
        title: ar ? "\u0645\u0639\u062F\u0627\u062A \u062A\u0646\u0641\u0633 \u0623\u062E\u0641" : "Lighter firefighter air tanks",
        facts: ar ? "\u064A\u0648\u062B\u0642 \u0627\u0644\u0645\u0648\u0631\u062F \u062A\u0639\u0627\u0648\u0646\u0627\u064B \u0644\u0646\u0642\u0644 \u062A\u0635\u0645\u064A\u0645 \u0623\u0633\u0637\u0648\u0627\u0646\u0629 \u0645\u0631\u0643\u0628\u0629 \u0623\u062E\u0641 \u0645\u0639 \u0642\u0646\u0627\u0639 \u0623\u0648\u0636\u062D \u0648\u0645\u0646\u0628\u0647 \u0634\u062E\u0635\u064A \u0644\u0627\u0646\u062E\u0641\u0627\u0636 \u0627\u0644\u0647\u0648\u0627\u0621 \u0625\u0644\u0649 \u0645\u0639\u062F\u0627\u062A \u0631\u062C\u0627\u0644 \u0627\u0644\u0625\u0637\u0641\u0627\u0621." : "The resource documents transfer of a lighter composite air-tank design, improved mask visibility, and a personal low-air warning to firefighter equipment.",
        use: ar ? "\u0635\u0644\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639: \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0648\u0627\u0644\u0625\u0646\u0630\u0627\u0631 \u0648\u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A \u0639\u0646\u0627\u0635\u0631 \u0641\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0637\u0627\u0642\u0645\u061B \u0647\u0630\u0627 \u0627\u0644\u0645\u062B\u0627\u0644 \u0644\u0627 \u064A\u0628\u0631\u0631 \u062A\u063A\u064A\u064A\u0631 \u062E\u0644\u064A\u0637 \u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629." : "Project relevance: mobility, alerts, and reserve capacity matter to crew equipment; this example does not justify changing cabin oxygen composition.",
        url: "https://spinoff.nasa.gov/node/9582",
        label: "NASA Spinoff \xB7 Fireman's Air Tanks"
      },
      {
        title: ar ? "\u0645\u0648\u0627\u062F \u0645\u0644\u0627\u0628\u0633 \u0648\u0627\u0642\u064A\u0629" : "Protective clothing materials",
        facts: ar ? "\u064A\u0635\u0641 Project FIRES \u062A\u0643\u064A\u064A\u0641 \u0645\u0648\u0627\u062F \u0648\u062A\u0635\u0627\u0645\u064A\u0645 \u062E\u0641\u064A\u0641\u0629 \u0648\u0645\u0642\u0627\u0648\u0645\u0629 \u0644\u0644\u062D\u0631\u0627\u0631\u0629 \u0637\u064F\u0648\u0631\u062A \u0644\u0628\u062F\u0644\u0627\u062A \u0627\u0644\u0641\u0636\u0627\u0621 \u0623\u0648 \u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u064A\u0629 \u0625\u0644\u0649 \u0645\u0644\u0627\u0628\u0633 \u0631\u062C\u0627\u0644 \u0627\u0644\u0625\u0637\u0641\u0627\u0621." : "Project FIRES adapted lightweight, heat-protective materials and design concepts from spacesuits and spacecraft thermal protection for firefighter ensembles.",
        use: ar ? "\u0635\u0644\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639: \u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629 \u064A\u062D\u062A\u0627\u062C \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0648\u0631\u0627\u062D\u0629 \u0648\u0633\u0644\u0627\u0645\u0629 \u0645\u0633\u062A\u0642\u0644\u0629\u061B \u0646\u062C\u0627\u062D \u0645\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u0645\u0644\u0627\u0628\u0633 \u0644\u0627 \u064A\u062C\u0639\u0644\u0647\u0627 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u0623\u0648 \u0628\u062F\u0644\u0629 \u0641\u0636\u0627\u0621." : "Project relevance: technology transfer still requires independent performance, comfort, and safety testing; a material suitable for clothing is not automatically suitable for a spacecraft cabin or suit.",
        url: "https://spinoff.nasa.gov/node/9918",
        label: "NASA Spinoff \xB7 New Technology for the Fire Attire"
      }
    ];
    const card = (item) => `<article class="card"><div class="card-head"><h3>${item.title}</h3><span class="tag">${item.tag || (ar ? "\u0646\u0642\u0644 \u062A\u0642\u0646\u064A\u0629 \xB7 \u0644\u064A\u0633 \u0642\u064A\u0627\u0633 \u0627\u062D\u062A\u0631\u0627\u0642" : "TECH TRANSFER \xB7 NOT COMBUSTION DATA")}</span></div><p>${item.facts}</p><div class="callout">${item.insight || item.use}</div><a href="${item.url}" target="_blank" rel="noreferrer">${item.label} \u2197</a></article>`;
    return `${pageHead(ar ? "\u062F\u0631\u0648\u0633 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0645\u0627\u062A" : "Mission Safety Lessons", ar ? "\u062A\u062D\u0644\u064A\u0644 \u0645\u0648\u0627\u0631\u062F \u0646\u0627\u0633\u0627 \u0627\u0644\u062A\u064A \u0623\u0631\u0641\u0642\u0647\u0627 \u0627\u0644\u062A\u062D\u062F\u064A: \u062D\u0648\u0627\u062F\u062B \u0641\u0636\u0627\u0626\u064A\u0629 \u0648\u0646\u0642\u0644 \u062A\u0642\u0646\u064A\u0629\u060C \u0645\u0639 \u0641\u0635\u0644\u0647\u0627 \u0639\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628." : "Analyze the NASA incident histories and technology-transfer resources supplied with the challenge, separately from experiment data.")}<div class="callout warn"><b>${ar ? "\u062D\u062F\u0648\u062F \u0627\u0644\u062F\u0644\u064A\u0644:" : "Evidence boundary:"}</b> ${ar ? "\u0647\u0630\u0647 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u0634\u0631\u062D \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062E\u0637\u0631 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0648\u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629. \u0644\u0627 \u062A\u0636\u064A\u0641 \u0642\u064A\u0627\u0633\u0627\u062A \u0625\u0644\u0649 \u0642\u0627\u0639\u062F\u0629 NASA PSI \u0648\u0644\u0627 \u062A\u062B\u0628\u062A \u0623\u062B\u0631\u0627\u064B \u0633\u0628\u0628\u064A\u0627\u064B \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649." : "These records describe hazards, response, and technology transfer. They add no measurements to the NASA PSI dataset and do not establish causal effects in microgravity."}</div><h2 style="margin:22px 0 12px">${ar ? "\u062D\u0648\u0627\u062F\u062B \u0645\u0648\u062B\u0642\u0629 \u0645\u0646 \u0646\u0627\u0633\u0627" : "NASA incident records"}</h2><div class="grid three">${incidents.map(card).join("")}</div><h2 style="margin:22px 0 12px">${ar ? "\u0623\u0645\u062B\u0644\u0629 \u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629" : "Technology-transfer examples"}</h2><div class="grid three">${transfers.map(card).join("")}</div><article class="card" style="margin-top:15px"><h2>${ar ? "\u0643\u064A\u0641 \u062A\u062A\u062D\u0648\u0644 \u0625\u0644\u0649 \u0623\u0633\u0626\u0644\u0629 \u062A\u0635\u0645\u064A\u0645 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u061F" : "Turn lessons into testable design questions"}</h2><ol>${(ar ? ["\u0647\u0644 \u0627\u062E\u062A\u064F\u0628\u0631\u062A \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0645\u0643\u0648\u0646\u0627\u062A \u0639\u0646\u062F \u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A \u0648\u062A\u062F\u0641\u0642 \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0645\u0642\u0635\u0648\u062F\u061F", "\u0647\u0644 \u062A\u0643\u0634\u0641 \u0627\u0644\u062D\u0633\u0627\u0633\u0627\u062A \u0646\u0648\u0627\u062A\u062C \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0628\u0643\u0631 \u0648\u062A\u0641\u0635\u0644\u0647\u0627 \u0639\u0646 \u0627\u0644\u063A\u0628\u0627\u0631 \u0648\u0627\u0644\u0625\u0646\u0630\u0627\u0631\u0627\u062A \u0627\u0644\u0643\u0627\u0630\u0628\u0629\u061F", "\u0647\u0644 \u064A\u0628\u0642\u0649 \u0645\u0633\u0627\u0631 \u0647\u0631\u0648\u0628 \u0628\u062F\u064A\u0644 \u0645\u062A\u0627\u062D\u0627\u064B \u0645\u0639 \u062F\u062E\u0627\u0646 \u0643\u062B\u064A\u0641 \u0623\u0648 \u0639\u0637\u0644 \u0641\u064A \u0645\u0648\u0644\u062F \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646\u061F", "\u0647\u0644 \u0627\u062E\u062A\u064F\u0628\u0631\u062A \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0639\u0632\u0644 \u0648\u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0648\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062C\u0648 \u0645\u0639 \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629\u061F"] : ["Were materials and components tested at the intended oxygen partial pressure, total pressure, and airflow?", "Can detectors identify early combustion products while rejecting dust and nuisance alarms?", "Does an alternate egress route remain available during dense smoke or oxygen-generator failure?", "Were isolation, suppression, and atmosphere-cleanup procedures tested with representative crew and hardware?"]).map((x) => `<li>${x}</li>`).join("")}</ol><p class="sub">${ar ? "\u0647\u0630\u0647 \u0623\u0633\u0626\u0644\u0629 \u0628\u062D\u062B \u0648\u062A\u0623\u0647\u064A\u0644 \u0648\u0644\u064A\u0633\u062A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0623\u0648 \u062A\u0648\u0635\u064A\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u0644\u0644\u0645\u0631\u0643\u0628\u0627\u062A." : "These are research and qualification questions, not operational settings or certified spacecraft recommendations."}</p></article>`;
  }
  async function sourcesPage() {
    const evidence = await get("/api/challenge/catalog");
    const ar = lang === "ar";
    const challengeResources = [
      [
        "NASA PSI Data Repository \xB7 Combustion Science (challenge-specified source)",
        "https://psi.nasa.gov/physci/repo/search?q=combustion",
        "PRIMARY DATA"
      ],
      [
        "2026 Space Apps challenge video \xB7 Flame in Freefall",
        "https://www.youtube.com/watch?v=AVuEiKxOpc0",
        "OFFICIAL CHALLENGE VIDEO"
      ],
      [
        "NASA Combustion Science overview",
        "https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/",
        "CONTEXT"
      ],
      [
        "NASA ACME \xB7 candle-flame morphology in microgravity (visual context)",
        "https://science.nasa.gov/image-detail/candle-flames-3/",
        "VISUAL CONTEXT"
      ],
      ["NASA ScienceCasts \xB7 combustion on the ISS (2018)", "https://www.youtube.com/watch?v=W1oXykoz9zg", "VIDEO"],
      [
        "NASA Researcher's Guide to ISS Combustion Science",
        "https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/",
        "CONTEXT"
      ],
      ["Apollo 1 investigation and lessons", "https://sma.nasa.gov/sma-disciplines/accllp/apollo-1", "INCIDENT HISTORY"],
      [
        "Apollo 13 oxygen-tank investigation",
        "https://sma.nasa.gov/sma-disciplines/accllp/apollo-13",
        "INCIDENT HISTORY"
      ],
      [
        "Fire aboard Mir (1997)",
        "https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/",
        "INCIDENT HISTORY"
      ],
      ["NASA Spinoff \xB7 Fireman's air tanks", "https://spinoff.nasa.gov/node/9582", "TECHNOLOGY TRANSFER"],
      ["NASA Spinoff \xB7 Shuttle fire detector", "https://spinoff.nasa.gov/node/9407", "TECHNOLOGY TRANSFER"],
      ["NASA Spinoff \xB7 Firefighter attire", "https://spinoff.nasa.gov/node/9918", "TECHNOLOGY TRANSFER"]
    ];
    const categoryArabic = {
      "PRIMARY DATA": "\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629",
      CONTEXT: "\u0633\u064A\u0627\u0642 \u0639\u0644\u0645\u064A",
      "VISUAL CONTEXT": "\u0633\u064A\u0627\u0642 \u0628\u0635\u0631\u064A \u0639\u0644\u0645\u064A",
      VIDEO: "\u0641\u064A\u062F\u064A\u0648",
      "OFFICIAL CHALLENGE VIDEO": "\u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u062A\u062D\u062F\u064A \u0627\u0644\u0631\u0633\u0645\u064A",
      "INCIDENT HISTORY": "\u062D\u0648\u0627\u062F\u062B \u062A\u0627\u0631\u064A\u062E\u064A\u0629",
      "TECHNOLOGY TRANSFER": "\u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629"
    };
    return `${pageHead(t("Sources & Methods", "\u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0648\u0627\u0644\u0645\u0646\u0647\u062C\u064A\u0629"), t("Challenge data, background explanations, the official challenge video, and the separate NASA ScienceCasts video.", "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u062F\u064A \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639 \u0627\u0644\u0639\u0644\u0645\u064A\u0629 \u0648\u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u062A\u062D\u062F\u064A \u0627\u0644\u0631\u0633\u0645\u064A \u0648\u0641\u064A\u062F\u064A\u0648 NASA ScienceCasts \u0627\u0644\u0645\u0646\u0641\u0635\u0644."))}
    <article class="card"><h3>${t("Primary experimental evidence \xB7 NASA Physical Sciences Informatics", "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \xB7 NASA Physical Sciences Informatics")}</h3>
    <p class="sub">${t("The official challenge names NASA PSI Combustion Science as its data source. PSI is the challenge-specified evidence source. Separate NASA studies supplement the two missing plots and are listed below. The 24-record PSI index and file metadata are shown in Challenge Evidence. Sixteen original tables are bundled and linked to their NASA records; DOI and rights information are shown only when available. Eight manifest lookups returned no listing in this snapshot. PSI does not provide one harmonized cross-study experiment table.", "\u064A\u062D\u062F\u062F \u0627\u0644\u062A\u062D\u062F\u064A \u0627\u0644\u0631\u0633\u0645\u064A \u0645\u0633\u062A\u0648\u062F\u0639 NASA PSI Combustion Science \u0645\u0635\u062F\u0631\u0627\u064B \u0644\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u060C \u0648\u0647\u0648 \u0645\u0635\u062F\u0631 \u0627\u0644\u0623\u062F\u0644\u0629 \u0627\u0644\u0645\u062D\u062F\u062F \u0644\u0644\u062A\u062D\u062F\u064A. \u0623\u0636\u0641\u0646\u0627 \u0623\u062F\u0646\u0627\u0647 \u062F\u0631\u0627\u0633\u0627\u062A NASA \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0644\u0645\u062E\u0637\u0637\u064A\u0646 \u0645\u0639 \u0641\u0635\u0644\u0647\u0627 \u0628\u0648\u0636\u0648\u062D \u0639\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u062F\u064A. \u064A\u0639\u0631\u0636 \u0642\u0633\u0645 \u0623\u062F\u0644\u0629 \u0627\u0644\u062A\u062D\u062F\u064A \u0641\u0647\u0631\u0633 PSI \u0630\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u064024 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629. \u0623\u0631\u0641\u0642\u0646\u0627 16 \u062C\u062F\u0648\u0644\u0627\u064B \u0623\u0635\u0644\u064A\u0627\u064B \u0648\u0631\u0628\u0637\u0646\u0627\u0647\u0627 \u0628\u0633\u062C\u0644\u0627\u062A NASA\u061B \u0644\u0627 \u0646\u0639\u0631\u0636 DOI \u0623\u0648 \u062D\u0642\u0648\u0642\u0627\u064B \u0625\u0644\u0627 \u0639\u0646\u062F \u062A\u0648\u0641\u0631\u0647\u0627. \u0644\u0645 \u062A\u064F\u0631\u062C\u0639 \u062B\u0645\u0627\u0646\u064A\u0629 \u0627\u0633\u062A\u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0646 \u0627\u0644\u0641\u0647\u0627\u0631\u0633 \u0642\u0627\u0626\u0645\u0629 \u0645\u0644\u0641\u0627\u062A \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0644\u0642\u0637\u0629. \u0644\u0627 \u064A\u0642\u062F\u0645 PSI \u062C\u062F\u0648\u0644\u0627\u064B \u0645\u0648\u062D\u062F\u0627\u064B \u0635\u0627\u0644\u062D\u0627\u064B \u0644\u062F\u0645\u062C \u0643\u0644 \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A.")}</p>
    <div class="table-wrap"><table><thead><tr><th>${t("Investigation", "\u0627\u0644\u062F\u0631\u0627\u0633\u0629")}</th><th>${t("Rows", "\u0627\u0644\u0635\u0641\u0648\u0641")}</th><th>DOI</th><th>${t("License", "\u0627\u0644\u062A\u0631\u062E\u064A\u0635")}</th><th>${t("Integrity", "\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0644\u0641")}</th><th>${t("Source record", "\u0633\u062C\u0644 \u0627\u0644\u0645\u0635\u062F\u0631")}</th></tr></thead><tbody>${evidence.investigations.map((s) => `<tr><td><b>${esc(s.id)} \xB7 ${esc(s.title)}</b></td><td>${s.rowCount}</td><td class="mono">${esc(s.doi || "\u2014")}</td><td>${esc(s.license)}</td><td>${esc(s.sourceIntegrity)}</td><td><a href="${esc(s.sourceUrl)}" target="_blank" rel="noreferrer">NASA PSI \u2197</a></td></tr>`).join("")}</tbody></table></div></article>
    <div class="grid two" style="margin-top:15px"><article class="card"><h3>${t("Challenge-provided resources", "\u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u0628\u0627\u0644\u062A\u062D\u062F\u064A")}</h3><p class="sub">${t("PSI is the measurement source. The other resources provide context, incident history, or technology-transfer examples; they are not additional experiment datasets.", "PSI \u0647\u0648 \u0645\u0635\u062F\u0631 \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A. \u0623\u0645\u0627 \u0628\u0642\u064A\u0629 \u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0641\u062A\u0642\u062F\u0645 \u0633\u064A\u0627\u0642\u0627\u064B \u0639\u0644\u0645\u064A\u0627\u064B \u0623\u0648 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0623\u0648 \u0623\u0645\u062B\u0644\u0629 \u0644\u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629\u061B \u0648\u0644\u064A\u0633\u062A \u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628.")}</p>
    ${challengeResources.map(([label, url, kind]) => `<div class="list-row"><span>${esc(label)} <small class="tag">${esc(ar ? categoryArabic[kind] || kind : kind)}</small></span><a href="${esc(url)}" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div>`).join("")}
    <div class="list-row"><span>${t("Official challenge \xB7 Flame in Freefall", "\u0635\u0641\u062D\u0629 \u062A\u062D\u062F\u064A Flame in Freefall \u0627\u0644\u0631\u0633\u0645\u064A\u0629")}</span><a href="https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=resources" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div>
    <div class="list-row"><span>${t("PSI filtered API \xB7 investigation metadata refresh", "\u0648\u0627\u062C\u0647\u0629 PSI \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629 \xB7 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A")} <small class="tag">${t("METADATA API", "\u0648\u0627\u062C\u0647\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629")}</small></span><a href="https://psi.nasa.gov/geode-py/ws/repo/search?source=psi&type=investigation&size=100&sort=Accession&order=asc&ffield=Research+Area&fvalue=combustion+science" target="_blank" rel="noreferrer">${t("API \u2197", "\u0648\u0627\u062C\u0647\u0629 API \u2197")}</a></div>
    <div class="list-row"><span>${t("NASA NTRS API docs \xB7 reference discovery; figures digitized separately, no raw dataset ingested", "\u062A\u0648\u062B\u064A\u0642 NASA NTRS API \xB7 \u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u061B \u0631\u064F\u0642\u0645\u0646\u062A \u0627\u0644\u0623\u0634\u0643\u0627\u0644 \u0628\u0634\u0643\u0644 \u0645\u0646\u0641\u0635\u0644 \u0648\u0644\u0645 \u064A\u064F\u0633\u062A\u0648\u0631\u062F \u062C\u062F\u0648\u0644 \u062E\u0627\u0645")}</span><a href="https://ntrs.nasa.gov/api/openapi/" target="_blank" rel="noreferrer">${t("API docs \u2197", "\u062A\u0648\u062B\u064A\u0642 API \u2197")}</a></div>
    <div class="list-row"><span>NASA OCHMO-TB-003 \xB7 Habitable Atmosphere</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div><div class="list-row"><span>NASA OCHMO-TB-008 \xB7 Fire Protection</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 \xB7 crew atmosphere constraints</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div><div class="list-row"><span>NASA 2026 \xB7 exploration atmosphere concept</span><a href="https://ntrs.nasa.gov/citations/20260001966" target="_blank" rel="noreferrer">NASA NTRS \u2197</a></div></article>
    <article class="card"><h3>${t("Additional NASA research sources", "\u0645\u0635\u0627\u062F\u0631 NASA \u0627\u0644\u0628\u062D\u062B\u064A\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629")}</h3><p class="sub">${t("Supplementary NASA experiments and reports used in the two added plots. Figure-digitized points are identified as approximate; simulation is separated from measured evidence.", "\u062A\u062C\u0627\u0631\u0628 \u0648\u062A\u0642\u0627\u0631\u064A\u0631 NASA \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0641\u064A \u0627\u0644\u0645\u062E\u0637\u0637\u064A\u0646. \u0646\u0648\u0636\u062D \u0623\u0646 \u0627\u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u0631\u062C\u0629 \u0645\u0646 \u0627\u0644\u0623\u0634\u0643\u0627\u0644 \u062A\u0642\u0631\u064A\u0628\u064A\u0629\u060C \u0648\u0646\u0641\u0635\u0644 \u0627\u0644\u0645\u062D\u0627\u0643\u0627\u0629 \u0639\u0646 \u0627\u0644\u0642\u064A\u0627\u0633 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A.")}</p>${EXTERNAL_NASA_SOURCES.map((source) => `<div class="list-row"><span><b>${esc(source.title)}</b><small>${esc(source.date)} \xB7 ${esc(source.method)}<br>${t("Use:", "\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645:")} ${esc(source.use)}<br>${t("Limit:", "\u0627\u0644\u0642\u064A\u062F:")} ${esc(source.limit)}</small></span><a href="${esc(source.url)}" target="_blank" rel="noreferrer">NASA \u2197</a></div>`).join("")}</article><article class="card"><h3>${t("Services, provenance, and boundaries", "\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0648\u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u062D\u062F\u0648\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</h3><p class="sub">${t("The PSI investigation-search and file-manifest endpoints refresh metadata; listing files does not download the multi-terabyte archive. The app serves a local inventory snapshot and checksummed files. NASA NTRS is linked for selected references, not harvested as an experiment dataset. Gemini is optional generated explanation, never experimental evidence.", "\u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u062C\u0647\u062A\u0627 \u0627\u0644\u0628\u062D\u062B \u0648\u0627\u0644\u0641\u0647\u0631\u0633\u0629 \u0644\u062F\u0649 PSI \u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0635\u0641\u064A\u0629\u061B \u0641\u0647\u0631\u0633\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0644\u0627 \u062A\u0639\u0646\u064A \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0627\u0644\u0630\u064A \u064A\u062A\u062C\u0627\u0648\u0632 \u0639\u062F\u0629 \u062A\u064A\u0631\u0627\u0628\u0627\u064A\u062A. \u064A\u0639\u0631\u0636 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0644\u0642\u0637\u0629 \u0645\u062D\u0644\u064A\u0629 \u0648\u0645\u0644\u0641\u0627\u062A \u0645\u062A\u062D\u0642\u0642\u0627\u064B \u0645\u0646 \u0628\u0635\u0645\u062A\u0647\u0627. \u0623\u064F\u062F\u0631\u062C NASA NTRS \u0643\u0645\u0635\u062F\u0631 \u0644\u0645\u0631\u0627\u062C\u0639 \u0645\u062E\u062A\u0627\u0631\u0629 \u0648\u0644\u0645 \u064A\u064F\u0633\u062A\u0648\u0631\u062F \u0643\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062C\u0627\u0631\u0628. Gemini \u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0644\u0634\u0631\u062D \u0645\u0648\u0644\u0651\u062F \u0648\u0644\u0627 \u064A\u0639\u062F \u062F\u0644\u064A\u0644\u0627\u064B \u062A\u062C\u0631\u064A\u0628\u064A\u0627\u064B.")}</p><div class="list-row"><span>OBSERVED</span><b>${t("Values directly reported by NASA PSI.", "\u0642\u064A\u0645 \u0645\u0630\u0643\u0648\u0631\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A NASA PSI.")}</b></div><div class="list-row"><span>COMPUTED</span><b>${t("Deterministic arithmetic or summaries with stated inputs.", "\u062D\u0633\u0627\u0628\u0627\u062A \u0623\u0648 \u0645\u0644\u062E\u0635\u0627\u062A \u062D\u062A\u0645\u064A\u0629 \u0628\u0645\u062F\u062E\u0644\u0627\u062A \u0645\u0639\u0644\u0646\u0629.")}</b></div><div class="list-row"><span>INTERPRETATION</span><b>${t("Scientific explanation linked to references.", "\u062A\u0641\u0633\u064A\u0631 \u0639\u0644\u0645\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0645\u0631\u0627\u062C\u0639.")}</b></div><div class="list-row"><span>HYPOTHESIS</span><b>${t("A question that needs experiments or validation.", "\u0633\u0624\u0627\u0644 \u064A\u062D\u062A\u0627\u062C \u062A\u062C\u0627\u0631\u0628 \u0623\u0648 \u062A\u062D\u0642\u0642\u0627\u064B.")}</b></div><div class="callout warn">${t("Earth-fire hotspots, NOAA space weather, solar-event feeds, and unrelated challenge data from the earlier prototype are excluded from active research.", "\u0627\u0633\u062A\u064F\u0628\u0639\u062F\u062A \u062D\u0631\u0627\u0626\u0642 \u0627\u0644\u0623\u0631\u0636 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0637\u0642\u0633 \u0627\u0644\u0641\u0636\u0627\u0621 \u0648\u0627\u0644\u0623\u062D\u062F\u0627\u062B \u0627\u0644\u0634\u0645\u0633\u064A\u0629 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649 \u0645\u0646 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062D\u0627\u0644\u064A.")}</div><a href="../docs/CHALLENGE_BRIEF_AND_VIDEO.md">${t("Read the challenge and video review \u2197", "\u0627\u0642\u0631\u0623 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A \u0648\u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u2197")}</a></article></div>`;
  }
  function reports() {
    return `${pageHead(t("Scientific Reports Center", "\u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0639\u0644\u0645\u064A\u0629"), t("Export reproducible source rows, analysis results, or a printable report.", "\u0635\u062F\u0651\u0631 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0623\u0648 \u062A\u0642\u0631\u064A\u0631\u0627\u064B \u0642\u0627\u0628\u0644\u0627\u064B \u0644\u0644\u0637\u0628\u0627\u0639\u0629."))}<div class="grid three"><article class="card"><div class="eyebrow">${t("DATA", "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</div><h3 style="margin:10px 0">${t("Source table", "\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631")}</h3><p class="sub">${t("Observed rows and field names from NASA PSI-69.", "\u0635\u0641\u0648\u0641 \u0645\u0631\u0635\u0648\u062F\u0629 \u0648\u0623\u0633\u0645\u0627\u0621 \u062D\u0642\u0648\u0644 \u0645\u0646 NASA PSI-69.")}</p><button class="outline-btn" id="downloadCsv">${t("Download CSV", "\u062A\u0646\u0632\u064A\u0644 CSV")}</button></article><article class="card"><div class="eyebrow">${t("REPRODUCIBILITY", "\u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0625\u0639\u0627\u062F\u0629")}</div><h3 style="margin:10px 0">${t("Analysis package", "\u062D\u0632\u0645\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644")}</h3><p class="sub">${t("JSON with source metadata, summary statistics, validation, and limitations.", "\u0645\u0644\u0641 JSON \u064A\u062D\u0648\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0642\u064A\u0648\u062F.")}</p><button class="outline-btn" id="downloadJson">${t("Download JSON", "\u062A\u0646\u0632\u064A\u0644 JSON")}</button></article><article class="card"><div class="eyebrow">${t("PRESENTATION", "\u0627\u0644\u0639\u0631\u0636")}</div><h3 style="margin:10px 0">${t("Scientific summary", "\u0645\u0644\u062E\u0635 \u0639\u0644\u0645\u064A")}</h3><p class="sub">${t("Open a printable report and use Save as PDF in your browser.", "\u0627\u0641\u062A\u062D \u062A\u0642\u0631\u064A\u0631\u0627\u064B \u0642\u0627\u0628\u0644\u0627\u064B \u0644\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0641\u0638 \u0628\u0635\u064A\u063A\u0629 PDF \u0645\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D.")}</p><button class="outline-btn" id="printReport">${t("Print / Save PDF", "\u0637\u0628\u0627\u0639\u0629 / \u062D\u0641\u0638 PDF")}</button></article></div><div class="callout" style="margin-top:15px">${t("Exports preserve evidence labels and include DOI, units, methods, and limitations. AI interpretation is not an experimentally verified result.", "\u062A\u062D\u0627\u0641\u0638 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0651\u0631\u0629 \u0639\u0644\u0649 \u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u062A\u0634\u0645\u0644 DOI \u0648\u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0627\u0644\u0637\u0631\u0642 \u0648\u0627\u0644\u0642\u064A\u0648\u062F. \u062A\u0641\u0633\u064A\u0631 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0644\u064A\u0633 \u0646\u062A\u064A\u062C\u0629 \u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0645\u062A\u062D\u0642\u0642\u0627\u064B \u0645\u0646\u0647\u0627.")}</div>`;
  }
  function projectVideoPage() {
    const ar = lang === "ar";
    return `${pageHead(ar ? "\u0641\u064A\u062F\u064A\u0648 MORS AEGIS" : "MORS AEGIS \xB7 30-second film", ar ? "\u0639\u0631\u0636 \u0633\u0631\u064A\u0639 \u064A\u0639\u0631\u0651\u0641 \u0628\u0627\u0644\u062A\u062D\u062F\u064A \u0648\u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u0645\u062E\u062A\u0628\u0631\u0627\u062A \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u0645\u0633\u0627\u0639\u062F AI." : "A fast, judge-ready introduction to the challenge, evidence, interactive labs, and AI copilot.")}<section class="card project-film"><div class="project-film-frame"><video controls playsinline preload="metadata" poster="/mors-logo.jpg" aria-label="MORS AEGIS: Flame in Freefall, 30-second project film"><source src="/media/mors-aegis-30s.mp4" type="video/mp4">${ar ? "\u0645\u062A\u0635\u0641\u062D\u0643 \u0644\u0627 \u064A\u062F\u0639\u0645 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0641\u064A\u062F\u064A\u0648." : "Your browser does not support MP4 video."}</video></div><div class="project-film-meta"><div><span class="eyebrow">${ar ? "\u0639\u0631\u0636 \u0639\u0644\u0645\u064A \xB7 30 \u062B\u0627\u0646\u064A\u0629" : "SCIENCE BRIEF \xB7 30 SECONDS"}</span><h2>${ar ? "\u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0646\u0627\u0633\u0627 \u0625\u0644\u0649 \u0623\u0633\u0626\u0644\u0629 \u062A\u0635\u0645\u064A\u0645 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631" : "From NASA evidence to testable design questions"}</h2><p class="sub">${ar ? "\u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u0635\u0648\u062A\u064A \u0628\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629. \u064A\u062D\u062A\u0648\u064A \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A NASA \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629\u060C \u0648\u062D\u062F\u0648\u062F \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F\u060C \u0648\u0648\u0638\u064A\u0641\u0629 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0639\u0644\u0645\u064A." : "English narration. The film introduces NASA source data, the limits of the 3D concepts, and the evidence-grounded AI copilot."}</p></div><a class="primary-btn" href="/media/mors-aegis-30s.mp4" download="MORS-AEGIS-30-second-film.mp4">${ar ? "\u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0641\u064A\u062F\u064A\u0648" : "Download MP4"}</a></div><details class="film-transcript"><summary>${ar ? "\u0627\u0644\u0646\u0635 \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u0644\u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u0635\u0648\u062A\u064A" : "Read the narration transcript"}</summary><p>Meet MORS AEGIS: Flame in Freefall. We turn NASA combustion research into a clear, interactive guide to spacecraft fire safety. Explore real experiment records, compare oxygen, pressure, airflow, fuel, and gravity, and see why each condition matters. Our three-dimensional concepts show possible research and response systems; they are not flight-qualified hardware. The AI copilot searches the project evidence, calculates descriptive results, cites its sources, and explains uncertainty. MORS AEGIS connects data, physics, and design questions to help teams prepare safer future missions.</p></details><div class="callout warn">${ar ? "\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645\u064A\u0629 \u0648\u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u0644\u064A\u0633\u062A \u0645\u0639\u062F\u0627\u062A \u0645\u0624\u0647\u0644\u0629 \u0648\u0644\u0627 \u0646\u062A\u0627\u0626\u062C \u0627\u062E\u062A\u0628\u0627\u0631. \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A \u062A\u064F\u0646\u0633\u0628 \u0644\u0645\u0635\u0627\u062F\u0631 NASA \u0627\u0644\u0623\u0635\u0644\u064A\u0629." : "Concept models and illustrations are not qualified hardware or test results. Measurements remain attributed to original NASA sources."}</div></section>`;
  }
  async function health() {
    const h = await get("/api/health");
    $("#dataMode").textContent = t("NASA PSI challenge evidence \xB7 offline-ready", "\u0623\u062F\u0644\u0629 \u062A\u062D\u062F\u064A NASA PSI \xB7 \u0645\u062A\u0627\u062D\u0629 \u062F\u0648\u0646 \u0627\u062A\u0635\u0627\u0644");
    return h;
  }
  function settings() {
    return `${pageHead(t("Settings & Theme Manager", "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0645\u0638\u0647\u0631"), t("Appearance and language preferences are saved in this browser.", "\u062A\u064F\u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0638\u0647\u0631 \u0648\u0627\u0644\u0644\u063A\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D."))}<div class="grid two"><article class="card"><h3>${t("Visual theme", "\u0627\u0644\u0645\u0638\u0647\u0631")}</h3><p class="sub">${t("Three MORS themes preserve the same evidence labels and reading order.", "\u062B\u064A\u0645\u0627\u062A MORS \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u062A\u062D\u0627\u0641\u0638 \u0639\u0644\u0649 \u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0642\u0631\u0627\u0621\u0629.")}</p>${[
      ["arctic", "MORS Arctic", "Light research surfaces with blue accents"],
      ["space", "MORS Deep Space", "Dark navy mission-control palette"],
      ["observatory", "MORS Observatory", "Neutral lab surfaces with dark data panels"]
    ].map(
      ([v, n, d]) => `<div class="list-row"><span><b>${n}</b><br><small>${t(d, { "Light research surfaces with blue accents": "\u0648\u0627\u062C\u0647\u0629 \u0628\u062D\u062B \u0641\u0627\u062A\u062D\u0629 \u0648\u0644\u0645\u0633\u0627\u062A \u0632\u0631\u0642\u0627\u0621", "Dark navy mission-control palette": "\u0644\u0648\u062D\u0629 \u062F\u0627\u0643\u0646\u0629 \u0628\u0644\u0648\u0646 \u0623\u0632\u0631\u0642 \u0627\u0644\u0645\u0647\u0645\u0627\u062A", "Neutral lab surfaces with dark data panels": "\u0648\u0627\u062C\u0647\u0629 \u0645\u062E\u062A\u0628\u0631 \u0645\u062D\u0627\u064A\u062F\u0629 \u0645\u0639 \u0623\u0644\u0648\u0627\u062D \u0628\u064A\u0627\u0646\u0627\u062A \u062F\u0627\u0643\u0646\u0629" }[d])}</small></span><button class="outline-btn" data-theme="${v}">${theme === v ? t("Active", "\u0645\u0641\u0639\u0651\u0644") : t("Apply", "\u062A\u0637\u0628\u064A\u0642")}</button></div>`
    ).join(
      ""
    )}${accentPickerMarkup("settingsAccent")}</article><article class="card"><h3>${t("Language", "\u0627\u0644\u0644\u063A\u0629")}</h3><p class="sub">${t("The interface supports English and Arabic with right-to-left layout.", "\u062A\u062F\u0639\u0645 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 \u0648\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0645\u0639 \u062A\u062E\u0637\u064A\u0637 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631.")}</p><div class="list-row"><span>English</span><button class="outline-btn" data-lang="en">${lang === "en" ? t("Active", "\u0645\u0641\u0639\u0651\u0644") : t("Apply", "\u062A\u0637\u0628\u064A\u0642")}</button></div><div class="list-row"><span>\u0627\u0644\u0639\u0631\u0628\u064A\u0629</span><button class="outline-btn" data-lang="ar">${lang === "ar" ? "\u0646\u0634\u0637" : "\u062A\u0637\u0628\u064A\u0642"}</button></div><div class="callout" style="margin-top:15px">${t("Scientific field names and source values stay in their original form for traceability.", "\u062A\u0628\u0642\u0649 \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0639\u0644\u0645\u064A\u0629 \u0648\u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u062F\u0631 \u0628\u0635\u064A\u063A\u062A\u0647\u0627 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0644\u062A\u0633\u0647\u064A\u0644 \u0627\u0644\u062A\u062A\u0628\u0639.")}</div></article></div>`;
  }
  var pageMap = {
    Overview: overview,
    "Flame Lab": () => renderFlamePhysics(lang) + flameScenarioControlsMarkup(lang),
    "Flame Physics": () => renderFlamePhysics(lang),
    "Mission Lab": () => renderMissionLab(lang),
    "Mission Atmospheres": () => renderMissionAtmospheres(lang),
    "Safety Insights": () => renderSafetyInsights(lang),
    "System Concepts": () => renderSystemConcepts(lang),
    "3D Models": () => renderModelGallery(lang),
    "Mission Lessons": missionLessons,
    "Challenge Evidence": () => renderChallengeLibrary(lang),
    "Investigation Lab": () => renderInvestigationLab(lang),
    "Analysis Workbench": analysisPage,
    "Chart Guide": chartGuidePage,
    "Comparison Studio": comparePage,
    "Project Video": projectVideoPage,
    "AI Copilot": copilot,
    Sources: sourcesPage,
    Reports: reports,
    Settings: settings
  };
  async function go(name) {
    var _a;
    const id = ++navigationId;
    current = name;
    $("#navSearch").value = "";
    const nextHash = `#${encodeURIComponent(name)}`;
    if (location.hash !== nextHash) location.hash = nextHash;
    renderNav();
    $("#pageTitle").textContent = pageLabel(name);
    $("#crumb").textContent = lang === "ar" ? `MORS AEGIS / ${pageLabel(name)}` : "MORS AEGIS / " + name.toUpperCase();
    $(".evidence-pill").innerHTML = `<i></i> ${t("EVIDENCE FIRST", "\u0627\u0644\u0623\u062F\u0644\u0629 \u0623\u0648\u0644\u0627\u064B")}`;
    $("#reportBtn").title = t("Export report", "\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631");
    $("#reportBtn").innerHTML = `\u2197 <span>${t("Export", "\u062A\u0635\u062F\u064A\u0631")}</span>`;
    document.querySelector("footer").innerHTML = `<span>${t("\xA9 2026 MORS \xB7 NASA PSI COMBUSTION RESEARCH", "\xA9 2026 MORS \xB7 \u0623\u0628\u062D\u0627\u062B NASA PSI \u0644\u0644\u0627\u062D\u062A\u0631\u0627\u0642")}</span><span>${t("Source-linked \xB7 Reproducible \xB7 Research use only", "\u0645\u0648\u062B\u0651\u0642 \u0627\u0644\u0645\u0635\u062F\u0631 \xB7 \u0642\u0627\u0628\u0644 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \xB7 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u062D\u062B\u064A")}</span>`;
    const c = $("#content");
    c.innerHTML = `<div class="empty">${t("Loading research view\u2026", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u0644\u0628\u062D\u062B\u2026")}</div>`;
    try {
      const html = await pageMap[name]();
      if (id !== navigationId) return;
      c.innerHTML = html;
      bindPage();
      if (name === "Overview" || name === "Chart Guide") bindFlexScatter(c);
      if (name === "Chart Guide") {
        const sourceCharts = document.createElement("section");
        sourceCharts.className = "source-chart-guide-loading";
        sourceCharts.innerHTML = `<div class="empty" role="status">${t("Loading source-table plots\u2026", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0645\u062E\u0637\u0637\u0627\u062A \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631\u2026")}</div>`;
        c.append(sourceCharts);
        renderSourceChartGuide(lang).then((markup) => {
          if (id !== navigationId) return;
          sourceCharts.outerHTML = markup;
          bindInteractiveCharts(c);
        }).catch((error) => {
          if (id !== navigationId) return;
          sourceCharts.innerHTML = `<div class="callout warn">${t("Source-table plots could not load:", "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u062E\u0637\u0637\u0627\u062A \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631:")} ${esc(error.message)}</div>`;
        });
      }
      if (name === "Challenge Evidence") bindChallengeLibrary(c, lang);
      if (name === "Safety Insights") bindSafetyInsightCharts(c, lang);
      if (name === "Investigation Lab") bindInvestigationLab(c, lang);
      if (name === "Flame Physics" || name === "Flame Lab") bindFlameScene3d(c, lang);
      if (name === "Flame Lab") bindFlameScenarioControls(c, lang);
      if (name === "Analysis Workbench") {
        bindMeasurementPlotStudio(c, dataset.rows, lang);
        bindFlex3DPlot(c, dataset.rows, lang);
      }
      if (name === "Mission Lab") bindMissionLab(c, lang);
      if (name === "System Concepts") bindSystemConcepts(c, lang);
      if (name === "3D Models") bindModelGallery(c, lang);
      if (name === "Comparison Studio") renderCompare();
      if (name === "AI Copilot") {
        const health2 = await get("/api/health");
        if (id === navigationId) {
          const ai = health2.ai || {};
          $("#copilotMode").textContent = ai.provider === "ollama" ? `LOCAL AI \xB7 ${ai.model || "OLLAMA"} \xB7 TAILSCALE` : ai.provider === "gemini" || ((_a = health2.credentials) == null ? void 0 : _a.gemini) ? "GEMINI CONFIGURED \xB7 CHECKED PER REPLY" : "LOCAL EVIDENCE MODE";
        }
      }
    } catch (e) {
      if (id === navigationId)
        c.innerHTML = `<div class="callout warn">View could not be loaded: ${esc(e.message)}</div>`;
    }
  }
  function persistChat() {
    try {
      storageSet("mors-chat-v1", JSON.stringify(chatThread.slice(-60)));
    } catch (e) {
      toast("Local chat history could not be saved in this browser.");
    }
  }
  function addChatMessage(log, message) {
    const bubble = document.createElement("div");
    bubble.className = `bubble ${message.role}`;
    const meta = document.createElement("div");
    meta.className = "bubble-meta";
    meta.textContent = message.role === "user" ? lang === "ar" ? "\u0623\u0646\u062A" : "YOU" : message.provider || "AEGIS \xB7 LOCAL EVIDENCE";
    const body = document.createElement("div");
    body.className = "bubble-body";
    body.textContent = message.content;
    bubble.append(meta, body);
    if (message.role === "assistant") {
      if (Array.isArray(message.toolsExecuted) && message.toolsExecuted.length) {
        const details = document.createElement("details"), summary = document.createElement("summary"), pre = document.createElement("pre");
        summary.textContent = lang === "ar" ? "\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0646\u0641\u0630\u0629" : "Executed analysis tools";
        pre.textContent = message.toolsExecuted.map(
          (item) => `${item.tool}: ${item.status} \xB7 ${item.evidence}${item.resultSha256 ? ` \xB7 SHA-256 ${item.resultSha256}` : ""}`
        ).join("\n");
        details.append(summary, pre);
        bubble.append(details);
      }
      const cite = document.createElement("div");
      cite.className = "bubble-citation";
      cite.textContent = lang === "ar" ? "\u0627\u0644\u0645\u0635\u062F\u0631: NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \xB7 " : "Source: NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \xB7 ";
      const link = document.createElement("a");
      link.href = "https://psi.nasa.gov/physci/repo/data/investigations/PSI-69";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = lang === "ar" ? "\u0641\u062A\u062D \u0633\u062C\u0644 NASA" : "Open NASA record";
      cite.append(link);
      bubble.append(cite);
    }
    log.append(bubble);
  }
  function renderChat() {
    const log = $("#chatLog");
    if (!log) return;
    log.replaceChildren();
    if (!chatThread.length) {
      addChatMessage(log, {
        role: "assistant",
        provider: lang === "ar" ? "\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0623\u0628\u062D\u0627\u062B" : "AEGIS \xB7 RESEARCH ASSISTANT",
        content: lang === "ar" ? "\u0645\u0631\u062D\u0628\u064B\u0627. \u0627\u0633\u0623\u0644 \u0639\u0646 \u0642\u064A\u0627\u0633\u0627\u062A FLEX \u0623\u0648 \u0637\u0631\u0642 \u0627\u0644\u062D\u0633\u0627\u0628 \u0623\u0648 \u062D\u062F\u0648\u062F \u0627\u0644\u0623\u062F\u0644\u0629. \u0633\u0623\u0648\u0636\u062D \u0625\u0646 \u0643\u0627\u0646\u062A \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0642\u064A\u0627\u0633\u0627\u064B \u0645\u0631\u0635\u0648\u062F\u0627\u064B \u0623\u0645 \u062D\u0633\u0627\u0628\u0627\u064B \u0648\u0635\u0641\u064A\u0627\u064B\u060C \u0648\u0633\u0623\u0630\u0643\u0631 \u0639\u0646\u062F\u0645\u0627 \u0644\u0627 \u062A\u0643\u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0625\u062C\u0627\u0628\u0629." : "Hello. Ask about FLEX measurements, calculations, or evidence limits. I will distinguish observations from computed summaries and flag questions this table cannot answer."
      });
    } else chatThread.forEach((message) => addChatMessage(log, message));
    log.scrollTop = log.scrollHeight;
  }
  async function submitChat(event) {
    var _a, _b, _c, _d, _e;
    event.preventDefault();
    if (chatBusy) return;
    const input = $("#question"), question = input.value.trim();
    if (!question) return;
    const history = chatThread.slice(-8).map(({ role, content }) => ({ role, content }));
    chatThread.push({ role: "user", content: question });
    persistChat();
    renderChat();
    input.value = "";
    chatBusy = true;
    $("#chatTyping").hidden = false;
    $("#chatSend").disabled = true;
    try {
      const result = await post("/api/copilot", { question, history });
      const provider = result.status === "live" ? `${result.provider || "AI INTERPRETATION"} \xB7 ${result.model || ""}${result.verifiedAnswer ? " \xB7 QUALITATIVE NOTE" : ""}` : (result.provider || "DETERMINISTIC LOCAL SUMMARY").toUpperCase();
      chatThread.push({
        role: "assistant",
        content: result.verifiedAnswer ? `${result.verifiedAnswer}

${lang === "ar" ? "\u062A\u0641\u0633\u064A\u0631 \u0646\u0648\u0639\u064A \u0645\u0648\u0644\u0651\u062F \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A (\u0644\u064A\u0633 \u0642\u064A\u0627\u0633\u064B\u0627):" : "AI qualitative interpretation (not a measurement):"}
${result.answer}` : result.answer || "No text was returned. Please try again.",
        provider,
        citation: true,
        toolsExecuted: result.toolsExecuted || []
      });
    } catch (e) {
      const mean = (_c = (_b = (_a = analysis == null ? void 0 : analysis.summary) == null ? void 0 : _a.stats) == null ? void 0 : _b.burning_rate_mm_s) == null ? void 0 : _c.mean;
      chatThread.push({
        role: "assistant",
        provider: "DETERMINISTIC LOCAL SUMMARY \xB7 REQUEST FAILED",
        citation: true,
        content: `The AI request could not be completed. Local evidence: ${(_e = (_d = dataset == null ? void 0 : dataset.dataset) == null ? void 0 : _d.records) != null ? _e : 0} PSI-69 table rows; computed mean burning rate ${Number.isFinite(mean) ? mean.toFixed(3) + " mm\xB2/s" : "not available"}. These pooled records cannot establish causality or represent every FLEX test. Source DOI: 10.60555/mbq8-0451.`
      });
    } finally {
      chatBusy = false;
      persistChat();
      if ($("#chatTyping")) $("#chatTyping").hidden = true;
      if ($("#chatSend")) $("#chatSend").disabled = false;
      if ($("#chatLog")) {
        renderChat();
        if ($("#question")) $("#question").focus();
      }
    }
  }
  function bindPage() {
    bindInteractiveCharts(document);
    document.querySelectorAll("[data-go]").forEach((b) => b.onclick = () => go(b.dataset.go));
    if ($("#compareA")) {
      $("#compareA").onchange = renderCompare;
      $("#compareB").onchange = renderCompare;
    }
    if ($("#chatForm")) {
      renderChat();
      $("#chatForm").onsubmit = submitChat;
      $("#question").addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (!chatBusy) $("#chatForm").requestSubmit();
        }
      });
      $("#newChat").onclick = () => {
        if (chatThread.length && !window.confirm(
          lang === "ar" ? "\u0628\u062F\u0621 \u0645\u062D\u0627\u062F\u062B\u0629 \u062C\u062F\u064A\u062F\u0629\u061F \u0633\u064A\u064F\u0645\u0633\u062D \u0633\u062C\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629 \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D." : "Start a new chat? This clears this conversation from this browser."
        ))
          return;
        chatThread = [];
        persistChat();
        renderChat();
      };
      document.querySelectorAll("[data-question]").forEach(
        (b) => b.onclick = () => {
          if (chatBusy) return;
          $("#question").value = b.dataset.question;
          $("#question").focus();
        }
      );
    }
    for (const [id, key] of [
      ["#wbFuel", "fuel"],
      ["#wbBand", "pressureBand"],
      ["#wbDiluent", "diluent"],
      ["#wbVariable", "variable"]
    ])
      if ($(id))
        $(id).onchange = (e) => {
          wbFilter = __spreadProps(__spreadValues({}, wbFilter), { [key]: e.target.value });
          go("Analysis Workbench");
        };
    if ($("#wbReset"))
      $("#wbReset").onclick = () => {
        wbFilter = __spreadValues({}, WB_DEFAULT);
        go("Analysis Workbench");
      };
    if ($("#chatLog")) $("#chatLog").scrollTop = $("#chatLog").scrollHeight;
    if ($("#downloadCsv"))
      $("#downloadCsv").onclick = () => download("mors-aegis-psi69-flex.csv", awaitlessCSV(), "text/csv");
    if ($("#downloadJson"))
      $("#downloadJson").onclick = () => download("mors-aegis-report.json", JSON.stringify(report(), null, 2), "application/json");
    if ($("#printReport")) $("#printReport").onclick = printSummary;
    if ($("#saveProject"))
      $("#saveProject").onclick = () => {
        const p = {
          name: $("#projectName").value,
          question: $("#projectQuestion").value,
          dataset: "PSI-69",
          savedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        storageSet("mors-project", JSON.stringify(p));
        $("#savedProject").innerHTML = `<div class="callout good">Saved locally in this browser: <b>${esc(p.name)}</b>. No server storage configured.</div>`;
      };
    document.querySelectorAll("[data-theme]").forEach(
      (b) => b.onclick = () => {
        theme = b.dataset.theme;
        storageSet("mors-theme", theme);
        if (b.closest("#theme-welcome")) storageSet("mors-welcome-theme-picked", "1");
        setTheme();
        go(current);
      }
    );
    document.querySelectorAll("[data-lang]").forEach(
      (b) => b.onclick = () => {
        lang = b.dataset.lang;
        storageSet("mors-lang", lang);
        setTheme();
        $("#langBtn").textContent = lang === "ar" ? "English" : "\u0639\u0631\u0628\u064A";
        renderNav();
        go(current);
      }
    );
    document.querySelectorAll("[data-accent-picker]").forEach((picker) => {
      picker.addEventListener("input", () => {
        const color = normalizeHexColor(picker.value);
        if (!color) return;
        storageSet("mors-custom-accent", color);
        setTheme();
      });
    });
    document.querySelectorAll("[data-accent-reset]").forEach((button) => {
      button.onclick = () => {
        try {
          window.localStorage.removeItem("mors-custom-accent");
        } catch (e) {
        }
        setTheme();
        go(current);
      };
    });
  }
  function awaitlessCSV() {
    const keys = Object.keys(dataset.rows[0]);
    return [keys, ...dataset.rows.map((r) => keys.map((k) => r[k]))].map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
  }
  function report() {
    return {
      product: "MORS AEGIS",
      evidence_classification: "OBSERVED source rows \u2192 COMPUTED summary",
      dataset: dataset.dataset,
      rows: dataset.rows,
      analysis,
      limitations: [
        "Official PSI-69 experimental table; raw imagery and archive assets not included.",
        "Descriptive analysis is not causal inference.",
        "No imagery attached to current data extract."
      ],
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  function printSummary() {
    const d = report(), w = window.open("", "_blank"), ar = lang === "ar";
    if (!w) {
      toast(t("Allow a popup to print the report", "\u0627\u0633\u0645\u062D \u0628\u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"));
      return;
    }
    w.document.write(
      `<html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}"><head><meta charset="utf-8"><title>${t("MORS AEGIS Scientific Summary", "MORS AEGIS \xB7 \u0645\u0644\u062E\u0635 \u0639\u0644\u0645\u064A")}</title><style>body{font:14px Arial;margin:40px;color:#123}h1{color:#123}table{border-collapse:collapse}td,th{padding:8px;border:1px solid #abc}small{color:#567}pre{white-space:pre-wrap;direction:ltr;text-align:left}</style></head><body><h1>MORS AEGIS \xB7 ${t("FLEX Evidence Summary", "\u0645\u0644\u062E\u0635 \u0623\u062F\u0644\u0629 FLEX")}</h1><p>NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \xB7 ${(/* @__PURE__ */ new Date()).toISOString()}</p><p>${t("Evidence: observed source-table values and computed descriptive statistics.", "\u0627\u0644\u0623\u062F\u0644\u0629: \u0642\u064A\u0645 \u0645\u0631\u0635\u0648\u062F\u0629 \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0645\u062D\u0633\u0648\u0628\u0629.")}</p><p><b>${t("Scope:", "\u0627\u0644\u0646\u0637\u0627\u0642:")}</b> ${t("all tests in the official PSI-69 experimental table; raw imagery and other archive assets are not included.", "\u0643\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0641\u064A \u062C\u062F\u0648\u0644 NASA PSI-69 \u0627\u0644\u0631\u0633\u0645\u064A\u061B \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u062E\u0627\u0645 \u0648\u0628\u0642\u064A\u0629 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u063A\u064A\u0631 \u0645\u0636\u0645\u0651\u0646\u0629.")}</p>${rowsTable(dataset.rows)}<h2>${t("Computed summary", "\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u062D\u0633\u0648\u0628")}</h2><pre>${esc(JSON.stringify(analysis.summary, null, 2))}</pre><h2>${t("Limitations", "\u0627\u0644\u0642\u064A\u0648\u062F")}</h2><ul>${d.limitations.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><p>${t("Source:", "\u0627\u0644\u0645\u0635\u062F\u0631:")} https://psi.nasa.gov/physci/repo/data/investigations/PSI-69</p></body></html>`
    );
    w.document.close();
    setTimeout(() => {
      w.focus();
      w.print();
    }, 400);
  }
  $("#reportBtn").onclick = () => go("Reports");
  $("#langBtn").textContent = lang === "ar" ? "English" : "\u0639\u0631\u0628\u064A";
  $("#langBtn").onclick = () => {
    lang = lang === "en" ? "ar" : "en";
    storageSet("mors-lang", lang);
    setTheme();
    renderNav();
    go(current);
  };
  $("#themeBtn").onclick = () => {
    theme = { arctic: "space", space: "observatory", observatory: "arctic" }[theme];
    storageSet("mors-theme", theme);
    setTheme();
    go(current);
  };
  window.addEventListener("hashchange", () => {
    const requested = pageFromHash();
    if (requested !== current) go(requested);
  });
  setTheme();
  bindNavigationSearch();
  renderNav();
  $("#content").innerHTML = `<div class="empty">${t("Loading research view\u2026", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u0644\u0628\u062D\u062B\u2026")}</div>`;
  (async () => {
    try {
      [dataset, analysis] = await Promise.all([get("/api/datasets/flex"), get("/api/analysis")]);
      health().catch(() => {
      });
      await go(current);
      document.documentElement.dataset.morsAppReady = "true";
    } catch (e) {
      $("#content").innerHTML = `<div class="callout warn">Backend not ready. Start this application with <code>npm start</code> in its folder. ${esc(e.message)}</div>`;
      document.documentElement.dataset.morsAppReady = "true";
    }
  })();
})();
