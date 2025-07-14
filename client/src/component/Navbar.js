// src/components/Navbar.js
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Check if user is admin
  const isAdmin = () => {
    if (!token) return false;
    try {
      const userEmail = JSON.parse(atob(token.split(".")[1])).email;
      return userEmail === "priyan@example.com";
    } catch (error) {
      return false;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <Link to="/" className="navbar-brand">
            BookMyShow
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Movies</Link>
          
          {token ? (
            <>
              <Link to="/bookings" className="navbar-link">My Bookings</Link>
              {isAdmin() && (
                <>
                  <Link to="/admin/add-movie" className="navbar-link">Add Movie</Link>
                  <Link to="/admin/add-theatre" className="navbar-link">Add Theatre</Link>
                  <Link to="/admin/add-show" className="navbar-link">Add Show</Link>
                </>
              )}
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
