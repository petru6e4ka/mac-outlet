const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Missing required 'name' field"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Missing required 'email' field"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Missing required 'password' field"],
      trim: true,
    },
  },
  { collection: "users" },
  { collation: { locale: "en_US", strength: 1 } }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
