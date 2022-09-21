const lightenDarkenColor = (col, amt) => {
  const num = parseInt(col, 16);
  const r = (num >> 16) + amt;
  const b = ((num >> 8) & 0x00ff) + amt;
  const g = (num & 0x0000ff) + amt;
  const newColor = g | (b << 8) | (r << 16);

  return newColor.toString(16);
};

const getBorderColorString = (color) => {
  const colorCode = color.split("").slice(1).join("");
  const darkenColor = lightenDarkenColor(colorCode, 40);

  return `border-color: #${darkenColor}`;
};

export const color = {
  getBorderColorString,
};
