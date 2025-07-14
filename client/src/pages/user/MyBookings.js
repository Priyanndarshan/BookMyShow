// src/pages/MyBookings.js
import { useEffect, useState } from "react";
import API from "../../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get("/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id} style={{ margin: "1rem", border: "1px solid gray" }}>
          <p>Show: {b.showId.time} on {new Date(b.showId.date).toLocaleDateString()}</p>
          <p>Theatre: {b.showId.theatreId.name}</p>
          <p>Seats: {b.seats}</p>
          <p>Total: ₹{b.totalPrice}</p>
          <p>Status: {b.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
