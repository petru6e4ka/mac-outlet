export const task = (task) => {
  const { start, duration, minTitle, bg, left, width, border } = task;

  return `
    <div 
      style="
        position: absolute; 
        width: ${width ? width : "100%"}; 
        top: ${start * 2}px; 
        ${left ? `left: ${left}px;` : ""} 
        height: ${duration * 2}px; 
        padding: 5px; 
        background: ${bg}; 
        border-left: 2px solid ${border}; 
      ">
        ${minTitle}
      </div>
  `;
};
