import { qtyFormater } from "../helpers/utils.js";

export const productInfo = (elem) => {
  const { imgUrl, color, os, chip, size, name, orderInfo, price, id } = elem;

  const addBtn = orderInfo.inStock
    ? `<button class="button" name="add" data-add-btn="${id}">Add to cart</button>`
    : `<button class="button" name="add" data-add-btn="${id}" disabled>Add to cart</button>`;

  return `
<section class="product__modal">
  <div class="product__image">
    <img src="./img/${imgUrl}" alt="${name}" />
  </div>
  <div class="product__info">
    <h2>${name}</h2>
    <div class="product__reviews">
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
    </div>
    <div class="product__text">
      <p>
        Color: 
        <span class="black">${color.join(", ")}</span>
      </p>
      <p>
        Operating system: 
        <span class="black">${os}</span>
      </p>
      <p>
        Chip: 
        <span class="black">${chip.name}, ${chip.cores}</span>
      </p>
      <p>
        Height: 
        <span class="black">${size.height} cm</span>
      </p>
      <p>
        Width: 
        <span class="black">${size.width} cm</span>
      </p>
      <p>
        Depth: 
        <span class="black">${size.depth} cm</span>
      </p>
      <p>
        Weight: 
        <span class="black">${size.weight} g</span>
      </p>
    </div>
  </div>
  <div class="product__actions">
    <div class="product__price">$ ${price}</div>
    <p>Stock: <span class="bold">${orderInfo.inStock}</span> pcs.</p>
    ${addBtn}
  </div>
</section>`;
};
