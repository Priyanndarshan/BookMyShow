const express = require("express");
const router = express.Router();
const { addShow, getAllShows, getShowsByMovie } = require("../controllers/showController");

// Add new show
router.post("/shows", addShow);

// Get all shows
router.get("/shows", getAllShows);

// Get shows by movie id
router.get("/shows/movie/:movieId", getShowsByMovie);

module.exports = router; 