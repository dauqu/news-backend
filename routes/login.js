const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users_schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

//User Login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UsersSchema.findOne({ email }).lean();
    if (!user)
      return res
        .status(400)
        .json({ message: "User and password is wrong.", status: "warning" });
    const hashpass = user.password;
    if (!bcrypt.compareSync(password, hashpass))
      return res
        .status(400)
        .json({ message: "User and password is wrong.", status: "warning" });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
      }
    );

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    //Set cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    }); //30 days

    //Set LocalStorage
    res.locals.user = {
      id: user._id,
      username: user.username,
    };

    res.status(200).json({ message: "Login Successful", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Check User is login or not
router.get("/check-login", async (req, res) => {
  try {
    const token = req.cookies.auth_token;

    const have_valid_tokem = jwt.verify(token, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    const id_from_token = have_valid_tokem.id;

    //Check Same id have database
    const user = await UsersSchema.findOne({ id_from_token }).lean();

    if (user == undefined) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
});

module.exports = router;
