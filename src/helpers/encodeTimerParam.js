import formatTimeParam from './formatTimeParam';

export default function encodeTimerParam(timer) {
  const label = timer.label.replace(/\s+/, '+');
  const duration = formatTimeParam(timer.duration);
  let encodedString = label + ':' + duration;
  if(timer.warning) {
    const warning = formatTimeParam(timer.warning);
    encodedString += ',' + warning;
  }
  return encodedString;
}
