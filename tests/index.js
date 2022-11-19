export class Calculator {
  calculation(num1, num2, op) {
    if (!this._argValidation(num1, num2)) {
      console.log("Unknown symbol. Input: string or number for arguments");
      return;
    }

    switch (op) {
      case "+":
        return Number(num1) + Number(num2);
      case "-":
        return Number(num1) - Number(num2);
      case "*":
        return Number(num1) * Number(num2);
      case "/":
        return Number(num1) / Number(num2);
      default:
        console.log("Unknown symbol. Input: +-*/");
        return;
    }
  }

  _argValidation(...args) {
    return args.every((elem) => !isNaN(elem));
  }
}

const symbolQuantity = 4;

export function maskify(cc) {
  const arrCC = cc.split("");

  return arrCC.length > symbolQuantity
    ? arrCC
        .map((el, i, arr) =>
          arr.length - symbolQuantity > i ? (el = "#") : el
        )
        .join("")
    : cc;
}

export function narcissistic(value) {
  const nums = Array.from(String(value), Number);
  const narcissisticVal = nums.reduce(
    (accumulator, currentValue, index, array) =>
      accumulator + Math.pow(+currentValue, array.length),
    0
  );
  return narcissisticVal === value;
}
