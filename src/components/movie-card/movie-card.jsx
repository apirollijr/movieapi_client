import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.ImagePath} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <Link to={`/movies/${movie._id}`} className="btn btn-primary">
        Open
      </Link>
    </div>
  );
};
