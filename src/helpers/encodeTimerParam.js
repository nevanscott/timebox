import { formatTimeParam } from './formatTimeParam';

export function encodeTimerParam(timer) {
  return timer.label.replace(/\s+/, '+') + ':' + formatTimeParam(timer.duration);
}
