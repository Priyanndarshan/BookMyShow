// src/components/MovieCard.js
// Import the Link component from react-router-dom to enable navigation between pages
import { Link } from "react-router-dom";

// Define a functional component called MovieCard that accepts a movie prop
// This component displays individual movie information in a card format
const MovieCard = ({ movie }) => {
  // Return JSX that creates a card container with styling
  // The style object applies a border, padding, and margin for visual separation
  return (
    <div className="card">
      <h3 className="card-title">{movie.title}</h3>
      <p className="card-text"><strong>Language:</strong> {movie.language}</p>
      <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
      <p className="card-text"><strong>Duration:</strong> {movie.duration} minutes</p>
      <Link to={`/movies/${movie._id}`} className="card-button">
        View Showtimes
      </Link>
    </div>
  );
};

// Export the MovieCard component as the default export so it can be imported in other files
export default MovieCard;
