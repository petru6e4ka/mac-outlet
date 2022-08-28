import { items } from "./items.js";
import { Products } from "./products.js";

class App {
  constructor(data) {
    this.products = new Products(data);
  }
}

new App(items);
