const express = require("express");
const bodyParser = require("body-parser");
const connectionDB = require("./mongo.js");
const { routes } = require("./api/routes");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectionDB();
routes(app);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
