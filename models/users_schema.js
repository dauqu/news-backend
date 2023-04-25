const mongoose = require("mongoose");

//Schema
const UsersSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Hi there! I am new to this app.",
  },
  about: {
    type: String,
    default: "I am new to this app.",
  },
  phone: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    default: "en",
  },
  country: {
    type: String,
    default: "IN",
  },
  country_code: {
    type: String,
    default: "+91",
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  status: {
    type: String,
    default: "active",
  },
  rpt: { //Reset password token
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("users", UsersSchema);
