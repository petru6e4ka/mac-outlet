import {
  HEADER_HEIGHT,
  MINUTES_TO_PIXELS,
  DEFAULT_COLOR,
} from "../constants/constants.js";
import { timeConverter } from "../utils/time.js";

const emptyTask = {
  title: "", // string
  start: 0, // number
  duration: 0, // number
  minTitle: "", // string
  bg: "", // string
  left: 0, // number
  width: "", // string
  border: "", // string color
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
      task.start * MINUTES_TO_PIXELS + HEADER_HEIGHT
    );
    const [end] = timeConverter.posYToTimeFormated(
      task.start * MINUTES_TO_PIXELS +
        HEADER_HEIGHT +
        task.duration * MINUTES_TO_PIXELS
    );
    taskLimits.start = start;
    taskLimits.end = end;
  }

  const _task = task ? task : emptyTask;
  const title = task ? "Update task" : "Add new task";
  const actions = task
    ? `
    <div class="form-actions">
      <button type="button" class="form-btn" id="delete">Delete</button>
      <button type="submit" data-action="update" class="form-btn" id="submit">Update</button>
    </div>`
    : '<button type="submit" data-action="create" class="form-btn" id="submit">Add</button>';

  return `
    <form class="form" name="taskForm">
      <h2 class="form-title">${title}</h2>

      <div class="form-field">
        <input type="text" name="title" required id="title" placeholder="Your awesome task title" title="" class="form-input" value="${
          _task.title
        }"/>
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
          task ? task.bg : DEFAULT_COLOR
        }" class="picker-input">
      </div>

      ${actions}
    </form>
  `;
};
