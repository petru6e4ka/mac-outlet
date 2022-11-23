import { controls } from "./template.js";
import EventEmitter from "../events/EventEmitter.js";
import { FILTERS } from "../events/eventNames.js";

export class Controls {
  constructor() {
    this.parent = document.querySelector("#controls");
    this.events = new EventEmitter();
    this.renderControls();
    this.onFilterClick();
    this.onChange();
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

  onChange() {
    const search = document.querySelector("#search");

    if (search) {
      search.addEventListener("change", this.onSearch.bind(this));
    }
  }

  onSearch(e) {
    this.events.emit(FILTERS.SEARCH, { term: e.target.value });
  }
}
