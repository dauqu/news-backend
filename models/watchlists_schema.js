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
}, {
  timestamps: true,
});

module.exports = mongoose.model("watchlists", WatchlistsSchema);
