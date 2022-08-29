import { controls } from "../htmlTemplates/controls.js";
import EventEmitter from "../helpers/EventEmitter.js";

export class Controls {
  constructor() {
    console.log("controls");
    this.parent = document.querySelector("#controls");
    this.events = new EventEmitter();
    this.clearControls(this.parent);
    this.renderControls(this.parent);
    this.filterBtnClick();
  }

  clearControls(parent) {
    if (parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  }

  renderControls(parent) {
    return (parent.innerHTML = controls());
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
