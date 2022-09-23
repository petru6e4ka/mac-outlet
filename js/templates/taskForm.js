import {
  HEADER_HEIGHT,
  MINUTES,
  DEFAULTS,
  ACTIONS,
} from "../constants/constants.js";
import { timeConverter } from "../utils/time.js";

const emptyTask = {
  title: "",
  start: 0,
  duration: 0,
  minTitle: "",
  bg: "",
  left: 0,
  width: "",
  border: "",
};

export const taskForm = (task, evt) => {
  const taskLimits = {
    start: 0,
    end: 0,
  };

  if (!task) {
    const [start, end] = timeConverter.posYToTimeFormated(evt.pageY);

    taskLimits.start = start;
    taskLimits.end = end;
  }

  if (task) {
    const [start] = timeConverter.posYToTimeFormated(
      task.start * MINUTES.TO_PX + HEADER_HEIGHT
    );
    const [end] = timeConverter.posYToTimeFormated(
      task.start * MINUTES.TO_PX + HEADER_HEIGHT + task.duration * MINUTES.TO_PX
    );
    taskLimits.start = start;
    taskLimits.end = end;
  }

  const _task = task ? task : emptyTask;
  const title = task ? "Update task" : "Add new task";
  const actions = task
    ? `
    <div class="form-actions">
      <button type="button" data-action="${ACTIONS.DELETE}" class="form-btn" id="delete">Delete</button>
      <button type="submit" data-action="${ACTIONS.UPDATE}" class="form-btn" id="submit">Update</button>
    </div>`
    : `<button type="submit" data-action="${ACTIONS.CREATE}" class="form-btn" id="submit">Add</button>`;

  return `
    <form class="form" name="taskForm">
      <h2 class="form-title">${title}</h2>

      <div class="form-field">
        <input type="text" name="title" required id="title" placeholder="Your awesome task title" title="" class="form-input" value="${
          _task.title
        }" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"/>
        <label for="title" class="form-label">Title</label>
      </div>

      <div class="form-field">
        <input type="text" name="start" required id="start" placeholder="HH:MM" title="" class="form-input" pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" value="${
          taskLimits.start
        }" />
        <label for="start" class="form-label">Start</label>
      </div>

      <div class="form-field">
        <input type="text" name="end" required id="end" placeholder="HH:MM" title="" class="form-input" pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" value="${
          taskLimits.end
        }" />
        <label for="end" class="form-label">End</label>
      </div>

      <div class="form-picker">
        <label for="color" class="picker-label">Your task color</label>
        <input type="color" id="color" name="color" value="${
          task ? task.bg : DEFAULTS.COLOR
        }" class="picker-input">
      </div>

      ${actions}
    </form>
  `;
};
