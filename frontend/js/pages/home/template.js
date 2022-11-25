const home = () => {
  return `<header>
  <div class="container header__block">
    <div class="logo logo__block">
      <a href="./index.html" class="logo__link">
        <img src="./img/logo.svg" alt="Logo" class="logo__img" />
      </a>
    </div>
    <div class="authorized__block">
      <a href="#" class="link" id="logout">Logout</a>
      <div class="basket basket__block" id="basket"></div>
    </div>
  </div>
</header>
<main>
  <section>
    <div class="container slider__block">
      <div class="slider">
        <div class="slide">
          <div class="slide__content">
            <h1>IPad Air</h1>
            <button class="button">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="product-list" aria-label="product list">
    <div class="container">
      <div id="controls"></div>
      <div class="products__block" id="list">
        <div class="products" id="products"></div>
      </div>
    </div>
  </section>

  <div id="portal" class="hidden"></div>
</main>
  `;
};

export default home();
