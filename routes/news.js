const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");
const slugify = require("slugify");
//JWT authentication
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Get all news
router.get("/", async (req, res) => {
  try {
    const news = await NewsSchema.find().lean();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one news
router.get("/:id", async (req, res) => {
  try {
    const news = await NewsSchema.findById(req.params.id).lean();

    if (!news) {
      return res
        .status(404)
        .json({ message: "News not found", status: "error" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get news by category
router.get("/category/:category", async (req, res) => {
  try {
    const news = await NewsSchema.find({
      category: req.params.category,
    }).lean();

    if (!news) {
      return res
        .status(404)
        .json({ message: "News not found", status: "error" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create One
router.post("/", async (req, res) => {
  //Create Slug with filter to remove special characters
  const slug = slugify(req.body.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  //Check user have token or not
  const token = req.body.token;

  if (token == undefined || token == null || token == "") {
    return res.json(false);
  }

  const have_valid_tokem = jwt.verify(token, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });

  if (!have_valid_tokem) {
    return res.json(false);  
  }

  console.log(have_valid_tokem);

  // const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const news = new NewsSchema({
    title: req.body.title,
    articles: req.body.articles,
    slug: slug,
    image: req.body.image,
    category: req.body.category,
    publisher: have_valid_tokem.username,
    read_more: req.body.read_more,
    is_published: false,
  });
  try {
    await news.save();
    res
      .status(201)
      .json({ message: "News created successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Update One
router.patch("/:id", async (req, res) => {
  try {
    const news = await NewsSchema.findById(req.params.id);

    if (!news) {
      return res
        .status(404)
        .json({ message: "News not found", status: "error" });
    }

    news.title = req.body.title;
    news.description = req.body.description;
    news.image = req.body.image;
    await news.save();
    res
      .status(200)
      .json({ message: "News updated successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  try {
    const news = await NewsSchema.findById(req.params.id);
    if (!news) {
      return res
        .status(404)
        .json({ message: "News not found", status: "error" });
    }

    await news.remove();
    res
      .status(200)
      .json({ message: "News deleted successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
