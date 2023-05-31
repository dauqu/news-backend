const express = require("express");
const router = express.Router();
const PageSchema = require("../models/page_schema");
const slugify = require("slugify");

//Get all notifications
router.get("/", async (req, res) => {
  try {
    const pages = await PageSchema.find().lean();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add bookmark
router.post("/", (req, res) => {
  //Rename file with slug
  const title_slug = slugify(req.body.title, {
    replacement: "-",
    remove: /[*+~_()'"!:@]/g,
    lower: true,
  });

  const page = new PageSchema({
    title: req.body.title,
    slug: title_slug,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
  });
  try {
    page.save();
    res.status(201).json({
      message: "Page Added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Delete bookmark
router.delete("/:id", (req, res) => {
  PageSchema.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Page Deleted",
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
