import { pad } from './pad';

export function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return minutes + ':' + pad(seconds, 2);
}
