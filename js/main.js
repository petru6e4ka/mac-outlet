import data from "./data/mock.js";
import Day from "./modules/Day.js";
import Modal from "./modules/Modal.js";
import TaskForm from "./modules/TaskForm.js";
import { taskForm } from "./templates/taskForm.js";
import { TASK } from "./constants/constants.js";

class App {
  constructor() {
    this.day = new Day(data);
    this.modal = new Modal();
    this.taskForm = new TaskForm();
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
