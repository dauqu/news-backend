const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users_schema");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

router.post("/", validateRegister, async (req, res) => {
  //Hash password
  const hashed_password = await bcrypt.hash(req.body.password, 10);

  //Save user to database
  const save_user = new UsersSchema({
    full_name: req.body.full_name,
    avator: req.body.avator,
    title: req.body.title,
    about: req.body.about,
    phone: req.body.phone,
    email: req.body.email,
    username: req.body.username,
    password: hashed_password,
  });
  try {
    await save_user.save();
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Middleware for register validation
async function validateRegister(req, res, next) {
  //Check if user exists
  const user = await UsersSchema.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({
      message: "User already exists",
      status: "error",
    });

  //Check email is valid
  const email = req.body.email;
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email_regex.test(email))
    return res.status(400).json({
      message: "Email is not valid",
      status: "error",
    });

  //Check Username is valid
  const username = req.body.username;
  const username_regex = /^[a-zA-Z0-9]+$/;
  if (!username_regex.test(username))
    return res.status(400).json({
      message: "Username is not valid",
      status: "error",
    });

  //Check username is unique
  const user_exists = await UsersSchema.findOne({ username: username });
  if (user_exists)
    return res.status(400).json({
      message: "Username is not unique",
      status: "error",
    });

  next();
}

module.exports = router;
