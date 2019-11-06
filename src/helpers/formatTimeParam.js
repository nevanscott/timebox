import { pad } from './pad';

export function formatTimeParam(time, separator='m') {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  let param = minutes + '';
  if(seconds) {
    param += separator + pad(seconds, 2);
  }
  return param;
}
