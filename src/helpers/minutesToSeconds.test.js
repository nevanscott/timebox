const { minutesToSeconds } = require('./minutesToSeconds');

test('convert 2 minutes to 120 seconds', () => {
  expect(minutesToSeconds(2)).toBe(120);
});
