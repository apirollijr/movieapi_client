// src/components/movie-view/movie-view.jsx
import React from "react";
import { useParams } from "react-router-dom";

export const MovieView = ({ movie: movieProp, movies = [], onBackClick }) => {
  const params = useParams?.() || {};
  const movieId = params.movieId || params.id || params._id;

  // Prefer the explicitly provided movie
  let movie = movieProp || null;

  // If not provided, try to resolve from the list + route param
  if (!movie && Array.isArray(movies) && movieId) {
    movie =
      movies.find((m) => String(m?._id) === String(movieId)) ||
      null;
  }

  if (!movie) {
    return (
      <div className="container py-3">
        <div className="alert alert-warning">Movie not found.</div>
        {onBackClick && (
          <button className="btn btn-secondary mt-2" onClick={onBackClick}>
            Back
          </button>
        )}
      </div>
    );
  }

  const title = movie.Title || "Untitled";
  const img =
    movie.ImagePath || "https://via.placeholder.com/800x1200?text=No+Poster";
  const desc = movie.Description || "";
  const genre = movie?.Genre?.Name;
  const director = movie?.Director?.Name;

  return (
    <div className="card shadow-sm">
      <div className="row g-0">
        <div className="col-12 col-md-5">
          <img
            src={img}
            alt={title}
            className="img-fluid w-100"
            style={{ objectFit: "cover", maxHeight: 600 }}
          />
        </div>
        <div className="col-12 col-md-7">
          <div className="card-body d-flex flex-column h-100">
            <h3 className="card-title">{title}</h3>
            {genre && (
              <p className="mb-1">
                <strong>Genre:</strong> {genre}
              </p>
            )}
            {director && (
              <p className="mb-3">
                <strong>Director:</strong> {director}
              </p>
            )}
            {desc && <p className="card-text">{desc}</p>}

            <div className="mt-auto">
              {onBackClick && (
                <button className="btn btn-secondary" onClick={onBackClick}>
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
