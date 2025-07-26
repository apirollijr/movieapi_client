// src/components/movie-view/movie-view.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="shadow-sm p-3 mx-auto" style={{ maxWidth: "400px" }}>
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        alt={movie.Title}
        className="mb-3 img-fluid"
      />
      <Card.Body>
        <Card.Title className="mb-2 text-center">{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <p>
          <strong>Genre:</strong> {movie.Genre?.Name}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director?.Name}
        </p>
        <Button variant="secondary" onClick={onBackClick} className="w-100">
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};
