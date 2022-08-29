import { memoryFormater } from "../helpers/utils.js";

export const filtersItemTemplate = (name, value, label) => `
  <label for="${value}" class="filters__checkbox-label">
    <input
      type="checkbox"
      name="${name}"
      id="${value}"
      value="${value}"
      class="filters__content-checkbox"
    />
    <span class="icon icon--checkbox"></span>
    <span>${label}</span>
  </label>
`;

export const filtersForm = (filters) => {
  const { price, color, memory, os, display } = filters;

  const colors = Object.keys(color)
    .sort()
    .map((c) => filtersItemTemplate("color", c, c))
    .join("");

  const memories = Object.keys(memory)
    .map((m) => filtersItemTemplate("memory", m, memoryFormater(m)))
    .join("");

  const oses = Object.keys(os)
    .sort()
    .map((o) => filtersItemTemplate("os", o, o))
    .join("");

  const displays = display
    .map((d) => filtersItemTemplate("display", d, d))
    .join("");

  return `<form
  class="filters filters__block inactive"
  name="filters"
  id="filters"
>
  <ul class="filters__list">
    <li class="filters__item">
      <input
        type="checkbox"
        name="price"
        class="filters__title-checkbox"
        id="price"
        value="price"
      />
      <label class="filters__title-label" for="price">
        <span class="filters__title">Price</span>
        <span class="icon icon--arrow"></span>
      </label>
      <div class="filters__content">
        <label for="price-min" class="filters__label">
          <span>From</span>
          <input
            type="number"
            name="min"
            id="price-min"
            min="${price.min}"
            max="${price.max}"
            placeholder="${price.min}"
            class="filters__input"
            value=""
          />
        </label>
        <label for="price-max" class="filters__label">
          <span>To</span>
          <input
            type="number"
            name="max"
            id="price-max"
            min="${price.min}"
            max="${price.max}"
            placeholder="${price.max}"
            class="filters__input"
            value=""
          />
        </label>
      </div>
    </li>

    <li class="filters__item">
      <input
        type="checkbox"
        name="color"
        class="filters__title-checkbox"
        id="color"
        value="color"
      />
      <label class="filters__title-label" for="color">
        <span class="filters__title">Color</span>
        <span class="icon icon--arrow"></span>
      </label>
      <div class="filters__content">
        ${colors}
      </div>
    </li>

    <li class="filters__item">
      <input
        type="checkbox"
        name="memory"
        class="filters__title-checkbox"
        id="memory"
        value="memory"
      />
      <label class="filters__title-label" for="memory">
        <span class="filters__title">Memory</span>
        <span class="icon icon--arrow"></span>
      </label>
      <div class="filters__content">
        ${memories}
      </div>
    </li>

    <li class="filters__item">
      <input
        type="checkbox"
        name="os"
        class="filters__title-checkbox"
        id="os"
        value="os"
      />
      <label class="filters__title-label" for="os">
        <span class="filters__title">OS</span>
        <span class="icon icon--arrow"></span>
      </label>
      <div class="filters__content">
        ${oses}
      </div>
    </li>

    <li class="filters__item">
      <input
        type="checkbox"
        name="display"
        class="filters__title-checkbox"
        id="display"
        value="display"
      />
      <label class="filters__title-label" for="display">
        <span class="filters__title">Display</span>
        <span class="icon icon--arrow"></span>
      </label>
      <div class="filters__content">
        ${displays}
      </div>
    </li>
  </ul>
  <button type="reset" class="button">Reset filters</button>
</form>`;
};
