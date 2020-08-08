import pad from './pad';

export default function formatTimeParam(time, separator='m') {
  const timeInSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  let param = minutes + '';
  if(seconds) {
    param += separator + pad(seconds, 2);
  }
  return param;
}
