import formatTime from './formatTime';

test('convert 142 seconds to 2:22', () => {
  expect(formatTime(142)).toBe('2:22');
});

test('convert 122 seconds to 2:02', () => {
  expect(formatTime(122)).toBe('2:02');
});
