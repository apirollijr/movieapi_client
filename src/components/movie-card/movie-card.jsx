// src/components/movie-card/movie-card.jsx
import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img src={movie.ImagePath} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Genre?.Name}</p>
    </div>
  );
};
