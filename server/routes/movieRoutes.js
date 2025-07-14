const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Routes
router.post("/movies", movieController.addMovie);         // admin only
router.get("/movies", movieController.getAllMovies);      // public
router.get("/movies/:id", movieController.getMovieWithShows);  // public
router.post("/shows", movieController.addShow);           // admin only

module.exports = router;
