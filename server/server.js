const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: './env.example' });

const app = express();
app.use(cors());
app.use(express.json());

// Routes 
const authRoutes = require("./routes/authRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api", authRoutes);
app.use("/api", theatreRoutes);
app.use("/api", movieRoutes);
app.use("/api", showRoutes);
app.use("/api", bookingRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB error", err));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
