const invalidKeysMessage = "Missing required fields";
const invalidValuesMessage = "All fields should contain string data";

const keyValidation = (keys, required) => {
  return (
    keys.every((key) => required.indexOf(key) !== -1) &&
    keys.length === required.length
  );
};

const valuesValidation = (req, res, next) => {
  const values = Object.values(req.body);
  const valid = values.every(
    (value) => typeof value === "string" && !!value.trim()
  );

  if (!valid) {
    res.status(400).send({ message: invalidValuesMessage });
    return;
  }

  next();
};

const newUserValidation = (req, res, next) => {
  const necessaryKeys = ["name", "email", "password"];
  const validKeys = keyValidation(Object.keys(req.body), necessaryKeys);

  if (!validKeys) {
    res.status(400).send({
      message: invalidKeysMessage,
    });
    return;
  }

  next();
};

const userValidation = (req, res, next) => {
  const necessaryKeys = ["name", "password"];
  const validKeys = keyValidation(Object.keys(req.body), necessaryKeys);

  if (!validKeys) {
    res.status(400).send({
      message: invalidKeysMessage,
    });
    return;
  }

  next();
};

module.exports = {
  newUserValidation,
  userValidation,
  valuesValidation,
};
