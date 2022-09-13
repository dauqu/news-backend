const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");
const UsersSchema = require("../models/users_schema");

//Get all news
router.get("/", async (req, res) => {
    try {
        const news = await NewsSchema.find().lean();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;