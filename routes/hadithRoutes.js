const express = require("express");
const router = express.Router();
const Hadith = require("../models/Hadith");

// Get hadiths by chapter number and hadith number
router.get("/get-hadith/:chapterNumber/:hadithNumber", async (req, res) => {
  const { chapterNumber, hadithNumber } = req.params;

  console.log(
    `Fetching Hadith with Chapter: ${chapterNumber}, Number: ${hadithNumber}`
  );

  try {
    // Ensure chapterNumber is an integer
    const chapterNum = parseInt(chapterNumber, 10);
    const hadithNum = hadithNumber.trim(); // Trim any whitespace

    console.log(
      `Parsed Chapter Number: ${chapterNum} (Type: ${typeof chapterNum})`
    );
    console.log(
      `Parsed Hadith Number: "${hadithNum}" (Type: ${typeof hadithNum})`
    );

    // Querying with exact match
    const query = {
      chapterNumber: chapterNum,
      hadithNumber: hadithNum, // Exact match
    };

    console.log("Querying with:", JSON.stringify(query));

    const hadith = await Hadith.findOne(query);

    if (!hadith) {
      console.log(
        `No hadith found for Chapter: ${chapterNum}, Hadith: "${hadithNum}"`
      );
      return res.status(404).send("Hadith not found");
    }

    console.log("Fetched Hadith:", hadith);
    res.json(hadith);
  } catch (error) {
    console.error("Error fetching hadith:", error);
    res.status(500).send("Server error");
  }
});

// Get all hadiths
router.get("/get-all-hadiths", async (req, res) => {
  try {
    const hadiths = await Hadith.find({});
    res.json(hadiths);
  } catch (error) {
    console.error("Error fetching hadiths:", error);
    res.status(500).send("Server error");
  }
});

// Add a new hadith
// Add a new hadith
router.post("/add-hadith", async (req, res) => {
  try {
    const hadith = new Hadith(req.body);
    await hadith.save();
    res.status(201).json(hadith);
  } catch (error) {
    console.error("Error adding Hadith:", error);
    res
      .status(400)
      .json({ message: "Failed to add Hadith", error: error.message });
  }
});

router.put("/update-hadith/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "No update data provided" });
  }

  try {
    const updatedHadith = await Hadith.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedHadith) {
      return res.status(404).json({ message: "Hadith not found" });
    }
    res.json(updatedHadith);
  } catch (error) {
    console.error("Error updating Hadith:", error);
    res
      .status(500)
      .json({ message: "Error updating Hadith", error: error.message });
  }
});

// DELETE a hadith by ID
router.delete("/delete-hadith/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHadith = await Hadith.findByIdAndDelete(id);

    if (!deletedHadith) {
      console.log(`Hadith with ID ${id} not found.`);
      return res.status(404).json({ message: "Hadith not found" });
    }

    console.log(`Hadith with ID ${id} deleted successfully.`);
    res.status(200).json({ message: "Hadith deleted successfully" });
  } catch (error) {
    console.error("Error deleting Hadith:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
