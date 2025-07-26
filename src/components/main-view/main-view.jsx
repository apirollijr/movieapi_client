// src/components/main-view/main-view.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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

  useEffect(() => {
    if (!token) return;

    fetch("https://apirolli-movieapi-7215bc5accc0.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Failed to fetch movies:", error));
  }, [token]);

  if (!user) {
    return (
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <LoginView onLoggedIn={onLoggedIn} />
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-3">
          <Col md={6}>
            <SignupView onSignedUp={() => alert("Signup successful! Please log in.")} />
          </Col>
        </Row>
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <Container fluid className="mt-4">
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button variant="secondary" className="mb-3" onClick={handleLogout}>
        Logout
      </Button>
      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard
                movie={movie}
                onMovieClick={setSelectedMovie}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
