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


// Timer class
function Timer(options) {
  var timer = this;

  this.label = options.label;
  this.duration = options.duration;
  this.warning = options.warning;

  this.remaining = this.duration;
  this.elapsed = 0;

  this.el = document.createElement('div');
  this.el.classList.add('timer');
  this.el.innerHTML = this.template;
  this.render();

  this.el.addEventListener('click', function(e) {
    if(e.target.classList.contains('time')) {
      if(e.target.classList.contains('focus')) {
        timer.toggleTimer();
      } else {
        timer.toggleFocus();
      }
    }
  });

  return this;
}
Timer.prototype.template = `
  <div class="label"></div>
  <div class="remaining time focus"></div>
  <div class="elapsed time"></div>
`;
Timer.prototype.render = function() {
  this.el.querySelector('.label').innerHTML = this.label;
  this.renderElapsed(0);
  this.renderRemaining(this.duration);
  return this;
};
Timer.prototype.renderRemaining = function(time) {
  this.el.querySelector('.remaining').innerHTML = formatTime(time);
};
Timer.prototype.renderElapsed = function(time) {
  this.el.querySelector('.elapsed').innerHTML = formatTime(time);
};
Timer.prototype.stepTimer = function() {
  this.renderRemaining(this.remaining);
  this.renderElapsed(this.elapsed);
  if(this.remaining > 0) {
    if(this.warning && this.remaining <= this.warning) {
      this.el.classList.add('warning');
    }
    this.elapsed++;
    this.remaining--;
    this.t = setTimeout(this.stepTimer.bind(this), 1000);
    this.isPlaying = true;
  } else {
    this.el.classList.remove('warning');
    this.el.classList.add('stop');
    this.isPlaying = false;
  }
};
Timer.prototype.toggleFocus = function() {
  var $times = this.el.querySelectorAll('.time');
  for (var i = 0; i < $times.length; i++) {
    $times[i].classList.toggle('focus');
  }
};
Timer.prototype.toggleTimer = function() {
  if(this.isPlaying) {
    this.isPlaying = false;
    clearTimeout(this.t);
  } else {
    this.stepTimer();
  }
};


// Main
function main() {
  var presentationTimer = new Timer({
    label: 'Presentation',
    duration: minutesToSeconds(15),
    warning: minutesToSeconds(2)
  });
  var feedbackTimer = new Timer({
    label: 'Feedback',
    duration: minutesToSeconds(5),
    warning: minutesToSeconds(2)
  });
  document.getElementById('app').appendChild(presentationTimer.el);
  document.getElementById('app').appendChild(feedbackTimer.el);
}
