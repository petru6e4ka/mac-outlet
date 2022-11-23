export default class Page {
  constructor(template) {
    this.parent = document.querySelector("#root");
    this.clearPage(this.parent);
    this.renderPage(template);
  }

  renderPage(template) {
    return (this.parent.innerHTML = template);
  }

  clearPage(parent) {
    if (parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
  }
}
