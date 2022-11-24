const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET_JWT_CODE = "qwertyuiop";
const SALT = "asdfghjklzxcvbnm";
const maxAge = 1000 * 60 * 5;

const createToken = (user) => {
  const { name, email } = user;

  return jwt.sign({ name, email }, SECRET_JWT_CODE, {
    expiresIn: maxAge,
  });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const pwd = await bcrypt.hash(password + SALT, 10);

    User.create({ name, email, password: pwd }, (err, user) => {
      if (err) {
        res.status(500).end();
        return;
      }

      const token = createToken(user);

      res.status(201).json({ token });
    });
  } catch (err) {
    res.status(500).end();
    return;
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const message = "Wrong username or login";
    const user = await User.findOne({ name });

    if (!user) {
      res.status(400).json({ message });
      return;
    }

    if (!(await bcrypt.compare(password + SALT, user.password))) {
      res.status(400).json({ message });
      return;
    }

    const token = createToken(user);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).end();
    return;
  }
};

module.exports = {
  createUser,
  loginUser,
  secret: SECRET_JWT_CODE,
};
