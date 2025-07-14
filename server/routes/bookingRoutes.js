const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { bookTickets, getUserBookings } = require("../controllers/bookingController");

router.post("/bookings", authMiddleware, bookTickets);
router.get("/bookings", authMiddleware, getUserBookings);

module.exports = router;
