import { emplyeeArr } from "./testData.js";

//1
class Employee {
  constructor(employee) {
    Object.assign(this, employee);
  }

  //2
  getFullName() {
    return `${this.surname} ${this.name}`;
  }
}

//3
const createEmployesFromArr = (arr) => {
  return emplyeeArr.map((employee) => new Employee(employee));
};

const emplyeeConstructArr = createEmployesFromArr(emplyeeArr);

console.log(emplyeeConstructArr);
console.log(emplyeeConstructArr[0].getFullName());

//4
const getFullNamesFromArr = (arr) => {
  return arr.map((employee) => employee.getFullName());
};

console.log(getFullNamesFromArr(emplyeeConstructArr));

//5
const getMiddleSalary = (arr) => {
  return Math.round(
    arr.reduce((prev, current) => prev + current.salary, 0) / arr.length
  );
};

console.log(getMiddleSalary(emplyeeConstructArr));

//6
const getRandomEmployee = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

getRandomEmployee(emplyeeConstructArr);

//7
const employeeObj = new Employee(emplyeeArr[0]);

Object.defineProperty(employeeObj, "fullInfo", {
  get() {
    const keys = Object.keys(this);
    const values = Object.values(this);

    return keys.map((key, i) => `${key} - ${values[i]}`).join(", ");
  },

  set(value) {
    const keys = Object.keys(value);
    const values = Object.values(value);

    keys.map((key, i) => {
      if (this[key]) {
        this[key] = values[i];
      }
    });
  },
});
