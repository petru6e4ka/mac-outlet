export const controls = () => {
  return `
  <div class="search search__block">
    <div class="search__icon-container">
      <div class="search__icon"></div>
    </div>
    <input
      type="text"
      name="search"
      id="search"
      class="search__input"
      placeholder="Enter device name..."
    />
    <button class="icon-button filter" id="filter">
      <span class="icon-button__content">
        <span class="icon-button__icon"></span>
      </span>
    </button>
    <button class="icon-button sort">
      <span class="icon-button__content">
        <span class="icon-button__icon"></span>
      </span>
    </button>
  </div>
  `;
};
