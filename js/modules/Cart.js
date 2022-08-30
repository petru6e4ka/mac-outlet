import { basketIcon, basket } from "../htmlTemplates/basket.js";

export class Cart {
  constructor() {
    this.min = 1;
    this.max = 4;
    this.total = {
      price: 0,
      quantity: 0,
    };
    this.isOpened = false;
    this.parent = document.querySelector("#basket");
    this.items = [];
    this.renderCart();
    this.onClick();
    this.onExternalClick();
  }

  renderCart() {
    return (this.parent.innerHTML = basketIcon(this.total.quantity));
  }

  onClick() {
    this.parent.addEventListener("click", this.toggleCartModal.bind(this));
    this.onModalClick();
  }

  onExternalClick() {
    document.body.addEventListener("click", this.closeCart.bind(this));
  }

  closeCart(e) {
    if (!e.target.closest("#basket")) {
      this.isOpened = false;
      this.clearCart(this.parent.querySelector("#basket-portal"));
    }
  }

  toggleCartModal() {
    const block = this.parent.querySelector("#basket-portal");

    this.isOpened = !this.isOpened;

    if (this.isOpened) {
      block.innerHTML = basket(this.items, this.total);
      this.addButtonsListeners();
    }

    if (!this.isOpened) {
      this.clearCart(block);
    }
  }

  addButtonsListeners() {
    this.onProductControlsClick(
      "button[name='increase']",
      this.onProductQuantityChange.bind(this, true)
    );
    this.onProductControlsClick(
      "button[name='reduce']",
      this.onProductQuantityChange.bind(this, false)
    );
    this.onProductControlsClick(
      "button[name='delete']",
      this.onDelete.bind(this)
    );
  }

  onProductQuantityChange(isIncrease, e) {
    this.badge = this.parent.querySelector("#basket-badge");
    this.elementQtyBlock = this.parent.querySelector(
      `[data-item-quantity="${e.target.value}"]`
    );
    this.totalPriceBlock = this.parent.querySelector('[data-total="price"]');
    this.totalQtyBlock = this.parent.querySelector('[data-total="quantity"]');
    this.increaseBtn = this.parent.querySelector(
      `[data-item-increase="${e.target.value}"]`
    );
    this.reduceBtn = this.parent.querySelector(
      `[data-item-reduce="${e.target.value}"]`
    );
    this.item = this.items.find((elem) => elem.id === Number(e.target.value));

    if (isIncrease) this.onIncrease();
    if (!isIncrease) this.onReduce();
  }

  onProductControlsClick(selector, cb) {
    this.parent
      .querySelectorAll(selector)
      .forEach((elem) => elem.addEventListener("click", cb));
  }

  clearCart(parent) {
    if (parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  }

  addItem(item) {
    const product = this.items.find((elem) => elem.id === item.id);
    const isInCart = !!product;

    if (!isInCart) {
      this.items.push({ ...item, quantity: 1 });
    }

    if (isInCart && product.quantity < this.max) {
      product.quantity += 1;
    }

    this.countTotal();
    this.clearCart(this.parent);
    this.renderCart();
    this.isOpened = false;
    this.onModalClick();
  }

  countTotal() {
    this.total = this.items.reduce(
      (prev, next) => ({
        price: prev.price + next.price * next.quantity,
        quantity: prev.quantity + next.quantity,
      }),
      { price: 0, quantity: 0 }
    );
  }

  onModalClick() {
    this.parent
      .querySelector("#basket-portal")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });
  }

  onIncrease() {
    if (this.item.quantity < this.max) {
      this.item.quantity += 1;
      this.countTotal();

      this.badge.lastElementChild.textContent = this.total.quantity;
      this.elementQtyBlock.textContent = this.item.quantity;
      this.totalPriceBlock.textContent = `$${this.total.price}`;
      this.totalQtyBlock.textContent = `${this.total.quantity} ptc.`;
    }

    if (this.item.quantity > this.min) {
      this.reduceBtn.disabled = false;
    }

    if (this.item.quantity >= this.max) {
      this.increaseBtn.disabled = true;
    }
  }

  onReduce() {
    if (this.item.quantity > this.min) {
      this.item.quantity -= 1;
      this.countTotal();

      this.badge.lastElementChild.textContent = this.total.quantity;
      this.elementQtyBlock.textContent = this.item.quantity;
      this.totalPriceBlock.textContent = `$${this.total.price}`;
      this.totalQtyBlock.textContent = `${this.total.quantity} ptc.`;
    }

    if (this.item.quantity <= this.min) {
      this.reduceBtn.disabled = true;
    }

    if (this.item.quantity < this.max) {
      this.increaseBtn.disabled = false;
    }
  }

  onDelete(e) {
    const block = this.parent.querySelector("#basket-portal");
    const badge = this.parent.querySelector("#basket-badge");

    this.items = this.items.filter(
      (elem) => elem.id !== Number(e.target.value)
    );

    this.countTotal();
    block.innerHTML = basket(this.items, this.total);
    this.addButtonsListeners();

    if (!this.total.quantity && badge) {
      badge.remove();
    }

    if (this.total.quantity && badge) {
      badge.lastElementChild.textContent = this.total.quantity;
    }
  }
}
