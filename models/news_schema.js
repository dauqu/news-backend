const mongoose = require("mongoose");

//Schema
const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    articles: {
      type: String,
      required: true,
    },
    keywords: {
      type: Array,
      required: true,
    },
    tags: {
      type: Array,
    },
    image: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    read_more: {
      type: String,
    },
    language: {
      type: String,
      required: true,
      default: "en",
    },
    is_published: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("news", NewsSchema);
