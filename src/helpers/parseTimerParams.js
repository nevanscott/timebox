import { timeInSeconds } from './timeInSeconds';

export function parseTimerParams(str=window.location.search) {
  return str.includes('?t=') && decodeURIComponent(str.split('?t=')[1]).split('/').map(
    (part) => {
      const decodedObject = {
        label: part.split(':')[0].replace('+', ' '),
        duration: timeInSeconds(part.split(':')[1].split(',')[0])
      };
      if(part.split(':')[1].split(',')[1]) {
        decodedObject.warning = timeInSeconds(part.split(':')[1].split(',')[1]);
      }
      return decodedObject;
    }
  );
}
