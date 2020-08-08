import encodeTimerParam from './encodeTimerParam';

export default function encodeTimerParams(params) {
  return '?t=' + params.map(encodeTimerParam).join('/');
}
