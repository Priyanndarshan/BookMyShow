const Movie = require("../models/Movie");
const Show = require("../models/Show");
const Theatre = require("../models/Theatre");

// POST /api/movies
exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/movies
exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

// GET /api/movies/:id → Get Movie Details + Shows
exports.getMovieWithShows = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const shows = await Show.find({ movieId: movie._id }).populate("theatreId");
    res.json({ ...movie.toObject(), shows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/shows
exports.addShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
