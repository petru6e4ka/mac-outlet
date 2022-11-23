import { productCard } from "./template.js";
import EventEmitter from "../events/EventEmitter.js";
import { PRODUCT } from "../events/eventNames.js";
import { filtering } from "../../repository/storage.js";

export class Products {
  constructor(list, filtering) {
    this.products = list.slice(0);
    this.parent = document.querySelector("#products");
    this.events = new EventEmitter();
    this.clearProducts(this.parent);
    this.renderProducts(this.products, filtering);
    this.onClick();
    this.onBuy();
  }

  renderProducts(products, filtering) {
    if (!products) return;
    if (filtering) {
      this.applyFilter(filtering);
      return;
    }

    const html = products.map((product) => productCard(product)).join("");
    return (this.parent.innerHTML = html);
  }

  clearProducts(parent) {
    if (parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  }

  onClick() {
    this.parent
      .querySelectorAll("a")
      .forEach((elem) =>
        elem.addEventListener("click", this.productInfoCall.bind(this))
      );
  }

  productInfoCall(e) {
    e.preventDefault();

    const product = this.products.find(
      (elem) => elem._id === e.currentTarget.dataset.productLink
    );

    this.events.emit(PRODUCT.OPEN_INFO, product);
  }

  onBuy() {
    this.parent
      .querySelectorAll('button[name="add"]')
      .forEach((elem) =>
        elem.addEventListener("click", this.addToCartCall.bind(this))
      );
  }

  addToCartCall(e) {
    const product = this.products.find(
      (elem) => elem._id === e.currentTarget.dataset.addBtn
    );

    this.events.emit(PRODUCT.ADD_TO_CART, product);
  }

  applyFilter(filters) {
    if (JSON.stringify(filters) === JSON.stringify(this.filters)) return;

    filtering.set(filters);
    this.filters = { ...filters };

    const {
      color: filterColor,
      memory,
      os: filterOs,
      display: filterDisplay,
      price: filterPrice,
    } = filters;

    this.filtered = this.products.slice(0);

    if (filterColor) this.filterByColor(filterColor);
    if (filterOs) this.filterByOs(filterOs);
    if (memory) this.filterByMemory(memory);
    if (filterDisplay) this.filterByDisplay(filterDisplay);
    if (filterPrice) this.filterByPrice(filterPrice);

    this.clearProducts(this.parent);
    this.renderProducts(this.filtered);
    this.onClick();
    this.onBuy();
  }

  filterByColor(filterColor) {
    this.filtered = this.filtered.filter((elem) => {
      const { color_0, color_1, color_2, color_3, color_4, color_5 } = elem;
      const color = [
        color_0,
        color_1,
        color_2,
        color_3,
        color_4,
        color_5,
      ].filter((elem) => !!elem.trim());
      return color.some((colors) => colors in filterColor);
    });
  }

  filterByOs(filterOs) {
    this.filtered = this.filtered.filter((elem) => elem.os in filterOs);
  }

  filterByMemory(memory) {
    this.filtered = this.filtered.filter((elem) => elem.storage in memory);
  }

  filterByDisplay(filterDisplay) {
    const filters = Object.keys(filterDisplay).map((elem) => {
      const filterArr = elem.split("-");
      return {
        min: Number(filterArr[0]),
        max: filterArr[1] ? Number(filterArr[1]) : Infinity,
      };
    });

    this.filtered = this.filtered.filter((elem) =>
      filters.some(
        (filter) =>
          filter.min <= Number(elem.display) &&
          filter.max >= Number(elem.display)
      )
    );
  }

  filterByPrice(filterPrice) {
    this.filtered = this.filtered.filter(
      (elem) =>
        Number(elem.price) >= filterPrice.min &&
        Number(elem.price) <= filterPrice.max
    );
  }

  showAll() {
    this.filtered = this.products.slice(0);
    this.filters = null;
    filtering.remove();
    this.clearProducts(this.parent);
    this.renderProducts(this.filtered);
    this.onClick();
    this.onBuy();
  }
}
