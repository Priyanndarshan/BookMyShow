import { useState } from "react";
import API from "../../services/api";

const AddMovie = () => {
  const [form, setForm] = useState({
    title: "", genre: "", language: "", duration: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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
      await API.post("/movies", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Movie added successfully!");
      setForm({ title: "", genre: "", language: "", duration: "" });
    } catch (err) {
      setSuccess("Failed to add movie: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2 className="admin-title">Add New Movie</h2>
        {success && (
          <div className={`admin-message ${success.includes("successfully") ? "admin-success" : "admin-error"}`}>
            {success}
          </div>
        )}
        
        <input
          type="text"
          className="admin-input"
          placeholder="Movie Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        
        <input
          type="text"
          className="admin-input"
          placeholder="Genre (e.g., Action, Drama, Comedy)"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          required
        />
        
        <input
          type="text"
          className="admin-input"
          placeholder="Language (e.g., English, Hindi)"
          value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value })}
          required
        />
        
        <input
          type="number"
          className="admin-input"
          placeholder="Duration in minutes"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />
        
        <button type="submit" className="admin-button" disabled={loading}>
          {loading ? "Adding Movie..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
