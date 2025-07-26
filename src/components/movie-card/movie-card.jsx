// src/components/movie-card/movie-card.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 shadow-sm d-flex flex-column">
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="flex-grow-1">{movie.Description}</Card.Text>
        <div className="mt-auto">
          <Button
            variant="primary"
            className="w-100"
            onClick={() => onMovieClick(movie)}
          >
            Open
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
