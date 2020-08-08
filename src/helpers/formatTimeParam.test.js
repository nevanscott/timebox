import formatTimeParam from './formatTimeParam';

test('convert 142 seconds to 2m22', () => {
  expect(formatTimeParam(142*1000)).toBe('2m22');
});

test('convert 122 seconds to 2m02', () => {
  expect(formatTimeParam(122*1000)).toBe('2m02');
});

test('convert 120 seconds to 2', () => {
  expect(formatTimeParam(120*1000)).toBe('2');
});
