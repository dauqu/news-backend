const express = require("express");
const router = express.Router();
const EntrySchema = require("./../models/add_entry_schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json({
    message: "Entry API",
  });
});

//add entry
router.post("/", async (req, res) => {
  const token = req.cookies.auth_token || req.body.token;

  if (token === undefined || token === null || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //Save user to database
  const add_entry = new EntrySchema({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    username: decoded.username,
  });
  try {
    await add_entry.save();
    res.status(200).json({
      message: "Entry created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Check User is login or not
router.post("/all", async (req, res) => {
  const token = req.cookies.auth_token || req.body.token;

  if (token === undefined || token === null || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const entry = await EntrySchema.find({ username: decoded.username });
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
}),
  async function checkUser(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    //Check all filled or not
    if (
      email == "" ||
      password == "" ||
      email == undefined ||
      password == undefined ||
      email == null ||
      password == null
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all fields", status: "warning" });
    }
    //Check email is valid or not
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email", status: "warning" });
    }

    //Check password is valid or not
    if (req.body.password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        status: "warning",
      });
    }
    next();
  };

module.exports = router;
