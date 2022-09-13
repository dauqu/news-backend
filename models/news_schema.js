const mongoose = require("mongoose");

//Schema
const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  articles: {
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
  },
  is_published: {
    type: Boolean,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("news", NewsSchema);
