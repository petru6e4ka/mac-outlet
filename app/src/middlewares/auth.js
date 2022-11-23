const jwt = require("jsonwebtoken");
const { secret } = require("../controllers/user");

const authRequired = (req, res, next) => {
  const bearer = req.headers["authorization"];

  if (bearer) {
    const token = bearer.split("Bearer ")[1];

    jwt.verify(token, secret, (err, _decodedToken) => {
      if (err) {
        res.status(403).end();
        return;
      }

      next();
    });
  }

  if (!bearer) {
    res.status(403).end();
    return;
  }
};

module.exports = {
  authRequired,
};
