// src/components/movie-view/movie-view.jsx
import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <img src={movie.ImagePath} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
      <p>
        <strong>Genre:</strong> {movie.Genre?.Name}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director?.Name}
      </p>
      <button className="btn" onClick={onBackClick}>
        Back
      </button>
    </div>
  );
};
