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

export function timeInSeconds(time) {
  const m = parseInt(time.split('m')[0]);
  const s = parseInt(time.split('m')[1] ? time.split('m')[1] : 0);
  return minutesToSeconds(m) + s;
}

export function getTimerParams(str=window.location.search) {
  return str.includes('?t=') && str.split('?t=')[1].split('|').map(
    (part) => {
      return {
        label: part.split(':')[0],
        duration: timeInSeconds(part.split(':')[1])
      }
    }
  );
}
