import { randomNumber } from "../helpers/utils.js";

export const productCard = (card) => {
  const { name, imgUrl, id, price, orderInfo_inStock, orderInfo_reviews } =
    card;
  const inStock = Number(orderInfo_inStock);
  const inReview = Number(orderInfo_reviews);

  const reviews = inStock
    ? `<span class="icon icon--positive"></span>
      <span class="bold">${inStock}</span>
      left in stock`
    : `<span class="icon icon--negative"></span>
      <span class="bold">0</span>
      left in stock`;

  const addBtn = inStock
    ? `<button class="button" name="add" data-add-btn="${id}">Add to cart</button>`
    : `<button class="button" name="add" data-add-btn="${id}" disabled>Add to cart</button>`;

  return `
  <article class="product-card product-card__block">
    <div class="product-card__content">
      <a href="#" class="product-card__link" data-product-link="${id}">
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
            <span class="bold">${inReview}%</span>
            Positive reviews
          </span>
          <span class="product-card__footer-line">Above avarage</span>
        </p>
      </div>
      <div class="product-card__orders">
        <span class="bold product-card__footer-line">${randomNumber()}</span>
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
