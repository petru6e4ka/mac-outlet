const mongoose = require("mongoose");
const fs = require("fs");
const { promisify } = require("node:util");
const Contacts = require("./api/models");

const readFileAsync = promisify(fs.readFile);
const file = "./src/db/contacts.json";
const dbName = "local_library";

async function connectionDB() {
  const mongoDB = `mongodb+srv://Anastasiia:DA65sdcmUFd6Q@cluster0.mcz49up.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  try {
    const data = await readFileAsync(file, { encoding: "utf8" }).then((text) =>
      JSON.parse(text)
    );

    await Contacts.insertMany(data).then(() => {
      console.log("Contacts data is imported to mongo");
    });
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

module.exports = connectionDB;
