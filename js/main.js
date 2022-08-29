import { items } from "./data/items.js";
import { Products } from "./modules/Products.js";
import { Filters } from "./modules/Filters.js";
import { Controls } from "./modules/Controls.js";
import { Modal } from "./modules/Modal.js";
import { productInfo } from "./htmlTemplates/productInfo.js";

class App {
  constructor(data) {
    this.products = new Products(data);
    this.filters = new Filters(data);
    this.controls = new Controls();
    this.modal = new Modal();

    this.controls.events.subscribe(
      "closeFilter",
      this.filters.closeFilter.bind(this)
    );
    this.controls.events.subscribe(
      "openFilter",
      this.filters.openFilter.bind(this)
    );

    this.products.events.subscribe(
      "openProductInfo",
      this.modal.openModal.bind(this, productInfo)
    );
  }
}

new App(items);
