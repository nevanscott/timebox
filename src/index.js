import { getTimerParams } from './helpers';
import Timer from './Timer';

const defaultTimerParams = [
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

const timerParams = getTimerParams() || defaultTimerParams;

timerParams.map(options => {
  const timer = new Timer(options);
  document.getElementById('app').appendChild(timer.el);
})
