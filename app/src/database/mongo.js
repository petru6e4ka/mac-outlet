const mongoose = require("mongoose");
const dbName = "mac_outlet_shop";

async function connectionDB() {
  const mongoDB = `mongodb+srv://Anastasiia:DA65sdcmUFd6Q@cluster0.mcz49up.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

module.exports = connectionDB;
