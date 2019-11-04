import { parseTimerParams } from './helpers/parseTimerParams';
import Timebox from './Timebox';

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

const timerParams = parseTimerParams() || defaultTimerParams;

const timebox = new Timebox({
  el: document.getElementById('app'),
  timers: timerParams
});
