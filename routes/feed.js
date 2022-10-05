const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");
const User_Model = require("../models/users_schema");

router.get("/", async (req, res) => {
  try {
    //Get all news with publisher name
    const news = await NewsSchema.find().populate("publisher", "name");
    res.status(200).json(news);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all news
router.get("/today", async (req, res) => {
  try {
    //Find News by latest date and news is published
    const news = await NewsSchema.find({ date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }, published: true });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
