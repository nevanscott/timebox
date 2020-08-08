import timeInSeconds from './timeInSeconds';

test('return seconds if just a number', () => {
  expect(timeInSeconds('34')).toBe(34*60);
});

test('return seconds from mixed minutes and seconds', () => {
  expect(timeInSeconds('34m30')).toBe(34*60+30);
});
