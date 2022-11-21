const express = require("express");
const bodyParser = require("body-parser");
const { routes } = require("./api/routes");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
