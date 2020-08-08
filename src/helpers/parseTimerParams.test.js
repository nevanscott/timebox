import parseTimerParams from './parseTimerParams';

test('parse a single timer', () => {
  const q = '?t=Decide:34';
  const result = [
    {
      label: 'Decide',
      duration: 34*60*1000
    }
  ]
  expect(parseTimerParams(q)).toStrictEqual(result);
});

test('parse 2 timers', () => {
  const q = '?t=Presentation:15/Feedback:2';
  const result = [
    {
      label: 'Presentation',
      duration: 15*60*1000
    },
    {
      label: 'Feedback',
      duration: 2*60*1000
    }
  ]
  expect(parseTimerParams(q)).toStrictEqual(result);
});

test('parse a timer with a warning', () => {
  const q = '?t=Decide:34,5';
  const result = [
    {
      label: 'Decide',
      duration: 34*60*1000,
      warning: 5*60*1000
    }
  ]
  expect(parseTimerParams(q)).toStrictEqual(result);
});
