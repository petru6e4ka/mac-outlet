const { getDevices } = require("../controllers/devices");
const { createUser, loginUser } = require("../controllers/user");
const {
  newUserValidation,
  userValidation,
  valuesValidation,
} = require("../middlewares/validations");
const { authRequired } = require("../middlewares/auth");
const express = require("express");

const router = express.Router();

const index = process.cwd() + "/frontend/index.html";

router.use("/css", express.static(process.cwd() + "/frontend/css"));
router.use("/js", express.static(process.cwd() + "/frontend/js"));
router.use("/img", express.static(process.cwd() + "/frontend/img"));

const routes = (app) => {
  app.route("/api/devices").get(authRequired, getDevices);
  app
    .route("/api/signup")
    .post(valuesValidation, newUserValidation, createUser);
  app.route("/api/signin").post(valuesValidation, userValidation, loginUser);

  app.route("/").get((_req, res) => {
    res.sendFile(index);
  });
  app.route("*").get((_req, res) => {
    res.redirect("https://mac-outlet-shop-app.herokuapp.com/");
  });
};

module.exports = {
  routes,
};
