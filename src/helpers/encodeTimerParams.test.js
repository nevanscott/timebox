const { encodeTimerParams } = require('./encodeTimerParams');

test('1 timer', () => {
  const params = [
    {
      label: 'Decide',
      duration: 34*60
    }
  ]
  const q = '?t=Decide:34';
  expect(encodeTimerParams(params)).toBe(q);
});

test('2 timers', () => {
  const params = [
    {
      label: 'Decide',
      duration: 2*60
    },
    {
      label: 'Present',
      duration: 10*60
    }
  ]
  const q = '?t=Decide:2/Present:10';
  expect(encodeTimerParams(params)).toBe(q);
});
