const signin = () => {
  return `<header>
  <div class="container header__block">
    <div class="logo logo__block">
      <a href="./index.html" class="logo__link">
        <img src="./img/logo.svg" alt="Logo" class="logo__img" />
      </a>
    </div>
  </div>
</header>
<main>
  <form class="form">
    <h2 class="form__title">Login</h2>
    <label for="name" class="form__label">
      <span>User name</span>
      <input
        type="text"
        name="name"
        id="name"
        class="form__input"
        required
      />
    </label>
    <label for="password" class="form__label">
      <span>Password</span>
      <input
        type="password"
        name="password"
        id="password"
        class="form__input"
        required
      />
    </label>
    <p id="error" class="form__error"></p>
    <button type="submit" class="button" id="submit" disabled>Login</button>
    <a href="#" class="link" id="redirect">Sign Up</a>
  </form>
</main>
  `;
};

export default signin();
