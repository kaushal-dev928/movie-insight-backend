const axios = require("axios");

function analyzeSentiment(movie) {
  const rating = parseFloat(movie.imdbRating) || 0;

  let sentiment = "Positive";

  if (rating < 6) sentiment = "Negative";
  else if (rating >= 6 && rating < 7.5) sentiment = "Mixed";

  const mainActor = movie.Actors ? movie.Actors.split(",")[0] : "Unknown actor";

  const aiSummary = `
Based on an IMDb rating of ${rating}, audience reception appears ${sentiment}.
The film stars ${mainActor} and was released in ${movie.Year}.
Overall, viewers describe the movie as delivering a ${sentiment.toLowerCase()} cinematic experience.
`;

  return { sentiment, aiSummary };
}

exports.getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.id;

    if (!movieId) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${process.env.OMDB_API_KEY}`;

    const response = await axios.get(url);

    const movie = response.data;

    if (movie.Response === "False") {
      return res.status(404).json({ message: movie.Error });
    }

    const { sentiment, aiSummary } = analyzeSentiment(movie);

    res.status(200).json({
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      rating: movie.imdbRating,
      plot: movie.Plot,
      cast: movie.Actors,
      sentiment,
      aiSummary,
    });
  } catch (error) {
    console.error("Movie API error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
