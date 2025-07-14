// src/pages/ShowDetails.js
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";

const ShowDetails = () => {
  const { id } = useParams();  // movie ID
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await API.get(`/movies/${id}`);
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.language} | {movie.genre} | Duration: {movie.duration} mins</p>

      <h3>Showtimes:</h3>
      {movie.shows && movie.shows.map((show) => (
        <div key={show._id} style={{ border: "1px dashed #999", margin: "1rem" }}>
          <p>Theatre: {show.theatreId.name}</p>
          <p>Location: {show.theatreId.location}</p>
          <p>Date: {new Date(show.date).toLocaleDateString()}</p>
          <p>Time: {show.time}</p>
          <Link to={`/book/${show._id}`}>
            <button>Book Ticket</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShowDetails;
