// src/components/movie-card/movie-card.jsx
import React from 'react';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', cursor: 'pointer' }}>
      <h3>{movie.Title}</h3>
      <img src={movie.ImagePath} alt={movie.Title} width="150" />
    </div>
  );
};
