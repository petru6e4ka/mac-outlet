import { productCard } from "../htmlTemplates/product.js";

export class Products {
  constructor(list) {
    this.products = list;
    this.parent = document.querySelector("#products");
    this.renderProducts(this.products);
  }

  renderProducts(products) {
    const html = products.map((product) => productCard(product)).join("");
    return (this.parent.innerHTML = html);
  }
}
