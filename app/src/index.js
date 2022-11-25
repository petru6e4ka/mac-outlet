const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectionDB = require("./database/mongo");
const { routes } = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

connectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.warn("ERROR: ", err);
  });
