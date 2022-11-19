import { filtersForm } from "../htmlTemplates/filters.js";
import EventEmitter from "../helpers/EventEmitter.js";
import { FILTERS } from "../helpers/eventNames.js";
import { filterConfig } from "../helpers/configs.js";

export class Filters {
  constructor(list, filtering) {
    this.filters = filterConfig;
    this.customFilters = filtering || {};
    this.parent = document.querySelector("#list");
    this.block = document.forms.filters;
    this.events = new EventEmitter();
    this.fillFilters(list, this.filters);
    this.renderFilters(this.filters, this.customFilters);
    this.setOnChange();
  }

  fillFilters(list, filters) {
    list.forEach((elem) => {
      const {
        color_0,
        color_1,
        color_2,
        color_3,
        color_4,
        color_5,
        os,
        storage,
        price,
      } = elem;
      const _price = Number(price);
      const color = [
        color_0,
        color_1,
        color_2,
        color_3,
        color_4,
        color_5,
      ].filter((elem) => !!elem.trim());

      if (color) {
        color.forEach((elem) => {
          if (!(elem in filters.color)) {
            filters.color[elem] = true;
          }
        });
      }

      if (!filters.price.min) {
        filters.price.min = _price;
      }

      if (filters.price.min > _price) {
        filters.price.min = _price;
        this.min = _price;
      }

      if (!filters.price.max) {
        filters.price.max = _price;
      }

      if (filters.price.max < _price) {
        filters.price.max = _price;
        this.max = _price;
      }

      if (os && !(os in filters.os)) {
        filters.os[os] = true;
      }

      if (storage && !(storage in filters.memory)) {
        filters.memory[storage] = true;
      }
    });
  }

  renderFilters(filters, customFilters) {
    return this.parent.insertAdjacentHTML(
      "afterbegin",
      filtersForm(filters, customFilters)
    );
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

      this.customFilters.price = {
        min: minInput.value,
        max: maxInput.value,
      };

      this.customFilter = Object.keys(this.customFilters)
        .filter((key) => this.customFilters[key] !== null)
        .reduce((obj, key) => ({ ...obj, [key]: this.customFilters[key] }), {});

      this.events.emit(FILTERS.APPLY, this.customFilter);
    });

    form.addEventListener("reset", () => {
      this.customFilters = {};
      this.parent
        .querySelectorAll("input[type='checkbox']:checked")
        .forEach((checkbox) => {
          if (checkbox.name !== checkbox.value)
            checkbox.removeAttribute("checked");
        });
      this.parent
        .querySelector("#price-min")
        .setAttribute("value", this.filters.price.min);
      this.parent
        .querySelector("#price-max")
        .setAttribute("value", this.filters.price.max);
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
