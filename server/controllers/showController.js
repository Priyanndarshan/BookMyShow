const Show = require("../models/Show");

// Add a new show
const addShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all shows
const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get shows by movie id
const getShowsByMovie = async (req, res) => {
  try {
    const shows = await Show.find({ movieId: req.params.movieId });
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addShow, getAllShows, getShowsByMovie }; 