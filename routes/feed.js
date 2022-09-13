const express = require("express");
const router = express.Router();
const NewsSchema = require("../models/news_schema");
const UsersSchema = require("../models/users_schema");

//Get all news
router.get("/", async (req, res) => {
  try {
    const news = await NewsSchema.find({
      is_published: true,
    }).lean();

    //Get user details
    const user = await UsersSchema.find({
      username: "harshaweb",
    }).lean();

    //Map news with user details
    const newsWithUser = news.map((item) => {
      return {
        _id: item._id,
        title: item.title,
        slug: item.slug,
        image: item.image,
        category: item.category,
        created_at: item.created_at,
        publisher: {
          full_name: user[0].full_name,
          title: user[0].title,
          dp: user[0].dp,
        },
      };
    });

    res.status(200).json(newsWithUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
