import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
import http from 'node:http';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';

test('isolated backend contract and defensive boundaries', { timeout: 20000 }, async t => {
  const reserve = net.createServer();
  reserve.listen(0, '127.0.0.1'); await once(reserve, 'listening');
  const port = reserve.address().port;
  await new Promise(resolve => reserve.close(resolve));
  const child = spawn(process.execPath, ['server.mjs'], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', MORS_DISABLE_CREDENTIALS: '1' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  t.after(() => child.kill());
  await Promise.race([once(child.stdout, 'data'), once(child, 'exit').then(() => { throw new Error('Server exited before ready'); })]);
  const base = `http://127.0.0.1:${port}`;
  const post = (body, type = 'application/json') => fetch(`${base}/api/workflow`, { method: 'POST', headers: { 'content-type': type }, body });
  await t.test('health reports booleans, security headers and no configured credentials', async () => {
    const r = await fetch(`${base}/api/health`), j = await r.json();
    const csp = r.headers.get('content-security-policy');
    assert.equal(r.status, 200); assert.ok(csp.includes("script-src 'self' 'wasm-unsafe-eval'"));
    assert.ok(!csp.includes("'unsafe-eval'"), 'the JavaScript unsafe-eval permission must remain disabled');
    assert.ok(Object.values(j.credentials).every(v => v === false));
  });
  await t.test('JSON primitive, null, array and malformed input rejected', async () => {
    for (const input of ['null', '1', '[]', '"text"', '{broken']) assert.equal((await post(input)).status, 400);
    assert.equal((await post('{}', 'application/json-evil')).status, 415);
    assert.equal((await post(JSON.stringify({ rows: [] }))).status, 400);
  });
  await t.test('oversized input is rejected before processing', async () => {
    assert.equal((await post(JSON.stringify({ data: 'x'.repeat(310000) }))).status, 413);
  });
  await t.test('cross-origin and Host spoofing are refused', async () => {
    for (const headers of [{ origin: 'https://evil.example' }, { origin: `https://127.0.0.1:${port}` }, { host: 'evil.example' }, { 'sec-fetch-site': 'cross-site' }]) {
      const status = await new Promise((resolve, reject) => {
        http.get(`${base}/api/health`, { headers }, response => { response.resume(); resolve(response.statusCode); }).on('error', reject);
      });
      assert.equal(status, 403, JSON.stringify(headers));
    }
  });
  await t.test('missing assets return 404 and traversal is forbidden', async () => {
    assert.equal((await fetch(`${base}/missing-test-file.js`)).status, 404);
    assert.equal((await fetch(`${base}/%2e%2e%2fserver.mjs`)).status, 403);
    assert.equal((await fetch(`${base}/.env`)).status, 404);
  });
  await t.test('workflow uses the bundled PSI source and refuses custom datasets', async () => {
    const good = await (await post('{}')).json(); assert.equal(good.status, 'reviewed');
    const bad = await post('{"rows":[null]}'); assert.equal(bad.status, 400);
    assert.match((await bad.json()).error, /Custom datasets are disabled/);
  });
  await t.test('Copilot has honest deterministic fallback without credentials', async () => {
    const r = await fetch(`${base}/api/copilot`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"question":"Mean burning rate?"}' });
    const j = await r.json(); assert.equal(j.status, 'offline-fallback'); assert.match(j.answer, /0\.502/); assert.match(j.answer, /n=258/); assert.match(j.citation, /psi\.nasa\.gov/);
    const record = await (await fetch(`${base}/api/copilot`, { method:'POST', headers:{'content-type':'application/json'}, body:'{"question":"What was the pressure in 20CAL08?"}' })).json();
    assert.equal(record.toolsExecuted[0].tool,'lookupExperiment'); assert.match(record.answer,/20CAL08/); assert.equal(record.analysis,null);
    const source = await (await fetch(`${base}/api/copilot`, { method:'POST', headers:{'content-type':'application/json'}, body:'{"question":"Summarize NASA PSI-25 oxygen source evidence."}' })).json();
    assert.equal(source.source.id, 'PSI-25'); assert.equal(source.source.sha256.length, 64); assert.match(source.citation, /psi\.nasa\.gov/); assert.equal(source.toolsExecuted[0].evidence, 'OBSERVED + COMPUTED'); assert.equal(source.status, 'grounded-summary'); assert.match(source.answer, /13\.6–22\.2/); assert.doesNotMatch(source.answer, /majority/i);
    const unrelated = await (await fetch(`${base}/api/copilot`, { method:'POST', headers:{'content-type':'application/json'}, body:'{"question":"What is the capital of France?"}' })).json();
    assert.equal(unrelated.status,'unsupported'); assert.equal(unrelated.toolsExecuted.length,0);
  });
  await t.test('API replay detects altered saved result and dataset version', async () => {
    const submit = body => fetch(`${base}/api/research/replay`, {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({saved:body})});
    const analysis=await (await fetch(`${base}/api/research/analyze`,{method:'POST',headers:{'content-type':'application/json'},body:'{}'})).json();
    assert.equal((await (await submit(analysis)).json()).matches,true);
    assert.equal((await (await submit({...analysis,result:{...analysis.result,mean:999}})).json()).matches,false);
    assert.equal((await (await submit({...analysis,recipe:{...analysis.recipe,datasetVersion:'fake-version'}})).json()).versionMatches,false);
  });
  await t.test('unknown API paths are 404 and wrong methods are 405', async () => {
    assert.equal((await fetch(`${base}/api/does-not-exist`)).status, 404);
    assert.equal((await fetch(`${base}/api/copilot`)).status, 405);
  });
  await t.test('full PSI-69 table is served by default', async () => {
    const j = await (await fetch(`${base}/api/datasets/flex`)).json();
    assert.equal(j.dataset.records, 274); assert.equal(j.validation.valid, true);
    const catalog = await (await fetch(`${base}/api/catalog`)).json();
    assert.deepEqual(catalog.datasets.map(d => d.id), ['PSI-69', 'PSI-69-subset']);
  });
  await t.test('off-topic Earth fire and space-weather feeds are not exposed', async () => {
    assert.equal((await fetch(`${base}/api/firms?bbox=-180,-80,180,80`)).status, 404);
    assert.equal((await fetch(`${base}/api/noaa`)).status, 404);
    assert.equal((await fetch(`${base}/api/donki`)).status, 404);
  });
});

test('trusted HTTPS reverse-proxy origin is scoped to the configured host', { timeout: 15000 }, async t => {
  const reserve = net.createServer();
  reserve.listen(0, '127.0.0.1'); await once(reserve, 'listening');
  const port = reserve.address().port;
  await new Promise(resolve => reserve.close(resolve));
  const child = spawn(process.execPath, ['server.mjs'], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    env: {
      ...process.env,
      PORT: String(port),
      HOST: '0.0.0.0',
      MORS_ALLOW_NETWORK_BIND: '1',
      MORS_ACCESS_TOKEN: 'a'.repeat(64),
      MORS_TRUSTED_ORIGINS: 'https://judge.example',
      MORS_COOKIE_SECURE: '1',
      MORS_DISABLE_CREDENTIALS: '1'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  t.after(() => child.kill());
  await Promise.race([once(child.stdout, 'data'), once(child, 'exit').then(() => { throw new Error('Proxy test server exited before ready'); })]);
  const request = (path, headers, method = 'GET', body = '') => new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port, path, method, headers }, response => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve({ status: response.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.end(body);
  });
  const trustedHeaders = { host: 'judge.example', origin: 'https://judge.example', 'sec-fetch-site': 'same-origin' };
  const page = await request('/', trustedHeaders);
  assert.equal(page.status, 401);
  assert.match(page.body, /Enter the access code/);
  assert.match(page.body, /type="password"/);
  assert.match(page.body, /The research workspace loads after the code is verified/);
  assert.doesNotMatch(page.body, /<script\b|app\.bundle\.js/);
  const auth = await request('/api/auth', { ...trustedHeaders, 'content-type': 'application/x-www-form-urlencoded' }, 'POST', 'token=invalid');
  assert.equal(auth.status, 401, 'trusted origin reaches token validation rather than origin rejection');
  assert.match(auth.body, /access code was not accepted/i);
  const evil = await request('/', { host: 'evil.example', origin: 'https://evil.example' });
  assert.equal(evil.status, 403);
  const mismatched = await request('/', { host: 'judge.example', origin: 'https://evil.example' });
  assert.equal(mismatched.status, 403);
});
