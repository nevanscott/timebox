import { timeInSeconds } from './timeInSeconds';

export function parseTimerParams(str=window.location.search) {
  return str.includes('?t=') && decodeURIComponent(str.split('?t=')[1]).split('/').map(
    (part) => {
      return {
        label: part.split(':')[0].replace('+', ' '),
        duration: timeInSeconds(part.split(':')[1])
      }
    }
  );
}
