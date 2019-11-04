import { timeInSeconds } from './timeInSeconds';

export function parseTimerParams(str=window.location.search) {
  return str.includes('?t=') && str.split('?t=')[1].split('|').map(
    (part) => {
      return {
        label: part.split(':')[0],
        duration: timeInSeconds(part.split(':')[1])
      }
    }
  );
}
