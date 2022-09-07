import data from "./data/mock.js";
import Day from "./modules/Day.js";

class App {
  constructor() {
    this.day = new Day(data);
  }
}

new App();
