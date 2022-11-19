const { GET, POST, PUT, DELETE } = require("./constants");
const {
  getAllUsers,
  createUser,
  createUsersFromArray,
  getUser,
  updateUser,
  removeUser,
} = require("../controllers/user");
const {
  keysValidation,
  valuesValidation,
  arrayValidation,
} = require("../middlewares/validations");

const userRoutes = (req, res) => {
  const { url, method } = req;
  const username = url
    .split("/")
    .filter((elem) => !!elem && elem !== "user")
    .join("");
  const createWithArray = "createWithArray";

  if (!username && method === GET) {
    getAllUsers(req, res);
    return;
  }

  if (!username && method === POST) {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", async () => {
        body = Buffer.concat(body).toString();
        req.body = JSON.parse(body);

        keysValidation(req, res);
        valuesValidation(req, res);
        createUser(req, res);
      });
    return;
  }

  if (username === createWithArray && method === POST) {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", async () => {
        body = Buffer.concat(body).toString();
        req.body = JSON.parse(body);

        arrayValidation(req, res);
        createUsersFromArray(req, res);
      });
    return;
  }

  if (username && method === GET) {
    getUser({ params: { username } }, res);
    return;
  }

  if (username && method === PUT) {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", async () => {
        body = Buffer.concat(body).toString();
        req.body = JSON.parse(body);

        keysValidation(req, res);
        valuesValidation(req, res);
        updateUser({ params: { username }, body: req.body }, res);
      });
    return;
  }

  if (username && method === DELETE) {
    removeUser({ params: { username } }, res);
    return;
  }

  res.statusCode = 400;
  res.end();
  return;
};

module.exports = userRoutes;
