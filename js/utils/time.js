import {
  HEADER_HEIGHT,
  MINUTES_TO_PIXELS,
  DAY_LIMIT,
  HOUR,
} from "../constants/constants.js";

const timeFormater = (hh, mm) => {
  const _hh = String(hh);
  const _mm = String(mm);

  return `${_hh.length === 2 ? _hh : "0" + _hh}:${
    _mm.length === 2 ? _mm : "0" + _mm
  }`;
};

const posYToTimeFormated = (y) => {
  const taskLimits = {
    start: {
      hours: 0,
      minutes: 0,
    },
    end: {
      hours: 0,
      minutes: 0,
    },
  };

  const defaultEnd = 30;

  const minutesFromStart = (y - HEADER_HEIGHT.NUMBER) / MINUTES_TO_PIXELS;
  const endOfTask = minutesFromStart + defaultEnd;

  taskLimits.start.hours =
    DAY_LIMIT.START + Math.floor(minutesFromStart / HOUR);
  taskLimits.start.minutes = Math.round(minutesFromStart % HOUR);

  taskLimits.end.hours = DAY_LIMIT.START + Math.floor(endOfTask / HOUR);
  taskLimits.end.minutes = Math.round(endOfTask % HOUR);

  if (taskLimits.start.minutes === 60) {
    taskLimits.start.minutes = 0;
    taskLimits.start.hours += 1;
  }

  if (taskLimits.end.minutes === 60) {
    taskLimits.end.minutes = 0;
    taskLimits.end.hours += 1;
  }

  if (taskLimits.start.hours === 17) {
    return [timeFormater(16, 30), timeFormater(17, 0)];
  }

  if (taskLimits.end.hours === 17) {
    return [
      timeFormater(taskLimits.start.hours, taskLimits.start.minutes),
      timeFormater(17, 0),
    ];
  }

  return [
    timeFormater(taskLimits.start.hours, taskLimits.start.minutes),
    timeFormater(taskLimits.end.hours, taskLimits.end.minutes),
  ];
};

const timeValidation = (value) => {
  const YyMmDd = new Date().toISOString().split("T")[0];
  const date = new Date([YyMmDd, value]);
  const minValue = new Date([YyMmDd, "08:00"]);
  const maxValue = new Date([YyMmDd, "17:00"]);

  if (date.toString() === "Invalid Date") return false;
  if (Number(date) < Number(minValue)) return false;
  if (Number(date) > Number(maxValue)) return false;

  return date;
};

export const timeConverter = {
  timeFormater,
  posYToTimeFormated,
  timeValidation,
};
