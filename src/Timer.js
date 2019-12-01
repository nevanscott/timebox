import { formatTime } from './helpers/formatTime';

export default class Timer {

  constructor(options) {
    const timer = this;

    this.isPlaying = false;
    this.isFinished = false;

    this.label = options.label;
    this.duration = options.duration;
    this.warning = options.warning;

    this.remainingMs = this.duration * 1000;

    this.onStop = options.onStop;

    this.template = `
      <h2 class="label"></h2>
      <time class="remaining time focus"></time>
      <time class="elapsed time"></time>
    `;

    this.el = document.createElement('article');
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
      } else {
        timer.toggleTimer();
      }
    });

    return this;
  }

  get remaining() {
    return Math.ceil(this.remainingMs / 1000);
  }

  get elapsed() {
    return this.duration - this.remaining;
  }

  render() {
    this.el.querySelector('.label').innerHTML = this.label;
    this.renderElapsed(0);
    this.renderRemaining(this.duration);
    return this;
  }

  renderRemaining(time) {
    this.el.querySelector('.remaining').innerHTML = formatTime(time);
  }

  renderElapsed(time) {
    this.el.querySelector('.elapsed').innerHTML = formatTime(time);
  }

  update(timeDifference) {
    if (!this.isPlaying) {
      return;
    }

    this.remainingMs -= timeDifference;

    if(this.remainingMs > 0) {
      if(this.warning && this.remaining <= this.warning) {
        this.el.classList.add('warning');
      }
      this.isPlaying = true;
      this.el.classList.add('is-playing');
    } else {
      this.remainingMs = 0;
      this.el.classList.remove('warning');
      this.el.classList.add('stop');
      this.isPlaying = false;
      this.isFinished = true;
      this.el.classList.remove('is-playing');
      this.onStop();
    }

    this.renderRemaining(this.remaining);
    this.renderElapsed(this.elapsed);
  }

  toggleFocus() {
    const $times = this.el.querySelectorAll('.time');
    for (let i = 0; i < $times.length; i++) {
      $times[i].classList.toggle('focus');
    }
  }

  toggleTimer() {
    if(this.isPlaying) {
      this.pause();
    } else if(this.isFinished) {
      this.reset();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
  }

  pause() {
    this.isPlaying = false;
    this.el.classList.remove('is-playing');
  }

  reset() {
    this.isPlaying = false;
    this.isFinished = false;
    this.el.classList.remove('is-playing');
    this.el.classList.remove('stop');
    this.remainingMs = this.duration * 1000;
    this.render();
  }

  start() {
    if(!this.isPlaying) {
      this.reset();
      this.play();
    }
  }

}
