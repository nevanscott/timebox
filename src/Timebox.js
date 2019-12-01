import { encodeTimerParams } from './helpers/encodeTimerParams';
import Timer from './Timer';

export default class Timebox {
  constructor({ el, timers=[] }) {
    this.el = el;

    this.render({ timers });

    this.lastUpdate = new Date().getTime();

    // every 100 ms, update timers
    this.timerInterval = setInterval(() => {
      this.updateTimers()
    }, 100);
  }

  render(state) {
    this.renderControls();
    this.renderTimers(state.timers);
  }

  renderTimers(timers) {
    const el = document.createElement('div');
    el.classList.add('timers');
    this.timers = timers.map((options, index) => {
      options.onStop = () => {
        this.handleTimerStop(index);
      };
      options.onUpdate = () => {
        this.updateTimerData(index);
      };
      const timer = new Timer(options);
      el.appendChild(timer.el);
      return timer;
    });
    this.el.appendChild(el);
  }

  renderControls() {
    const template = `
      <label class="toggle">
        <input type="checkbox" class="autoplay vh">
        <span class="control"></span>
        <span class="label">Auto-play</span>
      </label>
    `;
    const form = document.createElement('form');
    form.classList.add('controls');
    form.innerHTML = template;
    this.el.appendChild(form);
  }

  get isAutoplay() {
    return this.el.querySelector('.autoplay').checked;
  }

  handleTimerStop(i) {
    if(this.isAutoplay && this.timers[i+1]) {
      this.timers[i+1].start();
    }
  }

  updateTimers() {
    const timeDifference = new Date().getTime() - this.lastUpdate;
    this.timers.map(timer => timer.update(timeDifference))
    this.lastUpdate = new Date().getTime();
  }

  updateTimerData(i) {
    history && history.replaceState(
      {},
      "",
      window.location.pathname + encodeTimerParams(this.timers.map(timer => {
        return {
          label: timer.label,
          duration: timer.duration,
          warning: timer.warning
        }
      }))
    );
  }
}
