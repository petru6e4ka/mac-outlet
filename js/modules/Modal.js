import { modalTemplate } from "../htmlTemplates/modal.js";

export class Modal {
  constructor() {
    this.parent = document.querySelector("#portal");
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
    const content = elem(data);
    const portal = document.querySelector("#portal");
    const modal = document.querySelector("#portal-content");

    modal.innerHTML = content;
    portal.classList.remove("hidden");
  }
}
