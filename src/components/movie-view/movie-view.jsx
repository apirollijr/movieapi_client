import { Link, useParams } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-view">
      <img src={movie.ImagePath} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
};
