import { qtyFormater } from "./utils.js";

const productCard = (card) => {
  const { name, imgUrl, id, price, orderInfo } = card;

  const reviews = orderInfo.inStock
    ? `<span class="icon icon--positive"></span>
      <span class="bold">${orderInfo.inStock}</span>
      left in stock`
    : `<span class="icon icon--negative"></span>
      <span class="bold">0</span>
      left in stock`;

  const addBtn = orderInfo.inStock
    ? `<button class="button" name="add" value="${JSON.stringify(
        card
      )}" id="product-add-btn-${id}">Add to cart</button>`
    : `<button class="button" name="add" value="${JSON.stringify(
        card
      )}" id="product-add-btn-${id}" disabled>Add to cart</button>`;

  return `
  <article class="product-card product-card__block" id="product-${id}">
    <div class="product-card__content">
      <a href="#" class="product-card__link" id="product-link-${id}">
        <div class="product-card__image">
          <img src="./img/${imgUrl}" alt="${name}" />
        </div>
        <div class="product-card__text">
          <h2>${name}</h2>
          <p>
            ${reviews}
          </p>
          <p>
            Price:
            <span class="bold">${price}</span>
            $
          </p>
        </div>
      </a>
      <div class="product-card__action">
        ${addBtn}
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__reviews">
        <span class="icon icon--full-heart"></span>
        <p>
          <span class="product-card__footer-line">
            <span class="bold">${orderInfo.reviews}%</span>
            Positive reviews
          </span>
          <span class="product-card__footer-line">Above avarage</span>
        </p>
      </div>
      <div class="product-card__orders">
        <span class="bold product-card__footer-line">${qtyFormater(
          price * 4
        )}</span>
        <span class="product-card__footer-line">orders</span>
      </div>
      <label class="product-card__like" for="product-like-${id}">
        <input
          type="checkbox"
          name="like"
          id="product-like-${id}"
          class="product-card__like-checkbox"
        />
        <span class="icon icon--empty-heart"></span>
      </label>
    </div>
  </article>
`;
};

export class Products {
  constructor(list) {
    this.products = list;
    this.parent = document.querySelector("#products");
    this.clearProducts(this.parent);
    this.renderProducts(this.products);
  }

  clearProducts(parent) {
    if (parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  }

  renderProducts(products) {
    const html = products.map((product) => productCard(product)).join("");
    return (this.parent.innerHTML = html);
  }
}
