const express = require("express");
const router = express.Router();
const BookmarksSchema = require("../models/bookmarks_schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//Get bookmarks
router.get("/", async (req, res) => {

  const token = req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];

  if (token === undefined || token === null || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const bookmarks = await BookmarksSchema.find({ user_id: decoded.id });
    res.status(200).json(bookmarks);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add bookmark
router.post("/", (req, res) => {
  const token = req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];

  if (token === undefined || token === null || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //Check if bookmark already exists
  const bootkmarks = BookmarksSchema.findOne({ user_id: decoded.id, news_id: req.body.news_id });

  if (bootkmarks) {
    return res.status(400).json({ message: "Bookmark already exists" });
  }

  const bookmark = new BookmarksSchema({
    user_id: decoded.id,
    news_id: req.body.news_id,
  });
  bookmark
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Bookmark added",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

//Delete bookmark
router.delete("/:id", (req, res) => {
  BookmarksSchema.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Bookmark deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

module.exports = router;
