import test from 'node:test';
import assert from 'node:assert/strict';
import { buildModelContext, validateQualitativeInterpretation } from '../src/server/routes/copilot.mjs';

test('AI receives only a qualitative scope when a verified calculation is shown separately', () => {
  const context = buildModelContext({
    toolAnalysis: { result: { mean: 0.52, n: 198 } },
    computedSummary: 'Mean: 0.52 mm²/s',
    statistics: { sensitiveRawData: true }
  }, true);
  assert.equal(context.analysisType, 'descriptive summary');
  assert.equal(context.verifiedResultDisplayedSeparately, true);
  assert.equal(JSON.stringify(context).includes('0.52'), false);
  assert.equal(JSON.stringify(context).includes('sensitiveRawData'), false);
});

test('non-quantitative AI questions retain their source context', () => {
  const sourceContext = { dataset: 'NASA PSI evidence', limitations: 'source scope' };
  assert.equal(buildModelContext(sourceContext, false), sourceContext);
});

test('AI interpretation accepts a cautious qualitative note beside deterministic results', () => {
  assert.equal(
    validateQualitativeInterpretation('The summary is descriptive, and the fuel groups should be interpreted separately.'),
    'The summary is descriptive, and the fuel groups should be interpreted separately.'
  );
});

test('AI interpretation rejects numbers and unsupported universal, causal, or safety claims', () => {
  for (const answer of [
    'The rate is 0.50 mm²/s across all tests.',
    'Every test proves the flame is safe.',
    'This predicts the hazard for every mission.',
    'These are the only factors that cause the change.'
  ]) assert.equal(validateQualitativeInterpretation(answer), null, answer);
});

test('AI interpretation rejects contradictory data-availability claims and requires scope language', () => {
  for (const answer of [
    'The table does not contain the requested measurements.',
    'The result cannot be determined from this dataset.',
    'The trends appear consistent across the experiment.'
  ]) assert.equal(validateQualitativeInterpretation(answer), null, answer);
  assert.equal(
    validateQualitativeInterpretation('This is a descriptive result within the selected source-table context.'),
    'This is a descriptive result within the selected source-table context.'
  );
});

test('AI interpretation rejects empty or oversized model output', () => {
  assert.equal(validateQualitativeInterpretation('  '), null);
  assert.equal(validateQualitativeInterpretation('a'.repeat(601)), null);
});
