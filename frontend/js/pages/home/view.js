import EventEmitter from "../../modules/events/EventEmitter.js";
import { AUTH } from "../../modules/events/eventNames.js";

export default class Page {
  constructor(template) {
    this.parent = document.querySelector("#root");
    this.events = new EventEmitter();
    this.clearPage(this.parent);
    this.renderPage(template);
    this.onClick();
  }

  renderPage(template) {
    return (this.parent.innerHTML = template);
  }

  clearPage(parent) {
    if (parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  }

  onClick() {
    const logout = document.querySelector("#logout");

    if (logout) {
      logout.addEventListener("click", this.onLogout.bind(this));
    }
  }

  onLogout(e) {
    e.preventDefault;

    this.events.emit(AUTH.LOGOUT);
  }
}
