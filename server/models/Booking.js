const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show"
  },
  seats: Number,  // Number of seats booked
  totalPrice: Number,
  paymentStatus: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
