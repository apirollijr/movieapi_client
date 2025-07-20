// src/components/main-view/main-view.jsx
import React, { useState, useEffect } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setToken("");
    setMovies([]);
  };

  // Fetch movies only if token exists
  useEffect(() => {
    if (!token) return;

    fetch("https://apirolli-movieapi-7215bc5accc0.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Failed to fetch movies:", error));
  }, [token]);

  // Show login and signup if not authenticated
  if (!user) {
    return (
      <div className="auth-container">
        <LoginView onLoggedIn={onLoggedIn} />
        <SignupView onSignedUp={() => alert("Signup successful! Please log in.")} />
      </div>
    );
  }

  // Movie details view
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div className="main-view">
      <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Logout
      </button>
      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : (
        <div className="grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={setSelectedMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
};
