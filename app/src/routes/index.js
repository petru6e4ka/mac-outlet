const { getDevices } = require("../controllers/devices");
const { createUser, loginUser } = require("../controllers/user");
const {
  newUserValidation,
  userValidation,
  valuesValidation,
} = require("../middlewares/validations");
const { authRequired } = require("../middlewares/auth");

const index = process.cwd() + "/index.html";

const routes = (app) => {
  app.route("/api/devices").get(authRequired, getDevices);
  app
    .route("/api/signup")
    .post(valuesValidation, newUserValidation, createUser);
  app.route("/api/signin").post(valuesValidation, userValidation, loginUser);

  app.route("/").get((_req, res) => {
    res.sendFile(index);
  });
};

module.exports = {
  routes,
};
