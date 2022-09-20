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

    // TODO: validity check
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
    }
  }

  onAction() {
    // this.deleteElem = document.querySelector("#delete");
    // this.updateElem = document.querySelector("#update");
    // this.addElem = document.querySelector("#add");
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
    if (!evt.target.checkValidity()) {
      return;
    }

    console.log("submited");

    // TODO: saving to storage
    // TODO: mutating data
    // TODO: close modal
    // TODO: error handling

    evt.target.reset();
    evt.preventDefault();
  }

  onSubmit() {
    document.forms.taskForm.addEventListener("submit", this.submitSetter);
  }
}

export default TaskForm;
