const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");
const User_Model = require("../models/users_schema");


router.get("/", async (req, res) => {
    try {
        res.status(200).json({ message: "Hello World" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;