const mongoose = require("mongoose");

//Schema
const UsersSchema = new mongoose.Schema({
  full_name: {
    type: String,
  },
  dp: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  phone: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  language: {
    type: String,
  },
  country: {
    type: String,
  },
  password: {
    type: String,
  },
  rpt: { //Reset password token
    type: String,
  },
  otp: { //One time password
    type: String,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("users", UsersSchema);
