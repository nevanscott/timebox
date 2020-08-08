import pad from './pad';

export default function formatTime(time, separator=':') {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return minutes + separator + pad(seconds, 2);
}
