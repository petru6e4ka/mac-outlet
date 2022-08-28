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
