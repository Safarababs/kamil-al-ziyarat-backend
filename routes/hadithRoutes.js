const express = require("express");
const router = express.Router();
const Hadith = require("../models/Hadith");

// Get hadiths by chapter number
router.get("/get-hadiths", async (req, res) => {
  const { chapterNumber } = req.query;

  if (!chapterNumber) {
    return res.status(400).send("Chapter number is required");
  }

  try {
    const hadiths = await Hadith.find({
      chapterNumber: parseInt(chapterNumber, 10),
    });
    res.json(hadiths);
  } catch (error) {
    console.error("Error fetching hadiths:", error);
    res.status(500).send("Server error");
  }
});

router.post("/add-hadith", async (req, res) => {
  try {
    const hadith = new Hadith(req.body);
    await hadith.save();
    res.status(201).json(hadith);
  } catch (error) {
    console.error("Error adding Hadith:", error);
    res.status(500).json({ message: "Failed to add Hadith" });
  }
});

module.exports = router;
