const mongoose = require("mongoose");

//Schema
const NotificationsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date, 
        default: Date.now,
        immutable: true,
    },
});

module.exports = mongoose.model("notifications", NotificationsSchema);
