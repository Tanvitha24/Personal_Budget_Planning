// /routes/services.js
const express = require("express");
const router = express.Router();

// Services route
router.get("/", (req, res) => {
  res.render("services");
});

module.exports = router;
