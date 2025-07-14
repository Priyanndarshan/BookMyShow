const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  },
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre"
  },
  date: String,  // or use Date type
  time: String
});

module.exports = mongoose.model("Show", showSchema);
