export function pad(num, size) {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

export function formatTime(time) {
  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  return minutes + ':' + pad(seconds,2);
}

export function minutesToSeconds(minutes) {
  return minutes * 60;
}
