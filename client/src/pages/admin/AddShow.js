import { useEffect, useState } from "react";
import API from "../../services/api";

const AddShow = () => {
  const [form, setForm] = useState({
    movieId: "", theatreId: "", date: "", time: ""
  });
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, theatresRes] = await Promise.all([
          API.get("/movies"),
          API.get("/theatres")
        ]);
        setMovies(moviesRes.data);
        setTheatres(theatresRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  // Admin access control - moved after hooks
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="admin-container">
        <div className="access-denied">Access Denied - Please login</div>
      </div>
    );
  }
  
  const userEmail = JSON.parse(atob(token.split(".")[1])).email;
  if (userEmail !== "priyan@example.com") {
    return (
      <div className="admin-container">
        <div className="access-denied">Access Denied</div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    
    try {
      await API.post("/shows", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Show added successfully!");
      setForm({ movieId: "", theatreId: "", date: "", time: "" });
    } catch (err) {
      setSuccess("Failed to add show: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2 className="admin-title">Add New Show</h2>
        {success && (
          <div className={`admin-message ${success.includes("successfully") ? "admin-success" : "admin-error"}`}>
            {success}
          </div>
        )}
        
        <select 
          className="admin-select"
          value={form.movieId}
          onChange={(e) => setForm({ ...form, movieId: e.target.value })}
          required
        >
          <option value="">Select Movie</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id}>{m.title}</option>
          ))}
        </select>
        
        <select 
          className="admin-select"
          value={form.theatreId}
          onChange={(e) => setForm({ ...form, theatreId: e.target.value })}
          required
        >
          <option value="">Select Theatre</option>
          {theatres.map((t) => (
            <option key={t._id} value={t._id}>{t.name} ({t.location})</option>
          ))}
        </select>
        
        <input
          type="date"
          className="admin-input"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        
        <input
          type="time"
          className="admin-input"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        
        <button type="submit" className="admin-button" disabled={loading}>
          {loading ? "Adding Show..." : "Add Show"}
        </button>
      </form>
    </div>
  );
};

export default AddShow;
