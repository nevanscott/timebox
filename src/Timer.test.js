import Timer from './Timer';

let timer;

beforeAll(() => {
  const options = {
    label: 'Presentation',
    duration: 15,
    warning: 2
  };
  timer = new Timer(options);
  document.body.appendChild(timer.el);
});

test('Create a Timer with options', () => {
  expect(timer.label).toBe('Presentation');
  expect(timer.duration).toBe(15);
  expect(timer.warning).toBe(2);
});

test('Show correct remaining time', () => {
  const output = timer.el.querySelector('.remaining').innerHTML;
  const expectedOutput = '0:15';
  expect(output).toBe(expectedOutput);
});

test('Show correct elapsed time', () => {
  const output = timer.el.querySelector('.elapsed').innerHTML;
  const expectedOutput = '0:00';
  expect(output).toBe(expectedOutput);
});

test('Focus on remaining time', () => {
  const remainingHasFocus = timer.el.querySelector('.remaining').classList.contains('focus');
  const elapsedHasFocus = timer.el.querySelector('.elapsed').classList.contains('focus');
  expect(remainingHasFocus).toBeTruthy();
  expect(elapsedHasFocus).toBeFalsy();
});

test('Click on elapsed time to change focus', () => {
  timer.el.querySelector('.elapsed').click();
  const remainingHasFocus = timer.el.querySelector('.remaining').classList.contains('focus');
  const elapsedHasFocus = timer.el.querySelector('.elapsed').classList.contains('focus');
  expect(remainingHasFocus).toBeFalsy();
  expect(elapsedHasFocus).toBeTruthy();
});

test('Click on remaining time to change focus', () => {
  timer.el.querySelector('.remaining').click();
  const remainingHasFocus = timer.el.querySelector('.remaining').classList.contains('focus');
  const elapsedHasFocus = timer.el.querySelector('.elapsed').classList.contains('focus');
  expect(remainingHasFocus).toBeTruthy();
  expect(elapsedHasFocus).toBeFalsy();
});

test('Click on focused time to toggle playing', () => {
  expect(timer.isPlaying).toBeFalsy();
  timer.el.querySelector('.focus').click();
  expect(timer.isPlaying).toBeTruthy();
  timer.el.querySelector('.focus').click();
  expect(timer.isPlaying).toBeFalsy();
});
