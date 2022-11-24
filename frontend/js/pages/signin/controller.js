import View from "./view.js";
import template from "./template.js";

class SignInController {
  constructor() {
    this.view = new View(template);
  }
}

export default SignInController;
