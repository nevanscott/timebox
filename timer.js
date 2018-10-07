let t;
let remaining;
let elapsed = 0;
let warning;
let isPlaying = false;

function renderRemaining(time) {
  document.querySelector('#remaining').innerHTML = formatTime(time);
}

function renderElapsed(time) {
  document.querySelector('#elapsed').innerHTML = formatTime(time);
}

function renderTimer(config) {
  document.querySelector('#label').innerHTML = config.label;
  renderElapsed(0);
  renderRemaining(config.duration);
}

function minutesToSeconds(minutes) {
  return minutes * 60;
}

function stepTimer() {
  renderRemaining(remaining);
  renderElapsed(elapsed);
  if(remaining > 0) {
    if(warning && remaining <= warning) {
      document.body.className = 'warning';
    }
    elapsed++;
    remaining--;
    t = setTimeout(stepTimer, 1000);
    isPlaying = true;
  } else {
    document.body.className = 'stop';
    isPlaying = false;
  }
}

function toggleTimer() {
  if(isPlaying) {
    isPlaying = false;
    clearTimeout(t);
  } else {
    stepTimer();
  }
}

function startTimer(time) {
  remaining = time;
  elapsed = 0;
  stepTimer();
}

function addEventListeners() {

}


function main() {
  const duration = minutesToSeconds(.2);
  const warning = minutesToSeconds(.1);
  renderTimer({
    label: 'Presentation',
    duration: duration,
    warning: warning
  });
  addEventListeners();
  startTimer(duration);
}

function formatTime(time) {
  var minutes = Math.floor(time/60);
  var seconds = time % 60;
  return minutes + ':' + pad(seconds,2);
}

function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}
