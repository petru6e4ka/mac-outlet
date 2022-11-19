const userRoutes = require("./user");
const { getDevices } = require("../controllers/device");

const routes = (req, res) => {
  const { url } = req;
  const userPattern = /(^\/user$|^\/user\/)/;
  const base = "/";

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (url === base) {
    getDevices(req, res);
    return;
  }

  if (userPattern.test(url)) {
    userRoutes(req, res);
    return;
  }

  res.statusCode = 404;
  res.end();
};

module.exports = {
  routes,
};
