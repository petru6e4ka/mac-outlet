import { modalTemplate } from "./template.js";
import EventEmitter from "../events/EventEmitter.js";
import { PRODUCT } from "../events/eventNames.js";

export class Modal {
  constructor() {
    this.parent = document.querySelector("#portal");
    this.events = new EventEmitter();

    this.renderModal();
    this.onOverlayClick();
    this.onModalContentClick();
  }

  renderModal() {
    return (this.parent.innerHTML = modalTemplate());
  }

  clearModal(parent) {
    if (parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  }

  onOverlayClick() {
    const overlay = document.querySelector("#modal_overlay");

    overlay.addEventListener("click", this.onClose.bind(this));
  }

  onModalContentClick() {
    const modal = document.querySelector("#portal-content");

    modal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  onClose() {
    const modal = document.querySelector("#portal-content");

    this.parent.classList.add("hidden");
    this.clearModal(modal);
  }

  openModal(elem, data) {
    this.product = data;
    const content = elem(data);
    const portal = document.querySelector("#portal");
    const modal = document.querySelector("#portal-content");

    modal.innerHTML = content;
    this.onBuy();
    portal.classList.remove("hidden");
  }

  onBuy() {
    this.parent
      .querySelector('button[name="add"]')
      .addEventListener("click", this.addToCartCall.bind(this));
  }

  addToCartCall() {
    this.events.emit(PRODUCT.ADD_TO_CART, this.product);
  }
}
