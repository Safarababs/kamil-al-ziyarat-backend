const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Chapter", chapterSchema);
