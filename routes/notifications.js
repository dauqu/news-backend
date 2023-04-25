const express = require("express");
const router = express.Router();
const NotificationsSchema = require("../models/notifications_schema");


//Get all notifications
router.get("/", async (req, res) => {
    try {
        const notifications = await NotificationsSchema.find().lean();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Add bookmark
router.post("/", (req, res) => {
    const notification = new NotificationsSchema({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
    });
    try {
        notification.save();
        res.status(201).json({
            message: "Notification added",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


//Delete bookmark
router.delete("/:id", (req, res) => {
    BookmarksSchema.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(200).json({
                message: "Bookmark deleted",
                result: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
});

module.exports = router;
