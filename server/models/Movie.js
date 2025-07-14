const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  language: String,
  duration: Number
});

module.exports = mongoose.model("Movie", movieSchema);
