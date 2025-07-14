// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Movies from "./pages/user/Movies";
import ShowDetails from "./pages/user/ShowDetails";
import BookTicket from "./pages/user/BookTicket";
import MyBookings from "./pages/user/MyBookings";
import Navbar from "./component/Navbar";
import PrivateRoute from "./component/PrivateRoute";
import AddMovie from "./pages/admin/AddMovie";
import AddTheatre from "./pages/admin/AddTheatre";
import AddShow from "./pages/admin/AddShow";

// Import CSS files
import "./styles/Global.css";
import "./styles/Navbar.css";
import "./styles/Forms.css";
import "./styles/Cards.css";
import "./styles/Admin.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<ShowDetails />} />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/book/:showId"
          element={
            <PrivateRoute>
              <BookTicket />
            </PrivateRoute>
          }
        />
        <Route path="/admin/add-movie" element={<AddMovie />} />
        <Route path="/admin/add-theatre" element={<AddTheatre />} />
        <Route path="/admin/add-show" element={<AddShow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
