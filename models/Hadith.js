const mongoose = require("mongoose");

// Define the Hadith schema
const hadithSchema = new mongoose.Schema({
  chapterNumber: { type: Number, required: true },
  hadithNumber: { type: Number, required: true },
  user: { type: String, required: true },
  bookName: { type: String, required: true },
  raavi: { type: String, required: true },
  arabicText: { type: String, required: true },
  blackTextOne: { type: String, required: true },
  blackTextTwo: { type: String, default: "اَبُوالقَاسم جَعفر" }, // Default value for raavi
  englishText: { type: String, required: true },
});

// Export the Hadith model
module.exports = mongoose.model("Hadith", hadithSchema);
