import test from 'node:test';
import assert from 'node:assert/strict';
import { challengeEvidenceTable } from '../ms02-connectors/challenge-data/catalog.mjs';
import {
  SOURCE_STUDY_CHARTS,
  SOURCE_STUDY_NO_PLOT_REASON,
} from '../public/lib/source-chart-guide.js';
import { renderSourceStudyCharts } from '../public/source-charts.js';

test('every source-table chart uses real fields and renders from its own NASA table', async () => {
  assert.equal(SOURCE_STUDY_CHARTS.length, 30);
  const studyIds = [...new Set(SOURCE_STUDY_CHARTS.map(({ studyId }) => studyId))];
  let renderedCharts = 0;

  for (const studyId of studyIds) {
    const table = await challengeEvidenceTable(studyId);
    assert.ok(table, `missing bundled table ${studyId}`);
    const configs = SOURCE_STUDY_CHARTS.filter((chart) => chart.studyId === studyId);
    for (const chart of configs) {
      assert.ok(table.headers.includes(chart.xField), `${chart.id} x field is absent from ${studyId}`);
      assert.ok(table.headers.includes(chart.yField), `${chart.id} y field is absent from ${studyId}`);
    }

    const html = renderSourceStudyCharts(studyId, table.rows, 'en', table.sourceUrl);
    for (const chart of configs) {
      assert.ok(html.includes(`data-source-chart="${chart.id}"`), `${chart.id} did not render`);
      assert.ok(html.includes('data-chart-panel'), `${chart.id} is not interactive`);
      assert.ok(html.includes('class="chart-selection"'), `${chart.id} has no persistent point-details panel`);
      renderedCharts++;
    }
  }

  assert.equal(renderedCharts, SOURCE_STUDY_CHARTS.length);
});

test('paired gas-change plots derive final minus initial within each PSI-25 row', async () => {
  const table = await challengeEvidenceTable('PSI-25');
  const html = renderSourceStudyCharts('PSI-25', table.rows, 'en', table.sourceUrl);
  for (const id of ['psi25-o2-change', 'psi25-co2-change', 'psi25-co-change']) {
    assert.ok(html.includes(`data-source-chart="${id}"`));
  }
  assert.match(html, /derived difference: final − initial/);
  assert.match(html, /Zero-change reference/);
  assert.match(html, /Calibrated  initial O2 % by vol/);
  assert.match(html, /Calibrated final O2 % by vol/);
});

test('tables without numeric plots remain documented rather than silently dropped', () => {
  assert.deepEqual(Object.keys(SOURCE_STUDY_NO_PLOT_REASON).sort(), [
    'PSI-100',
    'PSI-26',
    'PSI-47',
    'PSI-68',
    'PSI-99',
  ]);
  for (const reason of Object.values(SOURCE_STUDY_NO_PLOT_REASON)) {
    assert.ok(reason.en.trim());
    assert.ok(reason.ar.trim());
  }
});
