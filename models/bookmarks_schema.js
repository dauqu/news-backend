const mongoose = require("mongoose");

//Schema
const BookmarksSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref: "users",
    },
    news_id: {
      type: String,
      required: true,
      ref: "news",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookmarks", BookmarksSchema);
