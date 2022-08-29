import { items } from "./data/items.js";
import { Products } from "./modules/products.js";
import { Filters } from "./modules/filters.js";
import { Controls } from "./modules/controls.js";

class App {
  constructor(data) {
    this.products = new Products(data);
    this.filters = new Filters(data);
    this.controls = new Controls();

    this.controls.events.subscribe(
      "closeFilter",
      this.filters.closeFilter.bind(this)
    );
    this.controls.events.subscribe(
      "openFilter",
      this.filters.openFilter.bind(this)
    );
  }
}

new App(items);
