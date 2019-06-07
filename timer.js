// Globals
var t;
var remaining;
var elapsed = 0;
var warning;
var isPlaying = false;


// Helpers
function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

function formatTime(time) {
  var minutes = Math.floor(time/60);
  var seconds = time % 60;
  return minutes + ':' + pad(seconds,2);
}

function minutesToSeconds(minutes) {
  return minutes * 60;
}


// Renderers
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


// Timer functions
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

function toggleFocus() {
  var $times = document.querySelectorAll('.time');
  for (var i = 0; i < $times.length; i++) {
    $times[i].classList.toggle('focus');
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

function initTimer(time) {
  remaining = time;
  elapsed = 0;
}


// Event Listeners
function addEventListeners() {
  var $timer = document.getElementById('timer');
  $timer.addEventListener('click', function(e) {
    if(e.target.classList.contains('time')) {
      if(e.target.classList.contains('focus')) {
        toggleTimer();
      } else {
        toggleFocus();
      }
    }
  });
}


// Main
function main() {
  var duration = minutesToSeconds(15);
  var warning = minutesToSeconds(2);
  renderTimer({
    label: 'Presentation',
    duration: duration,
    warning: warning
  });
  addEventListeners();
  initTimer(duration);
}
