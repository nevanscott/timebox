import pad from './pad';

test('pad 3 to 4 digits should print 0003', () => {
  expect(pad(3, 4)).toBe('0003');
});

test('pad 7 to 2 digits should print 07', () => {
  expect(pad(7, 2)).toBe('07');
});

test('pad 49 to 5 digits should print 00049', () => {
  expect(pad(49, 5)).toBe('00049');
});
