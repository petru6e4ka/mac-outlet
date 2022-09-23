import { modalTemplate } from "../templates/modal.js";
import EventEmitter from "../events/EventEmitter.js";
import { TASK } from "../constants/constants.js";

class Modal {
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

  openModal(...args) {
    const [child, onChange, onSave, onClose, data, event] = args;
    const content = child(data, event);
    const portal = document.querySelector("#portal");
    const modal = document.querySelector("#portal-content");

    this.data = data;
    this.closer = onClose;
    modal.innerHTML = content;
    this.events.emit(TASK.OPEN, { data, event });

    onChange();
    onSave();

    portal.classList.remove("hidden");
  }

  onClose() {
    this.closer();

    const modal = document.querySelector("#portal-content");

    this.parent.classList.add("hidden");
    this.clearModal(modal);
    this.events.emit(TASK.CANCEL, this.data);
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
