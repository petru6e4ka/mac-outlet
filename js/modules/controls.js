import { controls } from "../htmlTemplates/controls.js";
import EventEmitter from "../helpers/EventEmitter.js";

export class Controls {
  constructor() {
    this.parent = document.querySelector("#controls");
    this.events = new EventEmitter();
    this.clearControls(this.parent);
    this.renderControls();
    this.filterBtnClick();
  }

  clearControls(parent) {
    if (parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  }

  renderControls() {
    return (this.parent.innerHTML = controls());
  }

  filterBtnClick() {
    const filterBtn = document.querySelector("#filter");

    filterBtn.addEventListener("click", this.filterCall.bind(this));
  }

  filterCall() {
    const filterBtn = document.querySelector("#filter");
    const isActive = filterBtn.classList.contains("active");

    if (isActive) {
      filterBtn.classList.remove("active");
      this.events.emit("closeFilter");

      return;
    }

    filterBtn.classList.add("active");
    this.events.emit("openFilter");
  }
}
