const keysValidation = (req, res, next) => {
  const necessaryKeys = ["name", "email", "phone"];
  const allKeys = Object.keys(req.body);
  const requiredFields = [];
  const valid =
    allKeys.every((key) => {
      const necessary = necessaryKeys.indexOf(key);

      if (necessary === -1) {
        requiredFields.push(key);
      }
      return necessary !== -1;
    }) && allKeys.length === necessaryKeys.length;

  if (!valid) {
    res
      .status(400)
      .send({ message: `Missing required ${requiredFields.join(", ")} field` });
    return;
  }

  next();
};

const valuesValidation = (req, res, next) => {
  const allValues = Object.values(req.body);
  const valid = allValues.every((value) => typeof value === "string");
  if (!valid) {
    res.status(400).send({ message: `All fields should contain string data` });
    return;
  }

  next();
};

const upadateFieldValidation = (req, res, next) => {
  const necessaryKeys = ["name", "email", "phone"];
  const allKeys = Object.keys(req.body);
  const valid = allKeys.every((key) => {
    return (
      necessaryKeys.indexOf(key) !== -1 && typeof req.body[key] === "string"
    );
  });

  if (!valid) {
    res.status(400).send({ message: "Missing fields" });
    return;
  }

  next();
};

module.exports = {
  keysValidation,
  valuesValidation,
  upadateFieldValidation,
};
