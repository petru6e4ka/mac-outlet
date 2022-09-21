import { task } from "../templates/task.js";
import { tasks } from "../services/storage.js";
import {
  MIN_TASK_WIDTH,
  MINUTES_TO_PIXELS,
  HEADER_HEIGHT,
  HOUR,
  DAY_LIMIT,
  DEFAULT_DURATION,
  DEFAULT_TITLE,
} from "../constants/constants.js";
import { color } from "../utils/color.js";

class Day {
  constructor(plan) {
    const savedTasks = tasks.get();

    this.maxPosY =
      HEADER_HEIGHT +
      (DAY_LIMIT.END - DAY_LIMIT.START) * HOUR * MINUTES_TO_PIXELS;

    if (savedTasks) {
      this.data = savedTasks;
    }

    if (!savedTasks) {
      this.data = plan;
      tasks.set(this.data);
    }

    this.defaultBgColor = "#E2ECF5";
    // this.defaultBorderColor = "#6E9ECF";
    this.plan = this.data
      .sort((a, b) => a.start - b.start)
      .reduce(this.reducer.bind(this), []);
    this.parent = document.querySelector("#tasks");

    this.render();
  }

  reducer(previousValue, currentValue) {
    const _task = {
      ...currentValue,
      bg: currentValue.color ? currentValue.color : this.defaultBgColor,
      border: currentValue.color
        ? color.getBorderColorString(currentValue.color)
        : color.getBorderColorString(this.defaultBgColor),
      left: 0,
      minTitle: currentValue.title,
      width: "100%",
    };

    const prevElement =
      previousValue && previousValue[previousValue.length - 1];

    if (
      prevElement &&
      currentValue.start > prevElement.start &&
      currentValue.start < prevElement.start + prevElement.duration
    ) {
      _task.left = prevElement.left + MIN_TASK_WIDTH;
      _task.width = `calc(100% - ${prevElement.left + MIN_TASK_WIDTH}px)`;
      prevElement.width = `${MIN_TASK_WIDTH}px`;
      prevElement.minTitle = `${
        prevElement.title.length > 25
          ? prevElement.minTitle.slice(0, 25) + "..."
          : prevElement.minTitle
      }`;
    }

    return previousValue.concat([_task]);
  }

  render() {
    const tasks = this.plan.map((element) => task(element)).join("");

    return (this.parent.innerHTML = tasks);
  }

  update({ data, event }) {
    if (!data && event) this.newTaskHandler(event);
    if (!data && !event) {
      this.plan = tasks
        .get()
        .sort((a, b) => a.start - b.start)
        .reduce(this.reducer.bind(this), []);

      this.clearProducts();
      this.render();
    }
  }

  newTaskHandler(event) {
    const newTask = {};

    if (event.pageY >= this.maxPosY) {
      newTask.start = Math.round(
        (this.maxPosY - HEADER_HEIGHT) / MINUTES_TO_PIXELS - DEFAULT_DURATION
      );
      newTask.duration = DEFAULT_DURATION;
    } else if (
      event.pageY + DEFAULT_DURATION * MINUTES_TO_PIXELS >=
      this.maxPosY
    ) {
      newTask.duration = Math.floor(
        (this.maxPosY - event.pageY) / MINUTES_TO_PIXELS
      );
      newTask.start = Math.round(
        (this.maxPosY - HEADER_HEIGHT) / MINUTES_TO_PIXELS - newTask.duration
      );
    } else {
      newTask.start = Math.round(
        (event.pageY - HEADER_HEIGHT) / MINUTES_TO_PIXELS
      );
      newTask.duration = DEFAULT_DURATION;
    }

    newTask.title = DEFAULT_TITLE;
    newTask.id = "new";
    this.plan = this.plan
      .concat([newTask])
      .sort((a, b) => a.start - b.start)
      .reduce(this.reducer.bind(this), []);

    this.clearProducts();
    this.render();
  }

  cancel(data) {
    if (!data) {
      this.plan = this.plan
        .filter((elem) => !elem.id)
        .sort((a, b) => a.start - b.start)
        .reduce(this.reducer.bind(this), []);

      this.clearProducts();
      this.render();
    }
  }

  clearProducts() {
    if (this.parent) {
      while (this.parent.lastChild) {
        this.parent.removeChild(this.parent.lastChild);
      }
    }
  }
}

export default Day;
