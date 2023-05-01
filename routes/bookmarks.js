const express = require("express");
const router = express.Router();
const BookmarksSchema = require("../models/bookmarks_schema");
require("dotenv").config();
const CheckAuth = require("./../functions/check_auth");

//Get bookmarks
router.get("/", async (req, res) => {
  const check = await CheckAuth(req, res);

  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", auth: false });
  }

  try {
    const bookmarks = await BookmarksSchema.find({ user_id: check.data._id }).populate("news_id");
    //CHeck if user has bookmarks
    if (bookmarks.length === 0) {
      //Return null
      return res.status(200).json(null);
    } else {
      res.status(200).json(bookmarks);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add bookmark
router.post("/", async (req, res) => {
  const check = await CheckAuth(req, res);

  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", auth: false });
  }

  //Check if bookmark already exists
  const bookmarks = await BookmarksSchema.findOne({
    user_id: check.data._id,
    news_id: req.body.news_id,
  }).exec();

  //Check if bookmark already exists
  if (bookmarks) {
    return res.status(409).json({ message: "Bookmark already exists" });
  }

  const bookmark = new BookmarksSchema({
    user_id: check.data._id,
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
      let message = "";
      switch (err.code) {
        case 11000:
          message = "Bookmark already exists";
          break;
        default:
          message = "Error saving bookmark";
      }
      res.status(500).json({
        message: message,
      });
    });
});

//Delete bookmark
router.delete("/:id", async (req, res) => {
  const check = await CheckAuth(req, res);

  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", auth: false });
  }

  const bookmarks = await BookmarksSchema.findOne({
    _id: req.params.id,
  }).exec();

  if (!bookmarks) {
    return res.status(404).json({ message: "Bookmark not found" });
  }

  if (bookmarks.user_id != check.data._id) {
    return res.status(403).json({ message: "Not created by you" });
  }

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
