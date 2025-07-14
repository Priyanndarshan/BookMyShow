import { useState } from "react";
import API from "../../services/api";

const AddTheatre = () => {
  const [form, setForm] = useState({ name: "", location: "" });
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
      await API.post("/theatres", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Theatre added successfully!");
      setForm({ name: "", location: "" });
    } catch (err) {
      setSuccess("Failed to add theatre: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2 className="admin-title">Add New Theatre</h2>
        {success && (
          <div className={`admin-message ${success.includes("successfully") ? "admin-success" : "admin-error"}`}>
            {success}
          </div>
        )}
        
        <input
          type="text"
          className="admin-input"
          placeholder="Theatre Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        
        <input
          type="text"
          className="admin-input"
          placeholder="Location (e.g., Mumbai, Delhi)"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        
        <button type="submit" className="admin-button" disabled={loading}>
          {loading ? "Adding Theatre..." : "Add Theatre"}
        </button>
      </form>
    </div>
  );
};

export default AddTheatre;
