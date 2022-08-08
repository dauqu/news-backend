const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users_schema");
const jwt = require("jsonwebtoken");

//Get Profile
router.post("/", async (req, res) => {

  if (req.cookies.auth_token === undefined || req.cookies.auth_token === null || req.cookies.auth_token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.cookies.auth_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await UsersSchema.findById(decoded.id).lean();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
