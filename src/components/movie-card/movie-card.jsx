import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100 shadow-sm movie-card">
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        alt={movie.Title}
        style={{ height: "350px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{movie.Title}</Card.Title>
        <div className="mt-auto">
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">Open</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};
