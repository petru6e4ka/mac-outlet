import { Products } from "./modules/products.js";
import { Filters } from "./modules/filters.js";
import { Controls } from "./modules/controls.js";
import { Modal } from "./modules/Modal.js";
import { Cart } from "./modules/Cart.js";
import { productInfo } from "./htmlTemplates/productInfo.js";
import { PRODUCT, FILTERS } from "./helpers/eventNames.js";
import { filtering } from "./data/storage.js";
import service from "./db.js";

class App {
  constructor() {
    service.getProducts(this.initialize.bind(this));
  }

  async initialize(products) {
    this.filtering = filtering.get();
    this.cart = new Cart();
    this.products = new Products(products, this.filtering);
    this.filters = new Filters(products, this.filtering);
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

new App();
