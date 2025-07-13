import './main-view.scss';
import React, { useState, useEffect } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://apirolli-movieapi-7215bc5accc0.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  return (
  <div className="movie-grid">
    {movies
      .filter((movie) => movie && movie.Title && movie.ImagePath)
      .map((movie) => (
        <MovieCard key={movie._id} movie={movie} onMovieClick={setSelectedMovie} />
      ))}
  </div>
);

};
