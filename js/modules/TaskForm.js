import { timeConverter } from "../utils/time.js";

export class TaskForm {
  constructor() {
    this.start = "";
    this.end = "";
    this.title = "";
    this.color = "";

    this.stateSetter = this.setState.bind(this);
    this.submitSetter = this.submitHandler.bind(this);
  }

  setState(evt) {
    this[evt.target.name] = evt.target.value;
    console.log(evt.target.name, evt.target.value);

    if (this.validityCheck()) return;
    // TODO: event for rerender day
  }

  onChange() {
    this.titleElem = document.querySelector("#title");
    this.startElem = document.querySelector("#start");
    this.endElem = document.querySelector("#end");
    this.colorElem = document.querySelector("#color");

    if (this.titleElem && this.startElem && this.endElem && this.colorElem) {
      this.titleElem.addEventListener("change", this.stateSetter);
      this.startElem.addEventListener("change", this.stateSetter);
      this.endElem.addEventListener("change", this.stateSetter);
      this.colorElem.addEventListener("change", this.stateSetter);

      this.start = this.startElem.getAttribute("value");
      this.end = this.endElem.getAttribute("value");
      this.title = this.titleElem.getAttribute("value");
      this.color = this.colorElem.getAttribute("value");
    }

    this.onAction();
  }

  validityCheck() {
    if (!this.title.trim()) {
      //console.log("empty title");
      return;
    }

    if (!this.color) {
      //console.log("empty color");
      return;
    }

    if (!this.start) {
      //console.log("empty start");
      return;
    }

    if (!this.end) {
      //console.log("empty end");
      return;
    }

    const startDate = timeConverter.timeValidation(this.start);
    const endDate = timeConverter.timeValidation(this.end);

    if (
      this.start.length < 4 ||
      this.end.length < 4 ||
      !startDate ||
      !endDate
    ) {
      //console.log("invalid date format");
      return;
    }

    if (Number(startDate) >= Number(endDate)) {
      //console.log("invalid time gap");
      return;
    }

    return true;
  }

  onAction() {
    // this.deleteElem = document.querySelector("#delete");
    this.submitElem = document.querySelector("#submit");
    // if(this.deleteElem && this.updateElem) {
    //   this.deleteElem.addEventListener('click', )
    //   this.updateElem.addEventListener('click', )
    // }
    // if(this.addElem) {
    //   this.addElem.addEventListener('click', )
    // }
  }

  onClose() {
    this.titleElem.removeEventListener("change", this.stateSetter);
    this.startElem.removeEventListener("change", this.stateSetter);
    this.endElem.removeEventListener("change", this.stateSetter);
    this.colorElem.removeEventListener("change", this.stateSetter);
    document.forms.taskForm.removeEventListener("submit", this.submitSetter);

    // if(this.deleteElem && this.updateElem) {
    //   this.deleteElem.removeEventListener('click', )
    //   this.updateElem.removeEventListener('click', )
    // }

    // if(this.addElem) {
    //   this.addElem.removeEventListener('click', )
    // }
  }

  submitHandler(evt) {
    evt.preventDefault();

    if (!evt.target.checkValidity()) return;
    if (!this.validityCheck()) return;

    console.log(this.color, this.start, this.end, this.title);
    console.log("submited");

    // TODO: saving to storage
    // TODO: mutating data
    // TODO: close modal

    evt.target.reset();
  }

  onSubmit() {
    document.forms.taskForm.addEventListener("submit", this.submitSetter);
  }
}

export default TaskForm;
