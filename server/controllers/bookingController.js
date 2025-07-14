const Booking = require("../models/Booking");

// POST /api/bookings
exports.bookTickets = async (req, res) => {
  const { showId, seats, totalPrice } = req.body;
  const userId = req.user.email; // Comes from authMiddleware

  try {
    // For now, we'll treat seats as a count, not specific seat numbers
    // In a real app, you'd want to track specific seat numbers
    const existingBookings = await Booking.find({ showId });
    const totalBookedSeats = existingBookings.reduce((sum, booking) => sum + booking.seats, 0);
    
    // Assuming 100 total seats per show (you can make this configurable)
    const totalSeats = 100;
    const availableSeats = totalSeats - totalBookedSeats;
    
    if (seats > availableSeats) {
      return res.status(400).json({ message: `Only ${availableSeats} seats available.` });
    }

    // Save booking
    const newBooking = await Booking.create({
      userId,
      showId,
      seats,
      totalPrice,
      paymentStatus: "paid" // or keep as "pending" if integrating payment later
    });

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.email })
      .populate("showId")
      .populate("userId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
