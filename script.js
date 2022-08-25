// 1
const STR_1 = "Fiz";
const STR_2 = "Buz";
const STR_3 = STR_1 + STR_2;

for (let i = 1; i <= 10; i++) {
  if (!(i % 3)) {
    console.log(STR_3);
    continue;
  }

  if (!(i % 2)) {
    console.log(STR_2);
    continue;
  }

  console.log(STR_1);
}

//2
let factorial = 1;

for (let i = 10; i >= 1; i--) {
  factorial = factorial * i;
}

console.log(factorial);

//3
const sheetsInReamPaper = 500;
const consumptionPerWeek = 1200;
const weeksAmount = 8;

const extraSheets = (consumptionPerWeek * weeksAmount) % sheetsInReamPaper;
const extraReam = extraSheets > 0 ? 1 : 0;
const quantytyOfReams =
  (consumptionPerWeek * weeksAmount - extraSheets) / sheetsInReamPaper +
  extraReam;

console.log(quantytyOfReams);
