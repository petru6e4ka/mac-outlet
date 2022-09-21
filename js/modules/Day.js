import { task } from "../templates/task.js";
import { tasks } from "../services/storage.js";
import { MIN_WIDTH } from "../constants/constants.js";

class Day {
  constructor(plan) {
    const savedTasks = tasks.get();

    if (savedTasks) {
      this.data = savedTasks;
    }

    if (!savedTasks) {
      this.data = plan;
      tasks.set(this.data);
    }

    this.defaultBgColor = "#E2ECF5";
    this.defaultBorderColor = "#6E9ECF";
    this.plan = this.data.reduce(this.reducer.bind(this), []);
    this.parent = document.querySelector("#tasks");

    this.render();
  }

  reducer(previousValue, currentValue) {
    const _task = {
      ...currentValue,
      bg: this.defaultBgColor,
      border: this.defaultBorderColor,
      left: 0,
      minTitle: currentValue.title,
    };

    const prevElement =
      previousValue && previousValue[previousValue.length - 1];

    if (
      prevElement &&
      currentValue.start > prevElement.start &&
      currentValue.start < prevElement.start + prevElement.duration
    ) {
      _task.left = prevElement.left + MIN_WIDTH;
      _task.width = `calc(100% - ${prevElement.left + MIN_WIDTH}px)`;
      prevElement.width = `${MIN_WIDTH}px`;
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
}

export default Day;
