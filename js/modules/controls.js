import { controls } from "../htmlTemplates/controls.js";
import EventEmitter from "../helpers/EventEmitter.js";
import { FILTERS } from "../helpers/eventNames.js";

export class Controls {
  constructor() {
    this.parent = document.querySelector("#controls");
    this.events = new EventEmitter();
    this.renderControls();
    this.onFilterClick();
  }

  renderControls() {
    return (this.parent.innerHTML = controls());
  }

  onFilterClick() {
    const filterBtn = document.querySelector("#filter");

    filterBtn.addEventListener("click", this.filterCall.bind(this));
  }

  filterCall() {
    const filterBtn = document.querySelector("#filter");
    const isActive = filterBtn.classList.contains("active");

    if (isActive) {
      filterBtn.classList.remove("active");
      this.events.emit(FILTERS.CLOSE);

      return;
    }

    filterBtn.classList.add("active");
    this.events.emit(FILTERS.OPEN);
  }
}
