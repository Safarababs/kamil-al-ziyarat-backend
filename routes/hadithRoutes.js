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

// Add a new hadith
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

// Update a hadith by ID
router.put("/update-hadith/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log("Received ID:", id);
  console.log("Received update data:", updateData); // Log the incoming data

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "No update data provided" });
  }

  try {
    const updatedHadith = await Hadith.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensures that the update adheres to schema validation
    });

    if (!updatedHadith) {
      return res.status(404).json({ message: "Hadith not found" });
    }
    res.json(updatedHadith);
  } catch (error) {
    console.error("Error updating Hadith:", error); // Log the actual error
    res
      .status(500)
      .json({ message: "Error updating Hadith", error: error.message });
  }
});

// DELETE a hadith by ID
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
