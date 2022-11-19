const {
  get,
  post,
  postAll,
  getByUsername,
  put,
  remove,
} = require("../models/user");

const getAllUsers = async (_req, res) => {
  try {
    const users = await get();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(users);
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

const createUser = async (req, res) => {
  try {
    const user = await getByUsername(req.body.username);

    if (user) {
      res.statusCode = 400;
      res.end("User already exists");

      return;
    }

    const newUser = await post(req.body);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(newUser);
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

const createUsersFromArray = async (req, res) => {
  try {
    const newUsers = await postAll(req.body);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(newUsers);
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getByUsername(req.params.username);

    if (!user) {
      res.statusCode = 404;
      res.end();
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(user);
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await getByUsername(req.params.username);

    if (!user) {
      res.statusCode = 404;
      res.end();
      return;
    }

    const updated = await put(req.params.username, req.body);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(updated);
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await getByUsername(req.params.username);

    if (!user) {
      res.statusCode = 404;
      res.end();
      return;
    }

    await remove(req.params.username);
    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

module.exports = {
  getAllUsers,
  createUser,
  createUsersFromArray,
  getUser,
  updateUser,
  removeUser,
};
