const express = require("express");
const router = express.Router();
const Chapter = require("../models/Chapter");

// Get all chapters
router.get("/get-chapters", async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.json(chapters);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
