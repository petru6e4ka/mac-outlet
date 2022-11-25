import EventEmitter from "../../modules/events/EventEmitter.js";
import { PAGE, AUTH } from "../../modules/events/eventNames.js";

export default class Page {
  constructor(template) {
    this.data = {};
    this.events = new EventEmitter();
    this.parent = document.querySelector("#root");
    this.clearPage(this.parent);
    this.renderPage(template);
    this.name = document.querySelector("#name");
    this.password = document.querySelector("#password");
    this.email = document.querySelector("#email");
    this.error = document.querySelector("#error");
    this.submit = document.querySelector("#submit");
    this.onClick();
    this.onChange();
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

  onChange() {
    this.name.addEventListener("input", this.onValidate.bind(this));
    this.password.addEventListener("input", this.onValidate.bind(this));
    this.email.addEventListener("input", this.onValidate.bind(this));
  }

  onValidate(e) {
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    this.error.textContent = "";
    this.data[e.target.name] = e.target.value;

    if (!this.data.password || !this.data.email || !this.data.name) {
      this.submit.setAttribute("disabled", true);
      return;
    }

    if (this.data.name.trim().length < 2) {
      this.error.textContent = "Your name should be longer than 2 characters";
      this.submit.setAttribute("disabled", true);
      return;
    }

    if (!emailPattern.test(this.data.email.trim().toLowerCase())) {
      this.error.textContent = "Email is not correct";
      this.submit.setAttribute("disabled", true);
      return;
    }

    if (!passwordPattern.test(this.data.password.trim())) {
      this.error.textContent =
        "Password should contain letters A-Z, a-z, number and should be longer than 8 characters";
      this.submit.setAttribute("disabled", true);
      return;
    }

    this.submit.removeAttribute("disabled");
  }

  onClick() {
    const link = document.querySelector("#redirect");

    if (link) {
      link.addEventListener("click", this.onRedirect.bind(this));
    }
    if (this.submit) {
      this.submit.addEventListener("click", this.onSubmit.bind(this));
    }
  }

  onRedirect(e) {
    e.preventDefault();
    this.events.emit(PAGE.SIGNIN);
  }

  onSubmit(e) {
    e.preventDefault();

    this.events.emit(AUTH.SIGNUP, this.data);
  }

  onError(error) {
    this.error.textContent = `${error.message}`;
  }
}
