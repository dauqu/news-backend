const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");
const slugify = require("slugify");
//JWT authentication
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CheckAuth = require("./../functions/check_auth");

//Get all news
router.get("/", async (req, res) => {
  //Get all latest news 50 news
  try {
    const news = await NewsSchema.find().sort({ _id: -1 }).limit(100).populate({ path: "publisher", select: "-password -email -phone -role" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all news
router.get("/pages/:page", async (req, res) => {
  const page = req.params.page;
  //Each page will have 10 news
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    //Get all news with publisher name
    const news = await NewsSchema.find({ published: true })
      .populate("publisher", "name")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one news
// router.get("/:id", async (req, res) => {
//   try {
//     const news = await NewsSchema.findById(req.params.id).lean().populate({ path: "publisher", select: "-password -email -phone -role" });

//     if (!news) {
//       return res
//         .status(404)
//         .json({ message: "News not found", status: "error" });
//     }
//     res.status(200).json(news);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const news = await NewsSchema.findById(req.params.id).populate({ path: "publisher", select: "-password -email -phone -role" });

    if (!news) {
      return res
        .status(404)
        .json({ message: "News not found", status: "error" });
    }

    // Add a description field if it does not exist
    if (!news.description) {
      news.description = "This news article does not have a description.";
    }

    //Add views if it does not exist
    if (!news.views) {
      news.views = 0;
    }

    // Increment the view count by 1
    news.views += 1;
    await news.save();

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




//Get news by category
router.get("/category/:category", async (req, res) => {
  //Get param from url
  const category = req.params.category;

  //find news by category
  try {
    const news = await NewsSchema.find({
      category: category,
    })
      .lean()
      .sort({ _id: -1 })
      .limit(100);

    if (news.length === 0) {
      //Return null if no news found
      return res.status(200).json(null);
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

  const check = await CheckAuth(req, res);

  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", auth: false });
  }

  // const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const news = new NewsSchema({
    title: req.body.title,
    articles: req.body.articles,
    keywords: req.body.keywords,
    tags: req.body.tags,
    description: req.body.description,
    slug: slug,
    image: req.body.image,
    category: req.body.category,
    publisher: check.data._id,
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
