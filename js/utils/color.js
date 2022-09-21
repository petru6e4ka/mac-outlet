function lightenDarkenColor(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).slice(-2)
      )
  );
}

const getBorderColorString = (color) => {
  const colorCode = color.split("").slice(1).join("");
  const darkenColor = lightenDarkenColor(colorCode, -60);

  return `${darkenColor}`;
};

export const color = {
  getBorderColorString,
};
