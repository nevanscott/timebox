import Timer from './Timer';

export default class Timebox {
  constructor({ el, timers=[] }) {
    this.el = el;
    this.timers = timers.map(options => {
      const timer = new Timer(options);
      this.el.appendChild(timer.el);
    })
  }
}
