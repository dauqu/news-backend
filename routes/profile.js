const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users_schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CheckAuth = require("./../functions/check_auth");

//Get Profile
router.get("/", async (req, res) => {

  const check = await CheckAuth(req, res);
  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", data: null, auth: false });
  } else {
    return res.status(200).json({ message: "Authorized", data: check.data, auth: true });
  }
});

//Update Profile
router.post("/", async (req, res) => {
  const check = await CheckAuth(req, res);
  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", data: null, auth: false });
  } else {
    const { name, username, email, phone } = req.body;
    const user = await UsersSchema.findById(check.data._id);
    if (user) {
      user.name = name;
      user.username = username;
      user.email = email;
      user.phone = phone;
      await user.save();
      return res.status(200).json({ message: "Profile updated successfully", data: user, auth: true });
    } else {
      return res.status(404).json({ message: "User not found", data: null, auth: false });
    }
  }
});

module.exports = router;
