import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const handleAddFavorite = (movieId) => {
    if (!user || !token) {
      alert("You must be logged in to add favorites.");
      return;
    }

    console.log(`[DEBUG] Adding favorite movie: ${movieId} for user: ${user.Username}`);

    fetch(`https://apirolli-movieapi-7215bc5accc0.herokuapp.com/users/${user.Username}/favorites/${movieId}`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("[DEBUG] Raw Add Favorite Response:", text);

        if (!res.ok) throw new Error(`Error ${res.status}: ${text}`);

        return JSON.parse(text);
      })
      .then((data) => {
        alert(`Movie added to ${user.Username}'s favorites!`);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
      .catch((err) => console.error("Add favorite error:", err));
  };

  const handleRemoveFavorite = (movieId) => {
    if (!user || !token) {
      alert("You must be logged in to remove favorites.");
      return;
    }

    console.log(`[DEBUG] Removing favorite movie: ${movieId} for user: ${user.Username}`);

    fetch(`https://apirolli-movieapi-7215bc5accc0.herokuapp.com/users/${user.Username}/favorites/${movieId}`, {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("[DEBUG] Raw Remove Favorite Response:", text);

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

  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

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
            <Button variant="primary" className="me-2">
              Open
            </Button>
          </Link>

          {isFavorite ? (
            <Button
              variant="outline-danger"
              onClick={() => handleRemoveFavorite(movie._id)}
            >
              Remove Favorite
            </Button>
          ) : (
            <Button
              variant="outline-success"
              onClick={() => handleAddFavorite(movie._id)}
            >
              Add Favorite
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
