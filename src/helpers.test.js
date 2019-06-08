const { pad, formatTime, minutesToSeconds } = require('./helpers');

test('pad 3 to 4 digits should print 0003', () => {
  expect(pad(3, 4)).toBe('0003');
});
