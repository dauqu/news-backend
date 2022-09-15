const express = require("express");
const router = express.Router();

//Send about page
router.get("/", (req, res) => {
  res.send("about");
});

module.exports = router;
