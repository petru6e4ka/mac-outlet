const keysValidation = async (req, res) => {
  const necessaryKeys = [
    "username",
    "firstName",
    "lastName",
    "email",
    "password",
    "phone",
  ];
  const allKeys = Object.keys(req.body);
  const valid =
    allKeys.every((key) => {
      return necessaryKeys.indexOf(key) !== -1;
    }) && allKeys.length === necessaryKeys.length;

  if (!valid) {
    res.statusCode = 400;
    res.end();
    return;
  }
};

const valuesValidation = async (req, res) => {
  const allValues = Object.values(req.body);
  const valid = allValues.every(
    (value) => typeof value === "string" && value.trim() !== ""
  );

  if (!valid) {
    res.statusCode = 400;
    res.end();
    return;
  }
};

const arrayValidation = async (req, res) => {
  if (!Array.isArray(req.body)) {
    res.statusCode = 400;
    res.end();
    return;
  }

  req.body.forEach((user) => {
    keysValidation({ body: user }, res);
    valuesValidation({ body: user }, res);
  });
};

module.exports = {
  keysValidation,
  valuesValidation,
  arrayValidation,
};
