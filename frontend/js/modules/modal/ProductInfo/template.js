import { randomNumber } from "../../../helpers/utils.js";

export const productInfo = (elem) => {
  const {
    imgUrl,
    color_0,
    color_1,
    color_2,
    color_3,
    color_4,
    color_5,
    os,
    chip_name,
    size_depth,
    size_height,
    size_weight,
    size_width,
    name,
    orderInfo_inStock,
    orderInfo_reviews,
    price,
    _id: id,
  } = elem;
  const color = [color_0, color_1, color_2, color_3, color_4, color_5].filter(
    (elem) => !!elem.trim()
  );

  const inStock = Number(orderInfo_inStock);
  const inReview = Number(orderInfo_reviews);

  const addBtn = inStock
    ? `<button class="button" name="add" data-add-btn="${id}">Add to cart</button>`
    : `<button class="button" name="add" data-add-btn="${id}" disabled>Add to cart</button>`;

  const colorBlock = color.length
    ? `<p>
      Color: 
      <span class="black">${color.join(", ")}</span>
    </p>`
    : "";

  const osBlock = os
    ? `<p>
      Operating system: 
      <span class="black">${os}</span>
    </p>`
    : "";

  const chipBlock = chip_name
    ? `<p>
      Chip: 
      <span class="black">${chip_name}</span>
    </p>`
    : "";

  const sizeBlock =
    size_depth && size_height && size_weight && size_width
      ? `<p>
      Height: 
      <span class="black">${size_height} cm</span>
    </p>
    <p>
      Width: 
      <span class="black">${size_width} cm</span>
    </p>
    <p>
      Depth: 
      <span class="black">${size_depth} cm</span>
    </p>
    <p>
      Weight: 
      <span class="black">${size_weight} g</span>
    </p>`
      : "";

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
    </div>
    <div class="product__text">
      ${colorBlock}
      ${osBlock}
      ${chipBlock}
      ${sizeBlock}
    </div>
  </div>
  <div class="product__actions">
    <div class="product__price">$ ${price}</div>
    <p>Stock: <span class="bold">${inStock}</span> pcs.</p>
    ${addBtn}
  </div>
</section>`;
};
