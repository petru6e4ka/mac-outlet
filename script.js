//TASK_1
const arr = ["Vasya", "Petya", "Alexey"];
const removeUser = (arr, i) => arr.splice(i, 1);

removeUser(arr, 1); // ['Vasya', 'Alexey']

//TASK_2
const obj = { name: "Vasya", age: 1 };
const getAllKeys = (obj) => Object.keys(obj);

getAllKeys(obj); // ["name", "age"]

//TASK_3
const getAllValues = (obj) => Object.values(obj);
getAllValues(obj); // ["Vasya", 1]

//TASK_4
const obj_1 = {
  id: 3,
  name: "Vasya",
};

const secondObj = {
  id: 4,
  name: "Katya",
};

const arr_1 = [
  {
    id: 1,
    name: "Kolya",
  },
  {
    id: 2,
    name: "Petya",
  },
];

const insertIntoarr = (obj, i) => {
  const index = arr_1.findIndex((object) => {
    return object.id === i;
  });

  arr_1.splice(index, 0, obj);
};

insertIntoarr(obj_1, 2);
// [ {id: 1,name: 'Kolya'}, {id: 3, name: 'Vasya'}, {id: 2, name: 'Petya'} ]

insertIntoarr(secondObj, 1);
// [ {id: 4,name: 'Katya'}, {id: 1,name: 'Kolya'}, {id: 3, name: 'Vasya'}, {id: 2, name: 'Petya'} ]

//TASK_5
class Condidate {
  constructor(obj) {
    Object.assign(this, obj);
    this.state = this.getState();
  }

  getState() {
    return this.address.split(",")[2];
  }
}

const condidate = new Condidate(condidateArr[0]);
condidate.state; /// Colorado

//TASK_6
const getCompanyNames = () => {
  const companies = {};

  condidateArr.forEach((condidate) => (companies[condidate.company] = null));

  return Object.keys(companies);
};

getCompanyNames(); /// [""EZENT, "JASPER" ... ]

//TASK_7
const getUsersByYear = (year) =>
  condidateArr
    .filter((condidate) => Number(condidate.registered.slice(0, 4)) === year)
    .map((elem) => elem._id);

getUsersByYear(2017); /// ["e216bc9cab1bd9dbae25637", "5e216bc9e51667c70ee19f4f" ...]

//TASK_8
const getNumericString = (string) =>
  string
    .split("")
    .filter((symbol) => !Number.isNaN(Number(symbol)) && symbol.trim())
    .join("");

const getCondidatesByUnreadMsg = (unreadMsg) =>
  condidateArr.filter(
    (elem) => Number(getNumericString(elem.greeting)) === unreadMsg
  );

getCondidatesByUnreadMsg(8); /// [Condidate, Condidate ...]

//TASK_9
const getCondidatesByGender = (gender) =>
  condidateArr.filter((elem) => elem.gender === gender);

getCondidatesByGender("male"); /// [Condidate, Condidate ...]

//TASK_10
Array.prototype.customJoin = function (separator) {
  const _separator = separator ? separator : ",";
  let string = "";

  for (let i = 0; i < this.length; i++) {
    string = string + this[i] + _separator;
  }

  return string;
};

Array.prototype.customReduce = function (...args) {
  const [func, initial] = args;

  let _initialValue = initial === undefined ? this[0] : initial;

  for (let i = 0; i < this.length; i++) {
    _initialValue = func(_initialValue, this[i], i, this);
  }

  return _initialValue;
};
