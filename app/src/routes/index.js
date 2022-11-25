const path = require("path");
const { getDevices } = require("../controllers/devices");
const { createUser, loginUser } = require("../controllers/user");
const {
  newUserValidation,
  userValidation,
  valuesValidation,
} = require("../middlewares/validations");
const { authRequired } = require("../middlewares/auth");

const routes = (app) => {
  app.route("/api/devices").get(authRequired, getDevices);
  app
    .route("/api/signup")
    .post(valuesValidation, newUserValidation, createUser);
  app.route("/api/signin").post(valuesValidation, userValidation, loginUser);
};

module.exports = {
  routes,
};
