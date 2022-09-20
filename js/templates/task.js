export const task = (task) => {
  const { start, duration, minTitle, bg, left, width, border } = task;

  return `
    <div class="task"
      style="
        width: ${width ? width : "100%"}; 
        top: ${start * 2}px; 
        ${left ? `left: ${left}px;` : ""} 
        height: ${duration * 2}px; 
      ">
        ${minTitle}
      </div>
  `;
};

// background: ${bg};
// border-left: 2px solid ${border};
