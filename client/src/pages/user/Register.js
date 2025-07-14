// Import the useState hook from React to manage component state
import { useState } from "react";
// Import the API service to make HTTP requests to the backend
import API from "../../services/api";
// Import useNavigate hook from react-router-dom to handle navigation between pages
import { useNavigate } from "react-router-dom";

// Define the Register component as a functional component
const Register = () => {
  // Initialize state for form data with empty values for name, email, and password
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  // Initialize loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Get the navigate function to redirect users to different pages
  const navigate = useNavigate();

  // Define an async function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();
    // Set loading to true and clear previous errors
    setLoading(true);
    setError("");
    
    // Wrap the registration logic in a try-catch block to handle errors
    try {
      // Send a POST request to the /register endpoint with the form data to register the user
      await API.post("/register", form);
      // Show an alert to the user indicating successful registration
      alert("Registered successfully!");
      // Redirect the user to the login page after successful registration
      navigate("/login");
    } catch (err) {
      // If registration fails, show an alert with the error message from the server
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      // Set loading to false after the registration attempt is complete
      setLoading(false);
    }
  };

  // Return the JSX form element with onSubmit event handler
  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        {/* Display the form title */}
        <h2 className="form-title">Register</h2>
        {/* Display error message if registration fails */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Create an input field for the user's name */}
        <input
          type="text"
          className="form-input"
          // Set placeholder text to guide the user
          placeholder="Name"
          // Bind the input value to the name field in the form state
          value={form.name}
          // Update the name field in form state when input changes
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          // Add required attribute for validation
          required
        />
        
        {/* Create an input field for the user's email */}
        <input
          type="email"
          className="form-input"
          // Set placeholder text to guide the user
          placeholder="Email"
          // Bind the input value to the email field in the form state
          value={form.email}
          // Update the email field in form state when input changes
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          // Add required attribute for validation
          required
        />
        
        {/* Create a password input field for the user's password */}
        <input
          type="password"
          className="form-input"
          // Set input type to password to hide the entered text
          placeholder="Password"
          // Bind the input value to the password field in the form state
          value={form.password}
          // Update the password field in form state when input changes
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          // Add required attribute for validation
          required
        />
        
        {/* Create a submit button to trigger form submission */}
        <button type="submit" className="form-button" disabled={loading}>
          {/* Display loading text if registration is in progress */}
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

// Export the Register component as the default export so it can be imported elsewhere
export default Register;
