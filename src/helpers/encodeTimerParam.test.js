const { encodeTimerParam } = require('./encodeTimerParam');

test('Decide for 2', () => {
  const param = {
    label: 'Decide',
    duration: 34*60
  };
  const q = 'Decide:34';
  expect(encodeTimerParam(param)).toBe(q);
});

test('Present for 10', () => {
  const param = {
    label: 'Present',
    duration: 10*60
  };
  const q = 'Present:10';
  expect(encodeTimerParam(param)).toBe(q);
});

test('Label with spaces', () => {
  const param = {
    label: 'Audience Questions',
    duration: 34*60
  };
  const q = 'Audience+Questions:34';
  expect(encodeTimerParam(param)).toBe(q);
});

test('Timer with a warning', () => {
  const param = {
    label: 'Present',
    duration: 10*60,
    warning: 2*60
  };
  const q = 'Present:10,2';
  expect(encodeTimerParam(param)).toBe(q);
});
