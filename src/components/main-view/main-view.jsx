import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar"; // We'll create this
import ProfileView from "../profile-view/profile-view";       // Create this later

export const MainView = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [movies, setMovies] = useState([]);

  // Fetch movies if logged in
  useEffect(() => {
    if (token) {
      fetch("https://your-movie-api/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  return (
    <Router>
      <NavigationBar user={user} setUser={setUser} />
      <Routes>
        {/* Redirect to login if not authenticated */}
        {!user ? (
          <>
            <Route path="/login" element={<LoginView onLoggedIn={(u, t) => { setUser(u); setToken(t); }} />} />
            <Route path="/signup" element={<SignupView />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={
              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            } />
            <Route path="/movies/:movieId" element={<MovieView movies={movies} />} />
            <Route path="/profile" element={<ProfileView user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};
