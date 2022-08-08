const mongoose = require("mongoose");

//Schema
const ReportSchema = new mongoose.Schema({
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
    required: true,
  },
  releted_news: {
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

module.exports = mongoose.model("report", ReportSchema);
