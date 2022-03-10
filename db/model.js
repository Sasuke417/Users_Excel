const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phonenumber: Number,
  address: String,
  gender: String,
  birthdate: Date,
  created_on: Date,
});
const user = mongoose.model("Users", userSchema);
exports.user = user;
