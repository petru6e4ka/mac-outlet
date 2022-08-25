// 1
const citiesAndCountries = {
  Киев: "Украина",
  "Нью-Йорк": "США",
  Амстердам: "Нидерланды",
  Берлин: "Германия",
  Париж: "Франция",
  Лиссабон: "Португалия",
  Вена: "Австрия",
};

const result = [];

for (key in citiesAndCountries) {
  result.push(`${key} - это ${citiesAndCountries[key]}`);
}

console.log(result);

//2
function getArray(amount) {
  const step = 3;

  let initial = 0;
  let final = step;

  const array = Array.from({ length: amount }, (_, i) => i + 1);
  const result = [];

  for (let i = 0; i < amount / step; i++) {
    result.push(array.slice(initial, final));
    initial += step;
    final += step;
  }

  return result;
}

console.log(getArray(9));
console.log(getArray(12));

//3
function getNameOfDay(lang, day) {
  const namesOfDays = {
    ru: [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ],
    en: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  };

  console.log(namesOfDays[lang][day - 1]);
}

getNameOfDay("en", 7);
getNameOfDay("ru", 3);

//4
function sum(arr) {
  const sorted = arr.sort((a, b) => a - b);

  return sorted[0] + sorted[1];
}

console.log(sum([19, 5, 42, 2, 77]));
console.log(sum([10, 800, 3453000, 8010]));
console.log(sum([12, 898, 899, 900]));
