import Timebox from './Timebox';

let timebox;

beforeAll(() => {
  const timerParams = [
    {
      label: 'Presentation',
      duration: 15*60,
      warning: 2*60
    },
    {
      label: 'Feedback',
      duration: 2*60,
      warning: 1*60
    }
  ];

  const el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);

  timebox = new Timebox({
    el: document.getElementById('app'),
    timers: timerParams
  });
});

test('Expect two timers on the page', () => {
  expect(document.querySelectorAll('.timer').length).toBe(2);
});
