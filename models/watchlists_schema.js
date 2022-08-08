const mongoose = require("mongoose");

//Schema
const WatchlistsSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("watchlists", WatchlistsSchema);
