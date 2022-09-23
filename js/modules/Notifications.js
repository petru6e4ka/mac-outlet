import { Task } from "./Task.js";
import { tasks } from "../services/storage.js";
import { notification } from "../templates/notification.js";

export class Notifications {
  constructor(data) {
    this.parent = document.querySelector("#notifs");
    this.tasks = data;
    this.notifs = this.tasks.map(
      (event) => new Task(event, this.createNotif.bind(this))
    );
  }

  createId(str) {
    return str.split(" ").join("-");
  }

  createNotif(task) {
    this.parent.insertAdjacentHTML(
      "afterbegin",
      notification({ ...task, id: this.createId(task.title) })
    );

    this.parent
      .querySelector(`button[value="${this.createId(task.title)}"]`)
      .addEventListener("click", this.onClose.bind(this));
  }

  update() {
    this.notifs.forEach((notif) => clearInterval(notif.timerId));
    if (this.parent) {
      while (this.parent.lastChild) {
        this.parent.removeChild(this.parent.lastChild);
      }
    }

    const savedTasks = tasks.get();

    if (savedTasks) {
      this.tasks = savedTasks.sort((a, b) => a.start - b.start);
      this.notifs = this.tasks.map(
        (event) => new Task(event, this.createNotif.bind(this))
      );
    }
  }

  onClose(evt) {
    const notif = this.parent.querySelector(`#${evt.target.value}`);
    const btn = this.parent.querySelector(
      `button[value="${evt.target.value}"]`
    );

    if (btn) {
      btn.removeEventListener("click", this.onClose.bind(this));
    }

    if (notif) {
      notif.classList.remove("active");
      setTimeout(() => {
        notif.remove();
      }, 250);
    }
  }
}

export default Notifications;
