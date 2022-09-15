const express = require("express");
const router = express.Router();
const BookmarksSchema = require("../models/bookmarks_schema");

//Get bookmarks
router.get("/", (req, res) => {
  BookmarksSchema.find({ user_id: req.cookies.user_id })
    .then((bookmarks) => {
      res.json(bookmarks);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//Add bookmark
router.post("/", (req, res) => {
  const bookmark = new BookmarksSchema({
    user_id: req.cookies.user_id,
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
