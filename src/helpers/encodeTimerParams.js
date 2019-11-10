import { encodeTimerParam } from './encodeTimerParam';

export function encodeTimerParams(params) {
  return '?t=' + params.map(encodeTimerParam).join('/');
}
