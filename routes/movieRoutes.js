const express = require("express");
const router = express.Router();
const { getMovieDetails } = require("../controllers/movieController");

// GET movie details using IMDb ID
router.get("/:id", getMovieDetails);

module.exports = router;