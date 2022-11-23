const mongoose = require("mongoose");
const fs = require("fs");
const csvParser = require("csv-parser");
const Device = require("./models/product");

const file = "./app/src/device.csv";
const dbName = "mac_outlet_shop";

async function connectionDB() {
  const mongoDB = `mongodb+srv://Anastasiia:DA65sdcmUFd6Q@cluster0.mcz49up.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  try {
    const result = [];

    fs.createReadStream(file)
      .pipe(csvParser())
      .on("data", (data) => {
        result.push(data);
      })
      .on("end", async () => {
        await Device.insertMany(result).then(() => {
          console.log("Device data is imported to mongo");
        });
      });
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

module.exports = connectionDB;
