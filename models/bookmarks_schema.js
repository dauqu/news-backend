const mongoose = require("mongoose");

//Schema
const BookmarksSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    news_id: {
        type: String,
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

module.exports = mongoose.model("bookmarks", BookmarksSchema);
