import { timeConverter } from "../utils/time.js";
import { DAY_LIMIT, DAY_MINUTES, MINUTES } from "../constants/constants.js";

export class Task {
  constructor(task, onStart) {
    this.now = Math.round(
      (new Date().getTime() -
        timeConverter.getSecondsFromTimeStr(DAY_LIMIT.START_FORMATED)) /
        1000 /
        MINUTES.IN_HOUR
    );

    if (
      this.now < 0 ||
      this.now > DAY_MINUTES ||
      this.now > task.start + task.duration
    ) {
      return;
    }

    this.task = task;
    this.timingCheck = this.timingCheckHandler.bind(this);
    this.onStart = onStart;
    this.timerId = null;
    //this.timer();

    if (
      this.now >= this.task.start &&
      this.now < this.task.start + this.task.duration
    ) {
      this.onStart(this.task);
      return;
    }

    this.timer();
  }

  timingCheckHandler() {
    if (
      this.now >= this.task.start &&
      this.now < this.task.start + this.task.duration
    ) {
      this.onStart(this.task);
      clearInterval(this.timerId);
      return;
    }

    this.now += 1;
  }

  timer() {
    this.timerId = setInterval(
      this.timingCheck,
      MINUTES.IN_HOUR * MINUTES.MILISECONDS
    );
  }
}
