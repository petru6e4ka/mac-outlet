import EventEmitter from "../../modules/events/EventEmitter.js";
import { PAGE, AUTH } from "../../modules/events/eventNames.js";

export default class Page {
  constructor(template) {
    this.events = new EventEmitter();
    this.parent = document.querySelector("#root");
    this.clearPage(this.parent);
    this.renderPage(template);
    this.name = document.querySelector("#name");
    this.password = document.querySelector("#password");
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
    const link = document.querySelector("#redirect");
    const submit = document.querySelector("#submit");

    if (link) {
      link.addEventListener("click", this.onRedirect.bind(this));
    }
    if (submit) {
      submit.addEventListener("click", this.onSubmit.bind(this));
    }
  }

  onRedirect(e) {
    e.preventDefault();
    this.events.emit(PAGE.SIGNUP);
  }

  onSubmit(e) {
    e.preventDefault();

    const name = this.name.value;
    const password = this.password.value;

    this.events.emit(AUTH.SIGNIN, { name, password });
  }
}
