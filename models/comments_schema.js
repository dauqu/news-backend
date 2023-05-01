const mongoose = require("mongoose");

//Schema
const CommentsSchema = new mongoose.Schema(
  {
    comments: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    news_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", CommentsSchema);
