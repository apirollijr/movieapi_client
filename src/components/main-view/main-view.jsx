import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";

export const MainView = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (token) {
      fetch("https://apirolli-movieapi-7215bc5accc0.herokuapp.com/movies", {
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
        {!user ? (
          <>
            <Route path="/login" element={<LoginView onLoggedIn={(u, t) => { setUser(u); setToken(t); }} />} />
            <Route path="/signup" element={<SignupView />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={
              <Container>
                <Row className="mt-4 g-5">
                  {movies.map((movie) => (
                    <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
              </Container>
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
