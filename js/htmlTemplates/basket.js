const empty = () => {
  return `
  <p class="basket-modal__empty">Your cart is empty</p>
  `;
};

const basketItem = (item) => {
  const { name, price, imgUrl, quantity, id, orderInfo_inStock } = item;
  const inStock = Number(orderInfo_inStock);

  return `
  <li class="basket-modal__item">
    <div class="basket-modal__image">
      <img src="./img/${imgUrl}" alt="${name}" />
    </div>
    <div class="basket-modal__info">
      <h3>${name}</h3>
      <div class="chip">
        <span class="chip__text">${price} $</span>
      </div>
    </div>
    <div class="basket-modal__actions">
      <button class="square square--arrow" ${
        quantity === 1 ? "disabled" : ""
      } name="reduce" value="${id}" data-item-reduce="${id}">&#60;</button>
      <span data-item-quantity="${id}">${quantity}</span>
      <button class="square square--arrow" ${
        quantity === 4 || quantity >= inStock ? "disabled" : ""
      } name="increase" value="${id}" data-item-increase="${id}">&#62;</button>
      <button class="square square--cross" name="delete" value="${id}">X</button>
    </div>
  </li>
  `;
};

export const basket = (items, total) => {
  const { price, quantity } = total;
  const isEmpty = !items.length;

  const itemsBlock = `
  <ul class="basket-modal__list">
    ${items.map((item) => basketItem(item))}
  </ul>
  <div class="basket-modal__summary">
    <p>Total amount: <span class="black bold" data-total="quantity"> ${quantity} ptc.</span></p>
    <p>Total price: <span class="black bold" data-total="price"> ${price}$</span></p>
  </div>
  `;

  const btn = isEmpty
    ? `<button class="button" name="add" data-btn="buy" disabled>Buy</button>`
    : `<button class="button" name="add" data-btn="buy">Buy</button>`;

  return `
  <div class="basket-modal">
    <section class="basket-modal__content">
      <header class="basket-modal__header">
        <h2>Shopping Cart</h2>
        ${isEmpty ? "" : "<p>Checkout is almost done!</p>"}
      </header>
      <div class="basket-modal__main">
        ${isEmpty ? empty() : itemsBlock}
        <div class="basket-modal__action">
          ${btn}
        </div>
      </div>
    </section>
  </div>
  `;
};

export const badge = (qty) => {
  if (qty) {
    return `
    <div class="badge" id="basket-badge">
      <span class="badge__content">${qty}</span>
    </div>`;
  }

  return "";
};

export const basketIcon = (items) => `
  <button class="icon-button">
    <span class="icon-button__content">
      <span class="icon-button__icon"></span>
      ${badge(items)}
    </span>
  </button>
  <div id="basket-portal">
  </div>
`;
