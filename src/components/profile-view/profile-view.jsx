import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function ProfileView({ user }) {
  if (!user) return <p>Loading...</p>;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Profile</h2>
      <Card className="mb-4">
        <Card.Body>
          <h4>{user.Username}</h4>
          <p>Email: {user.Email}</p>
          <p>Birthday: {user.Birthday ? new Date(user.Birthday).toDateString() : "Not set"}</p>
          <Button variant="secondary" as={Link} to="/">Back to Home</Button>{" "}
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Card.Body>
      </Card>

      <h3>Favorite Movies</h3>
      <Row>
        {user.FavoriteMovies && user.FavoriteMovies.length > 0 ? (
          user.FavoriteMovies.map((movieId) => (
            <Col md={3} key={movieId} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{movieId}</Card.Title>
                  {/* Later, replace movieId with actual movie data */}
                  <Button as={Link} to={`/movies/${movieId}`} variant="primary">
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>You have no favorite movies yet.</p>
        )}
      </Row>
    </div>
  );
}
