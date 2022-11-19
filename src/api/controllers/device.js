const fs = require("node:fs");
const csvParser = require("csv-parser");

const file = "./src/db/device.csv";

const getDevices = async (_req, res) => {
  try {
    const result = [];

    fs.createReadStream(file)
      .pipe(csvParser())
      .on("data", (data) => {
        result.push(data);
      })
      .on("end", () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      });
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

module.exports = {
  getDevices,
};
