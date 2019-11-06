const { formatTimeParam } = require('./formatTimeParam');

test('convert 142 seconds to 2m22', () => {
  expect(formatTimeParam(142)).toBe('2m22');
});

test('convert 122 seconds to 2m02', () => {
  expect(formatTimeParam(122)).toBe('2m02');
});

test('convert 120 seconds to 2', () => {
  expect(formatTimeParam(120)).toBe('2');
});
