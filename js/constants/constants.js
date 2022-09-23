import { timeConverter } from "../utils/time.js";

export const HEADER_HEIGHT = 60;

export const DEFAULTS = {
  DURATION: 30,
  TITLE: "New Task",
  MIN_TASK_WIDTH: 200,
  COLOR: "#E2ECF5",
};

export const MINUTES = {
  IN_HOUR: 60,
  MILISECONDS: 1000,
  TO_PX: 2,
};

export const DAY_LIMIT = {
  START: 8,
  END: 17,
  START_FORMATED: "08:00",
  END_FORMATED: "17:00",
};

export const TASK = {
  OPEN: "OPEN",
  CANCEL: "CANCEL",
  SAVED: "SAVED",
  CHANGE: "CHANGE",
  UPDATED: "UPDATED",
  DELETED: "DELETED",
  STARTED: "STARTED",
};

export const ACTIONS = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

export const DAY_MINUTES =
  timeConverter.getSecondsFromTimeStr(DAY_LIMIT.END_FORMATED) -
  timeConverter.getSecondsFromTimeStr(DAY_LIMIT.START_FORMATED) /
    1000 /
    MINUTES.IN_HOUR;
