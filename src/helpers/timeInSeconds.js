import { minutesToSeconds } from './minutesToSeconds';

export function timeInSeconds(time) {
  if(time.split('m')) {
    const m = parseInt(time.split('m')[0]);
    const s = parseInt(time.split('m')[1] ? time.split('m')[1] : 0);
    return minutesToSeconds(m) + s;
  } else {
    return minutesToSeconds(time);
  }
}
