import { Products } from "../../modules/products/Products.js";
import { Filters } from "../../modules/filters/Filters.js";
import { Controls } from "../../modules/controls/Controls.js";
import { Modal } from "../../modules/modal/Modal.js";
import { Cart } from "../../modules/cart/Cart.js";
import { productInfo } from "../../modules/modal/ProductInfo/template.js";
import { PRODUCT, FILTERS } from "../../modules/events/eventNames.js";
import { filtering } from "../../repository/storage.js";
import repository from "../../repository/products.js";
import View from "./view.js";
import template from "./template.js";

class HomeController {
  constructor() {
    repository.products.getProducts(this.initialize.bind(this));
  }

  async initialize(products) {
    this.view = new View(template);
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
    this.controls.events.subscribe(
      FILTERS.SEARCH,
      this.products.applySearch.bind(this.products)
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

export default HomeController;
