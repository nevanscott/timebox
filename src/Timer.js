import { formatTime } from './helpers';

export default class Timer {

  constructor(options) {
    const timer = this;

    this.label = options.label;
    this.duration = options.duration;
    this.warning = options.warning;

    this.remaining = this.duration;
    this.elapsed = 0;

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
      }
    });

    return this;
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

  stepTimer() {
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
      this.el.classList.add('is-playing');
    } else {
      this.el.classList.remove('warning');
      this.el.classList.add('stop');
      this.isPlaying = false;
      this.el.classList.remove('is-playing');
    }
  }

  toggleFocus() {
    const $times = this.el.querySelectorAll('.time');
    for (let i = 0; i < $times.length; i++) {
      $times[i].classList.toggle('focus');
    }
  }

  toggleTimer() {
    if(this.isPlaying) {
      this.isPlaying = false;
      this.el.classList.remove('is-playing');
      clearTimeout(this.t);
    } else {
      this.stepTimer();
    }
  }

}
