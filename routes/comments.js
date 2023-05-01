const express = require("express");
const router = express.Router();
const CheckAuth = require("./../functions/check_auth");

//Get comments
router.get("/:id", async (req, res) => {
  const newsid = req.params.id;

  try {
    //Get all comments by news id
    const comments = await CommentsSchema.find({ news_id: newsid }).populate(
      "user_id",
      "-password -email -phone -role"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add comment
router.post("/", async (req, res) => {
  const check = await CheckAuth(req, res);

  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", auth: false });
  }

  const comment = new CommentsSchema({
    comments: req.body.comments,
    user_id: check.data._id,
    news_id: req.body.news_id,
  });

  try {
    const result = await comment.save();
    res.status(201).json({
      message: "Comment added",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete comment
router.delete("/:id", async (req, res) => {
  const check = await CheckAuth(req, res);

  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", auth: false });
  }

  const commentid = req.params.id;

  try {
    //Delete comment by id
    const result = await CommentsSchema.deleteOne({
      _id: commentid,
      user_id: check.data._id,
    }).exec();
    res.status(200).json({
      message: "Comment deleted",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
