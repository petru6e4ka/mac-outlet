const emptyTask = {
  title: "", //string
  start: 0, //number
  duration: 0, //number
  minTitle: "", //string
  bg: "", //string
  left: 0, // number
  width: "", //string
  border: "", //string color
};

export const taskForm = (task, evt) => {
  const minutesFromStart = (evt.pageY - 60) / 2;
  const startHours = 8 + Math.floor(minutesFromStart / 60);
  const startMinutes = Math.round(minutesFromStart % 60);

  console.log(startHours, ":", startMinutes); // minutes from start

  // TODO: set initial values for end from event data

  const _task = task ? task : emptyTask;
  const title = task ? "Update task" : "Add new task";
  const actions = task
    ? `
    <button type="button" class="form-btn" id="delete">Delete</button>
    <button type="submit" class="form-btn" id="update">Update</button>`
    : '<button type="submit" class="form-btn" id="add">Add</button>';

  return `
    <form class="form" name="taskForm">
      <h2 class="form-title">${title}</h2>

      <div class="form-field">
        <input type="text" name="title" required id="title" placeholder="  " title="" class="form-input" value="${_task.title}"/>
        <label for="title" class="form-label">Title</label>
      </div>

      <div class="form-field">
        <input type="text" name="start" required id="start" placeholder="  " title="" class="form-input" pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" value="${startHours}:${startMinutes}"/>
        <label for="start" class="form-label">Start HH:MM</label>
      </div>

      <div class="form-field">
        <input type="text" name="end" required id="end" placeholder="  " title="" class="form-input" pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" />
        <label for="end" class="form-label">End HH:MM</label>
      </div>

      <div class="form-picker">
        <label for="color" class="picker-label">Pick task color</label>
        <input type="color" id="color" name="color" value="#e2ecf5" class="picker-input">
      </div>

      ${actions}
    </form>
  `;
};
