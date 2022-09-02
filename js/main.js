import { items } from "./data/items.js";
import { Products } from "./modules/products.js";
import { Filters } from "./modules/filters.js";
import { Controls } from "./modules/controls.js";
import { Modal } from "./modules/Modal.js";
import { Cart } from "./modules/Cart.js";
import { productInfo } from "./htmlTemplates/productInfo.js";
import { PRODUCT, FILTERS } from "./helpers/eventNames.js";
import { filtering } from "./data/storage.js";

class App {
  constructor(data) {
    this.filtering = filtering.get();
    this.cart = new Cart();
    this.products = new Products(data, this.filtering);
    this.filters = new Filters(data, this.filtering);
    this.controls = new Controls();
    this.modal = new Modal();

    this.controls.events.subscribe(
      FILTERS.CLOSE,
      this.filters.closeFilter.bind(this.filters)
    );
    this.controls.events.subscribe(
      FILTERS.OPEN,
      this.filters.openFilter.bind(this.filters)
    );

    this.products.events.subscribe(
      PRODUCT.OPEN_INFO,
      this.modal.openModal.bind(this.modal, productInfo)
    );

    this.filters.events.subscribe(
      FILTERS.APPLY,
      this.products.applyFilter.bind(this.products)
    );
    this.filters.events.subscribe(
      FILTERS.RESET,
      this.products.showAll.bind(this.products)
    );

    this.products.events.subscribe(
      PRODUCT.ADD_TO_CART,
      this.cart.addItem.bind(this.cart)
    );
    this.modal.events.subscribe(
      PRODUCT.ADD_TO_CART,
      this.cart.addItem.bind(this.cart)
    );
  }
}

new App(items);
