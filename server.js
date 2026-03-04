require("dotenv").config();
const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("AI Movie Insight Builder API Running");
});

// Routes
app.use("/api/movie", movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
