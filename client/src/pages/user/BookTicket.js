// src/pages/BookTicket.js
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

const BookTicket = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState(1);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/bookings",
        { showId, seats, totalPrice: seats * 120 }, // fixed ₹120 for now
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking successful!");
      navigate("/bookings");
    } catch (err) {
      alert("Booking failed: " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Book Tickets</h2>
      <label>Seats: </label>
      <input
        type="number"
        min={1}
        value={seats}
        onChange={(e) => setSeats(parseInt(e.target.value))}
      /><br />
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
};

export default BookTicket;
