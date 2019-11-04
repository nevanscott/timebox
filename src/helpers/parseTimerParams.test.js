const { parseTimerParams } = require('./parseTimerParams');

test('?t=Decide:34', () => {
  const q = '?t=Decide:34';
  const result = [
    {
      label: 'Decide',
      duration: 34*60
    }
  ]
  expect(parseTimerParams(q)).toStrictEqual(result);
});
