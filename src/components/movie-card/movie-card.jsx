import './movie-card.scss';
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', cursor: 'pointer' }}>
      <h3>{movie.Title}</h3>
      <img src={movie.ImagePath} alt={movie.Title} width="150" />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
