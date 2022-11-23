import HomePage from "./pages/home/controller.js";
import SignInPage from "./pages/signin/controller.js";
import SignUpPage from "./pages/signup/controller.js";
import { token } from "./repository/storage.js";
import { PAGE, AUTH } from "./modules/events/eventNames.js";
import authService from "./service/auth.js";

class App {
  constructor() {
    token.listen(this.auth.bind(this));

    this.token = token.get();

    if (this.token) {
      this.auth(this.token);
    }

    if (!this.token) {
      this.auth(null);
    }
  }

  auth(data) {
    console.log("HEY");
    console.log(data);
    if (data) {
      this.homeInit();
      return;
    }

    this.signinInit();
    return;
  }

  signupInit() {
    this.page = new SignUpPage();

    this.page.view.events.subscribe(PAGE.SIGNIN, this.signinInit.bind(this));
    this.page.view.events.subscribe(
      AUTH.SIGNUP,
      authService.signup.bind(this, token.set)
    );
  }

  signinInit() {
    this.page = new SignInPage();

    this.page.view.events.subscribe(PAGE.SIGNUP, this.signupInit.bind(this));
    this.page.view.events.subscribe(
      AUTH.SIGNIN,
      authService.signin.bind(this, token.set)
    );
  }

  homeInit() {
    this.page = new HomePage();
  }
}

export default new App();
