import { modalTemplate } from "../templates/modal.js";

class Modal {
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

  openModal(...args) {
    const [child, data, onChange, onSave, onClose, event] = args;
    const content = child(data, event);
    const portal = document.querySelector("#portal");
    const modal = document.querySelector("#portal-content");

    this.closer = onClose;
    modal.innerHTML = content;

    onChange();
    onSave();

    portal.classList.remove("hidden");
  }

  onClose() {
    this.closer();
    const modal = document.querySelector("#portal-content");
    this.parent.classList.add("hidden");
    this.clearModal(modal);
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
}

export default Modal;
