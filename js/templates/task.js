import { MINUTES_TO_PIXELS } from "../constants/constants.js";

export const task = (task) => {
  const { start, duration, minTitle, bg, left, width, border, id, title } =
    task;

  return `
    <div class="task"
      data-task="${title}"
      data-type="task"
      ${id ? `id="${id}"` : ""}
      style="
        width: ${width ? width : "100%"}; 
        top: ${start * MINUTES_TO_PIXELS}px; 
        ${left ? `left: ${left}px;` : ""} 
        height: ${duration * MINUTES_TO_PIXELS}px;
        background: ${bg};
        border-left: 2px solid ${border};
      ">
        ${minTitle}
      </div>
  `;
};
