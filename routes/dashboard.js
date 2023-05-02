const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");
const User_Model = require("../models/users_schema");
const NotificationsSchema = require("../models/notifications_schema");
const BookmarksSchema = require("../models/bookmarks_schema");
const CategoriesSchema = require("./../models/categories_schema");
const fs = require("fs");

//Count users
router.get("/users", async (req, res) => {
  try {
    const users = await User_Model.countDocuments();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Count users by status
router.get("/users/:status", async (req, res) => {
  try {
    const users = await User_Model.countDocuments({
      status: req.params.status,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Count news
router.get("/news", async (req, res) => {
  try {
    const news = await NewsSchema.countDocuments();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Count news by status
router.get("/news/:status", async (req, res) => {
  try {
    const news = await NewsSchema.countDocuments({ status: req.params.status });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Count notifications
router.get("/notifications", async (req, res) => {
  try {
    const notifications = await NotificationsSchema.countDocuments();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Count bookmarks
router.get("/bookmarks", async (req, res) => {
  try {
    const bookmarks = await BookmarksSchema.countDocuments();
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Count categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await CategoriesSchema.countDocuments();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Count files in uploads folder
router.get("/uploads", async (req, res) => {
  try {
    const uploads = fs.readdirSync("./uploads").length;
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
