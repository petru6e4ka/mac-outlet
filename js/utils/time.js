import {
  HEADER_HEIGHT,
  MINUTES,
  DAY_LIMIT,
  DEFAULTS,
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

  const minutesFromStart = (y - HEADER_HEIGHT) / MINUTES.TO_PX;
  const endOfTask = minutesFromStart + DEFAULTS.DURATION;

  taskLimits.start.hours =
    DAY_LIMIT.START + Math.floor(minutesFromStart / MINUTES.IN_HOUR);
  taskLimits.start.minutes = Math.round(minutesFromStart % MINUTES.IN_HOUR);

  taskLimits.end.hours =
    DAY_LIMIT.START + Math.floor(endOfTask / MINUTES.IN_HOUR);
  taskLimits.end.minutes = Math.round(endOfTask % MINUTES.IN_HOUR);

  if (taskLimits.start.minutes === MINUTES.IN_HOUR) {
    taskLimits.start.minutes = 0;
    taskLimits.start.hours += 1;
  }

  if (taskLimits.end.minutes === MINUTES.IN_HOUR) {
    taskLimits.end.minutes = 0;
    taskLimits.end.hours += 1;
  }

  if (taskLimits.start.hours === DAY_LIMIT.END) {
    return [
      timeFormater(DAY_LIMIT.END - 1, DEFAULTS.DURATION),
      timeFormater(DAY_LIMIT.END, 0),
    ];
  }

  if (taskLimits.end.hours === DAY_LIMIT.END) {
    return [
      timeFormater(taskLimits.start.hours, taskLimits.start.minutes),
      timeFormater(DAY_LIMIT.END, 0),
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
  const minValue = new Date([YyMmDd, DAY_LIMIT.START_FORMATED]);
  const maxValue = new Date([YyMmDd, DAY_LIMIT.END_FORMATED]);

  if (date.toString() === "Invalid Date") return false;
  if (Number(date) < Number(minValue)) return false;
  if (Number(date) > Number(maxValue)) return false;

  return date;
};

const getSecondsFromTimeStr = (str) => {
  const YyMmDd = new Date().toISOString().split("T")[0];

  return new Date([YyMmDd, str]).getTime();
};

export const timeConverter = {
  timeFormater,
  posYToTimeFormated,
  timeValidation,
  getSecondsFromTimeStr,
};
