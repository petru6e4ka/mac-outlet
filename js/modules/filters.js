import { filtersForm } from "../htmlTemplates/filters.js";
import EventEmitter from "../helpers/EventEmitter.js";
import { FILTERS } from "../helpers/eventNames.js";
import { filterConfig } from "../helpers/configs.js";

export class Filters {
  constructor(list) {
    this.filters = filterConfig;
    this.customFilters = {};
    this.parent = document.querySelector("#list");
    this.block = document.forms.filters;
    this.events = new EventEmitter();
    this.fillFilters(list, this.filters);
    this.renderFilters(this.filters);
    this.setOnChange();
  }

  fillFilters(list, filters) {
    list.forEach((elem) => {
      const { color, os, storage, price } = elem;

      if (color) {
        color.forEach((elem) => {
          if (!(elem in filters.color)) {
            filters.color[elem] = true;
          }
        });
      }

      if (!filters.price.min) {
        filters.price.min = price;
      }

      if (filters.price.min > price) {
        filters.price.min = price;
        this.min = price;
      }

      if (!filters.price.max) {
        filters.price.max = price;
      }

      if (filters.price.max < price) {
        filters.price.max = price;
        this.max = price;
      }

      if (os && !(os in filters.os)) {
        filters.os[os] = true;
      }

      if (storage && !(storage in filters.memory)) {
        filters.memory[storage] = true;
      }
    });
  }

  renderFilters(filters) {
    return this.parent.insertAdjacentHTML("afterbegin", filtersForm(filters));
  }

  setOnChange() {
    const form = document.forms.filters;

    form.addEventListener("change", (e) => {
      const checked = form.querySelectorAll('input[type="checkbox"]:checked');

      checked.forEach((elem) => {
        if (elem.name === elem.value) {
          this.customFilters[elem.name] = null;
        }

        if (elem.name !== elem.value && !this.customFilters[elem.name]) {
          this.customFilters[elem.name] = {};
        }

        if (elem.name !== elem.value && this.customFilters[elem.name]) {
          this.customFilters[elem.name][elem.value] = true;
        }
      });

      const minInput = form.querySelector('[name="min"]');
      const maxInput = form.querySelector('[name="max"]');
      const minValue = Number(minInput.value);
      const maxValue = Number(maxInput.value);

      if (minValue < this.min || minValue > this.max) {
        minInput.value = this.min;
      }

      if (maxValue > this.max || maxValue < this.min) {
        maxInput.value = this.max;
      }

      const price = {
        min: minInput.value,
        max: maxInput.value,
      };

      this.events.emit(FILTERS.APPLY, { ...this.customFilters, price });
    });

    form.addEventListener("reset", () => {
      this.customFilters = {};
      this.events.emit(FILTERS.RESET);
    });
  }

  openFilter() {
    const filter = document.forms.filters;
    filter.classList.remove("inactive");
  }

  closeFilter() {
    const filter = document.forms.filters;
    filter.classList.add("inactive");
  }
}
