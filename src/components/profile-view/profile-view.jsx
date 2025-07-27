import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export default function ProfileView({ user, token, movies, setUser }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user?.FavoriteMovies?.length > 0) {
      const favs = movies.filter((m) => user.FavoriteMovies.includes(m._id));
      setFavoriteMovies(favs);
    }
  }, [user, movies]);

  // Remove movie from favorites
  const handleRemoveFavorite = (movieId) => {
    fetch(`https://apirolli-movieapi-7215bc5accc0.herokuapp.com/users/${user.Username}/favorites/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("[DEBUG] Remove Favorite Response:", text);
        if (!res.ok) throw new Error(`Error ${res.status}: ${text}`);
        return JSON.parse(text);
      })
      .then((data) => {
        alert(`Movie removed from ${user.Username}'s favorites!`);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
      .catch((err) => console.error("Remove favorite error:", err));
  };

  return (
    <Row className="mt-4">
      {/* User Info Section */}
      <Col md={4}>
        <Card className="mb-4 p-3">
          <h5>User Information</h5>
          <p><strong>Username:</strong> {user.Username}</p>
          <p><strong>Email:</strong> {user.Email}</p>
          <p><strong>Birthday:</strong> {new Date(user.Birthday).toDateString()}</p>
          <Button variant="danger">Delete Account</Button>
        </Card>

        {/* Update Form */}
        <Card className="p-3">
          <h5>Update Info</h5>
          <Form>
            <Form.Group controlId="formUsername" className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" defaultValue={user.Username} />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={user.Email} />
            </Form.Group>
            <Form.Group controlId="formBirthday" className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Button variant="primary">Update</Button>
          </Form>
        </Card>
      </Col>

      {/* Favorite Movies Section */}
      <Col md={8}>
        <h5>Favorite Movies</h5>
        <Row className="g-4">
          {favoriteMovies.length === 0 ? (
            <p>No favorite movies yet.</p>
          ) : (
            favoriteMovies.map((movie) => (
              <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    alt={movie.Title}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{movie.Title}</Card.Title>
                    <div className="mt-auto">
                      <Button variant="primary" className="me-2" href={`/movies/${movie._id}`}>
                        Open
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemoveFavorite(movie._id)}
                      >
                        Remove Favorite
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
}
