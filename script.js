import { studentArr } from "./testData.js";

//TASK_1
class Student {
  static id = 0;
  static listOfStudents = [];
  static minRating = 800;

  constructor(enrollee) {
    const { name, surname, ratingPoint, schoolPoint } = enrollee;

    Object.assign(this, {
      name,
      surname,
      ratingPoint,
      schoolPoint,
      id: this.constructor.createId(),
      _score: Number(`${ratingPoint}.${schoolPoint}`),
      _hasMinRating: enrollee.ratingPoint >= this.constructor.minRating,
    });

    this.constructor.setNewStudentToList(this);
  }

  static createId() {
    this.id += 1;
    return this.id;
  }

  static setNewStudentToList(student) {
    this.listOfStudents.push(student);
    this.listOfStudents.sort((a, b) => b._score - a._score);
    this.listOfStudents.forEach((elem, i) => {
      if (i < 5 && elem._hasMinRating) {
        elem.isSelfPayment = false;
        return;
      }

      elem.isSelfPayment = true;
    });
  }
}

new Student(studentArr[0]);
new Student(studentArr[1]);
new Student(studentArr[2]);
new Student(studentArr[3]);
new Student(studentArr[4]);
new Student(studentArr[5]);
new Student(studentArr[6]);
new Student(studentArr[7]);
new Student(studentArr[8]);
new Student(studentArr[9]);
new Student(studentArr[10]);

console.log(Student.listOfStudents);

//TASK_2
class CustomString {
  reverse(str) {
    return str.split("").reverse().join("");
  }

  ucFirst(str) {
    const arr = str.split("");
    return `${arr[0].toUpperCase()}${arr.slice(1).join("")}`;
  }

  ucWords(str) {
    return str
      .split(" ")
      .map((elem) => this.ucFirst(elem))
      .join(" ");
  }
}

const myString = new CustomString();

console.log(myString.reverse("qwerty")); //выведет 'ytrewq'
console.log(myString.ucFirst("qwerty")); //выведет 'Qwerty'
console.log(myString.ucWords("qwerty qwerty qwerty")); //выведет 'Qwerty Qwerty Qwerty

//TASK_3
class Validator {
  checkIsEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  checkIsDomain(domain) {
    const re = /\S+\.\S+/;
    return re.test(domain);
  }

  checkIsDate(date) {
    const isDate = new Date(date);

    return isDate.toString() === "Invalid Date" ? false : true;
  }
}
const validator = new Validator();

console.log(validator.checkIsEmail("vasya.pupkin@gmail.com")); // true
console.log(validator.checkIsDomain("google.com")); // true
console.log(validator.checkIsDate("01.31.4011")); // true
//validator.checkIsPhone('+38 (066) 937-99-92');
