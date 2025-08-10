import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieCard = ({
  movie,
  onOpen,
  onToggleFavorite,
  isFavorite = false,
  favoriteBusy = false,
}) => {
  const title = movie?.Title || "Untitled";
  const img =
    movie?.ImagePath || "https://via.placeholder.com/600x900?text=No+Poster";
  const desc = movie?.Description || "";

  return (
    <Card className="h-100 movie-card shadow-sm">
      <Card.Img variant="top" src={img} alt={title} className="card-img-top" />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h6" className="mb-1 text-truncate-2">
          {title}
        </Card.Title>
        {desc && (
          <Card.Text className="text-muted small text-truncate-3">
            {desc}
          </Card.Text>
        )}

        <div className="mt-auto d-flex gap-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="flex-fill"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (typeof onOpen === "function") onOpen(movie);
            }}
          >
            Open
          </Button>

          <Button
            type="button"
            variant={isFavorite ? "danger" : "outline-secondary"}
            size="sm"
            className="flex-fill"
            disabled={favoriteBusy}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (typeof onToggleFavorite === "function") onToggleFavorite(movie);
            }}
          >
            {favoriteBusy
              ? "Working…"
              : isFavorite
              ? "Remove Favorite"
              : "Add Favorite"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
