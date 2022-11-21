const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Missing required 'name' field"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Missing required 'email' field"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Missing required 'phone' field"],
    trim: true,
  },
});

ContactsSchema.index({ content: "text" });

const Contacts = mongoose.model("Contacts", ContactsSchema);

module.exports = Contacts;
