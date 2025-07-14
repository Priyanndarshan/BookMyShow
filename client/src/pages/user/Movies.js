// src/pages/Movies.js
import { useEffect, useState } from "react";
import API from "../../services/api";
import MovieCard from "../../component/MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies");
        setMovies(res.data);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Available Movies</h1>
      <div className="card-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      {movies.length === 0 && (
        <div className="empty-state">
          <p>No movies available. Please add some movies as admin.</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
