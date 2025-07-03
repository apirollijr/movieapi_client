// src/components/movie-view/movie-view.jsx
import React from 'react';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>{movie.Title}</h1>
      <img src={movie.ImagePath} alt={movie.Title} width="200" />
      <p><strong>Description:</strong> {movie.Description}</p>
      <p><strong>Genre:</strong> {movie.Genre.Name}</p>
      <p><strong>Director:</strong> {movie.Director.Name}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
