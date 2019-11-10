const { parseTimerParams } = require('./parseTimerParams');

test('parse a single timer', () => {
  const q = '?t=Decide:34';
  const result = [
    {
      label: 'Decide',
      duration: 34*60
    }
  ]
  expect(parseTimerParams(q)).toStrictEqual(result);
});

test('handle special characters', () => {
  const q = '?t=Presentation:15%7CFeedback:2';
  const result = [
    {
      label: 'Presentation',
      duration: 15*60
    },
    {
      label: 'Feedback',
      duration: 2*60
    }
  ]
  expect(parseTimerParams(q)).toStrictEqual(result);
});
