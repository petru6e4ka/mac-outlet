export const modalTemplate = (content) => {
  return `
    <div class="modal__overlay" id="modal_overlay">
      <div class="modal">
        <div class="modal__content" id="portal-content">
          ${content}
        </div>
      </div>
    </div>
  `;
};
