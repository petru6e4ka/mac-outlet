//TASK_1
const countFrom = (initial) => {
  let count = initial;

  const sum = (num) => {
    count += num;
    return count;
  };

  return sum;
};

const counter = countFrom(0);

console.log(counter(3)); // 3
console.log(counter(5)); // 8
console.log(counter(228)); // 236

//TASK_2
const createArray = () => {
  let arr = [];

  const updateArr = (elem) => {
    if (!elem) {
      arr = [];
      return arr;
    }

    arr.push(elem);
    return arr;
  };

  return updateArr;
};

const getUpdatedArr = createArray();

console.log(getUpdatedArr(3)); // [3]
console.log(getUpdatedArr(5)); // [3, 5]
console.log(getUpdatedArr({ name: "Vasya" })); // [3, 5, {name: 'Vasya'}]
console.log(getUpdatedArr()); // []
console.log(getUpdatedArr(4)); // [4]

//TASK_3
const timer = () => {
  let seconds = 0;
  let timerId;

  const updateSeconds = () => {
    if (!timerId) {
      timerId = setInterval(() => {
        seconds += 1;
      }, 1000);
      return "Enabled";
    }

    return seconds;
  };

  return updateSeconds;
};

const getTime = timer();

//TASK_4
const time = 60;

const descendingTimer = (time) => {
  const stringify = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const timeFormater = (time) => {
    const seconds = time % 60;
    const minutes = (time - seconds) / 60;

    return `${stringify(minutes)}:${stringify(seconds)}`;
  };

  let seconds = time;
  let timerId;

  timerId = setInterval(() => {
    if (seconds > 0) {
      console.log(timeFormater(seconds));
      seconds -= 1;
      return;
    }

    console.log("Time End");
    clearInterval(timerId);
  }, 1000);
};

//descendingTimer(120);
// 02:00
// 00:59
// 00:58
//...
// 00:01
// Time End

descendingTimer(59);
// 00:59
// 00:58
// 00:57
//...
// 00:01
// Time End
