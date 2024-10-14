const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const hadithRoutes = require("./routes/hadithRoutes");
const chapterRoutes = require("./routes/chapterRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://kamil-al-ziyarat.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api", hadithRoutes); // Ensure '/api' matches the route in frontend fetch
app.use("/api", chapterRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://safar-admin:sn5125a1@mflix.zags8.mongodb.net/kamil-al-ziyarat?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
