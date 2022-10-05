const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();


router.get("/", async (req, res) => {
    const token = req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];

    if (token === undefined || token === null || token === "") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const news = await NewsSchema.find({ user_id: decoded.id });
        res.status(200).json(news);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get all news
module.exports = router;