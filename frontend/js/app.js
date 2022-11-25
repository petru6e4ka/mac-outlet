import HomePage from "./pages/home/controller.js";
import SignInPage from "./pages/signin/controller.js";
import SignUpPage from "./pages/signup/controller.js";
import { cart, filtering, token } from "./repository/storage.js";
import { PAGE, AUTH } from "./modules/events/eventNames.js";
import authService from "./service/auth.js";
import repository from "./repository/products.js";

class App {
  constructor() {
    this.productsRepository = repository.products;
    this.productsRepository.events.subscribe(
      AUTH.LOGOUT,
      this.onLogout.bind(this)
    );

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
    if (data) {
      this.homeInit();
      return;
    }

    const addedProducts = cart.get();
    const filteredProducts = filtering.get();

    if (addedProducts) cart.remove();
    if (filteredProducts) filtering.remove();

    this.signinInit();
    return;
  }

  signupInit() {
    this.page = new SignUpPage();

    this.page.view.events.subscribe(PAGE.SIGNIN, this.signinInit.bind(this));
    this.page.view.events.subscribe(
      AUTH.SIGNUP,
      authService.signup.bind(
        this,
        this.auth.bind(this),
        this.page.view.onError.bind(this.page.view)
      )
    );
  }

  signinInit() {
    this.page = new SignInPage();

    this.page.view.events.subscribe(PAGE.SIGNUP, this.signupInit.bind(this));
    this.page.view.events.subscribe(
      AUTH.SIGNIN,
      authService.signin.bind(
        this,
        this.auth.bind(this),
        this.page.view.onError.bind(this.page.view)
      )
    );
  }

  homeInit() {
    this.page = new HomePage();

    this.page.view.events.subscribe(AUTH.LOGOUT, this.onLogout.bind(this));
  }

  onLogout() {
    token.remove();
    cart.remove();
    filtering.remove();

    this.auth();
  }
}

export default new App();
