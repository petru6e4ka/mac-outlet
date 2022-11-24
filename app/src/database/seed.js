const fs = require("fs");
const csvParser = require("csv-parser");
const Device = require("../models/product");
const connectionDB = require("./mongo");

const file = "./app/src/database/device.csv";

const seed = async () => {
  await connectionDB().then(() => {
    try {
      const result = [];

      fs.createReadStream(file)
        .pipe(csvParser())
        .on("data", (data) => {
          result.push(data);
        })
        .on("end", async () => {
          await Device.insertMany(result)
            .then(() => {
              console.log("Device data is imported to mongo");
            })
            .catch((err) => {
              console.log("ERROR: ", err);
            })
            .finally(() => {
              process.exit();
            });
        });
    } catch (err) {
      console.log("ERROR: ", err);
    }
  });
};

seed();
