export const qtyFormater = (num) => {
  const arr = String(num).split("");
  let formated = "";

  for (let i = arr.length - 1; i >= 0; i--) {
    if (formated.length % 3 === 0 && formated.length > 0) {
      formated += ",";
    }

    formated += arr[i];
  }

  return formated.split("").reverse().join("");
};

export const memoryFormater = (num) => {
  if (num < 1000) return `${num} Gb`;
  if (num < 2000) return `1 Tb`;
  if (num < 4000) return `2 Tb`;

  return `+4 Tb`;
};
