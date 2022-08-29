import { productCard } from "../htmlTemplates/product.js";
import EventEmitter from "../helpers/EventEmitter.js";

export class Products {
  constructor(list) {
    this.products = list;
    this.filtered = list.slice(0);
    this.parent = document.querySelector("#products");
    this.events = new EventEmitter();
    this.clearProducts(this.parent);
    this.renderProducts(this.filtered);
    this.productClick();
  }

  renderProducts(products) {
    if (!products) return;

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

  productClick() {
    this.parent
      .querySelectorAll("a")
      .forEach((elem) =>
        elem.addEventListener("click", this.productInfoCall.bind(this))
      );
  }

  productInfoCall(e) {
    e.preventDefault();

    const product = this.products.find(
      (elem) => elem.id === Number(e.currentTarget.dataset.productLink)
    );

    this.events.emit("openProductInfo", product);
  }

  applyFilter(filters) {
    const {
      color: filterColor,
      memory,
      os: filterOs,
      display: filterDisplay,
    } = filters;

    this.filtered = this.products.slice(0);

    if (filterColor) {
      this.filterByColor(filterColor);
    }

    if (filterOs) {
      this.filterByOs(filterOs);
    }

    if (memory) {
      this.filterByMemory(memory);
    }

    if (filterDisplay) {
      this.filterByDisplay(filterDisplay);
    }

    this.clearProducts(this.parent);
    this.renderProducts(this.filtered);
    this.productClick();
  }

  filterByColor(filterColor) {
    this.filtered = this.filtered.filter((elem) =>
      elem.color.some((colors) => colors in filterColor)
    );
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
        (filter) => filter.min <= elem.display && filter.max >= elem.display
      )
    );
  }

  showAll() {
    this.filtered = this.products.slice(0);
    this.clearProducts(this.parent);
    this.renderProducts(this.filtered);
    this.productClick();
  }
}
