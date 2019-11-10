import Timer from './Timer';

export default class Timebox {
  constructor({ el, timers=[] }) {
    this.el = el;

    this.timers = timers.map(options => {
      const timer = new Timer(options);
      this.el.appendChild(timer.el);
      return timer;
    });

    this.lastUpdate = new Date().getTime();

    // every 100 ms, update timers
    this.timerInterval = setInterval(() => {
      this.updateTimers()
    }, 100);
  }

  updateTimers() {
    const timeDifference = new Date().getTime() - this.lastUpdate;
    this.timers.map(timer => timer.update(timeDifference))
    this.lastUpdate = new Date().getTime();
  }
}
