import { minutesToSeconds } from './helpers';
import Timer from './Timer';

// Main
function main() {
  const presentationTimer = new Timer({
    label: 'Presentation',
    duration: minutesToSeconds(15),
    warning: minutesToSeconds(2)
  });
  const feedbackTimer = new Timer({
    label: 'Feedback',
    duration: minutesToSeconds(5),
    warning: minutesToSeconds(2)
  });
  document.getElementById('app').appendChild(presentationTimer.el);
  document.getElementById('app').appendChild(feedbackTimer.el);
}

main();
