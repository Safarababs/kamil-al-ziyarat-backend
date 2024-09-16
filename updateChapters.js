const mongoose = require("mongoose");
const Chapter = require("./models/Chapter"); // Ensure the path to your model is correct

mongoose
  .connect(
    "mongodb+srv://safar-admin:sn5125a1@mflix.zags8.mongodb.net/kamil-al-ziyarat?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const chapters = [
  {
    number: 1,
    name: "رسول خدا، امیر المومنین ، امام حسن اور امام حسین کی زیارتوں کا ثواب",
  },
  { number: 2, name: "زیارت رسول خدا کا ثواب ." },
  { number: 3, name: "زیارت رسول خدا اور وہاں کی دعا ئیں ." },
  { number: 4, name: "مسجد النبی میں نماز پڑھنے کی فضیلت ." },
  { number: 5, name: "حضرت حمزہ اور دیگر شہداء کی زیارت ." },
  {
    number: 6,
    name: "مدینہ کے مشاہدہ مشرفہ کی فضیلت اور ان کی زیارتوں کا ثواب .",
  },
  { number: 7, name: "قبر رسول خدا سے وداع ." },
  {
    number: 8,
    name: "مسجد کوفہ اور مسجد سہلہ میں نماز پڑھنے کی فضیلت اور اس کا ثواب .",
  },
  { number: 9, name: "قبر امیر المومنین ." },
  { number: 10, name: "امیر المومنین کی زیارت کا ثواب ." },
  { number: 11, name: "زیارت امیر المومنین ، اس کا طریقہ اور وہاں کی دعا ." },
  { number: 12, name: "ذکر وداع قبر امیر المومنین ." },
  { number: 13, name: "آب فرات کے پینے اور اس سے غسل کرنے کی فضیلت ." },
  { number: 14, name: "امام حسن اور امام حسین سے رسول خدا کی محبت ." },
];

// npm run update-chapters

const updateChapters = async () => {
  try {
    for (const chapter of chapters) {
      await Chapter.updateOne(
        { number: chapter.number },
        { name: chapter.name }
      );
      console.log(`Updated chapter ${chapter.number}`);
    }
  } catch (error) {
    console.error("Error updating chapters:", error);
  } finally {
    mongoose.connection.close();
  }
};

updateChapters();
