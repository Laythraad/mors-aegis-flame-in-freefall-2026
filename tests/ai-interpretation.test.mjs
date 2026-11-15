import test from 'node:test';
import assert from 'node:assert/strict';
import { validateQualitativeInterpretation } from '../src/server/routes/copilot.mjs';

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

test('AI interpretation rejects empty or oversized model output', () => {
  assert.equal(validateQualitativeInterpretation('  '), null);
  assert.equal(validateQualitativeInterpretation('a'.repeat(601)), null);
});
