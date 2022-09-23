export const notification = (notif) => {
  return `
  <div class="notif active" id="${notif.id}">
    <h3>${notif.title} is started</h3>
    <button class="notif-close" value="${notif.id}">+</button>
  </div>
  `;
};
