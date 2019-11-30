import { formatTimeParam } from './formatTimeParam';

export function encodeTimerParam(timer) {
  const label = timer.label.replace(/\s+/, '+');
  const duration = formatTimeParam(timer.duration);
  const warning = formatTimeParam(timer.warning);
  let encodedString = label + ':' + duration;
  if(timer.warning) {
    encodedString += ',' + warning;
  }
  return encodedString;
}
