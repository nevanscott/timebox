import Timer from './Timer';

test('Create a Timer with options', () => {
  const options = {
    label: 'Presentation',
    duration: 15,
    warning: 2
  };
  const timer = new Timer(options);
  expect(timer.label).toBe('Presentation');
  expect(timer.duration).toBe(15);
  expect(timer.warning).toBe(2);
});
