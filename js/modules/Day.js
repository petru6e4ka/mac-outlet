import { task } from "../templates/task.js";

class Day {
  constructor(plan) {
    this.defaultBgColor = "#E2ECF5";
    this.defaultBorderColor = "#6E9ECF";
    this.plan = plan.reduce(this.reducer.bind(this), []);
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
      _task.left = prevElement.left + 200;
      _task.width = `calc(100% - ${prevElement.left + 200}px)`;
      prevElement.width = `200px`;
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
