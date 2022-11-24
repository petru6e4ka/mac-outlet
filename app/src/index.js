const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectionDB = require("./database/mongo");
const { routes } = require("./routes");

const app = express();
const hostname = "0.0.0.0";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

connectionDB()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.warn("ERROR: ", err);
  });
