const express = require("express");
const router = express.Router();
const Theatre = require("../models/Theatre");

// Add new theatre
router.post("/theatres", async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);
    res.status(201).json(theatre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all theatres
router.get("/theatres", async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
