import { productCard } from "../htmlTemplates/product.js";
import EventEmitter from "../helpers/EventEmitter.js";

export class Products {
  constructor(list) {
    this.products = list;
    this.parent = document.querySelector("#products");
    this.events = new EventEmitter();
    this.renderProducts(this.products);
    this.productClick();
  }

  renderProducts(products) {
    const html = products.map((product) => productCard(product)).join("");
    return (this.parent.innerHTML = html);
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
}
