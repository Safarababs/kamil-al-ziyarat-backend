const mongoose = require("mongoose");

const hadithSchema = new mongoose.Schema(
  {
    chapterNumber: {
      type: Number,
      required: true,
    },
    hadithNumber: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    bookName: {
      type: String,
      required: true,
    },
    raavi: {
      type: String,
      required: false,
    },
    mixedText: [
      {
        text: { type: String, required: true },
        color: { type: String, required: true },
        font: { type: String, required: true },
      },
    ],
    englishText: {
      type: String,
      required: true,
    },
    arabicText: {
      type: String,
      required: true,
    },
    redText: {
      type: String, // Added redText field
      required: false,
    },
  },
  { timestamps: true }
);

const Hadith = mongoose.model("Hadith", hadithSchema);

module.exports = Hadith;
