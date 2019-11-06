import { pad } from './pad';

export function formatTime(time, separator=':') {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return minutes + separator + pad(seconds, 2);
}
