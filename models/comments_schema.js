const mongoose = require("mongoose");

//Schema
const CommentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("comments", CommentsSchema);
