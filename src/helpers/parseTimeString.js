import minutesToSeconds from './minutesToSeconds';

export default function parseTimeString(time) {
  if(time.split('m')) {
    const m = parseInt(time.split('m')[0]);
    const s = parseInt(time.split('m')[1] ? time.split('m')[1] : 0);
    return 1000 * (minutesToSeconds(m) + s);
  } else {
    return 1000 * minutesToSeconds(time);
  }
}
