import data from "./data/mock.js";
import Day from "./modules/Day.js";
import Modal from "./modules/Modal.js";
import TaskForm from "./modules/TaskForm.js";
import { taskForm } from "./templates/taskForm.js";
import { TASK } from "./constants/constants.js";
import { Notifications } from "./modules/Notifications.js";
import { tasks } from "./services/storage.js";

class App {
  constructor() {
    const savedTasks = tasks.get();

    if (savedTasks) {
      this.tasks = savedTasks.sort((a, b) => a.start - b.start);
    }

    if (!savedTasks) {
      tasks.set(data);
      this.tasks = data.sort((a, b) => a.start - b.start);
    }

    this.day = new Day(this.tasks);
    this.modal = new Modal();
    this.taskForm = new TaskForm();
    this.notifications = new Notifications(this.tasks);
    this.onAdd();

    this.modal.events.subscribe(TASK.OPEN, this.day.update.bind(this.day));
    this.modal.events.subscribe(TASK.CANCEL, this.day.cancel.bind(this.day));

    this.taskForm.events.subscribe(TASK.SAVED, this.day.update.bind(this.day));
    this.taskForm.events.subscribe(
      TASK.UPDATED,
      this.day.update.bind(this.day)
    );
    this.taskForm.events.subscribe(
      TASK.SAVED,
      this.modal.onClose.bind(this.modal)
    );
    this.taskForm.events.subscribe(
      TASK.UPDATED,
      this.modal.onClose.bind(this.modal)
    );
    this.taskForm.events.subscribe(
      TASK.DELETED,
      this.day.update.bind(this.day)
    );
    this.taskForm.events.subscribe(
      TASK.DELETED,
      this.modal.onClose.bind(this.modal)
    );

    this.day.events.subscribe(
      TASK.CHANGE,
      this.modal.openModal.bind(
        this.modal,
        taskForm,
        this.taskForm.onChange.bind(this.taskForm),
        this.taskForm.onSubmit.bind(this.taskForm),
        this.taskForm.onClose.bind(this.taskForm)
      )
    );

    this.taskForm.events.subscribe(
      TASK.SAVED,
      this.notifications.update.bind(this.notifications)
    );
    this.taskForm.events.subscribe(
      TASK.UPDATED,
      this.notifications.update.bind(this.notifications)
    );
    this.taskForm.events.subscribe(
      TASK.DELETED,
      this.notifications.update.bind(this.notifications)
    );
  }

  onAdd() {
    const container = document.querySelector("#tasklist-columns");

    if (container) {
      container.addEventListener(
        "click",
        this.modal.openModal.bind(
          this.modal,
          taskForm,
          this.taskForm.onChange.bind(this.taskForm),
          this.taskForm.onSubmit.bind(this.taskForm),
          this.taskForm.onClose.bind(this.taskForm),
          null
        )
      );
    }
  }
}

new App();
