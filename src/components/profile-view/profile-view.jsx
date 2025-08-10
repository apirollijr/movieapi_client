import React, { useMemo } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/**
 * Props:
 * - user: current user object
 * - movies: full movies array
 * - favoriteIds: string[] of movie IDs
 * - onBack: () => void
 * - onOpen: (movie) => void
 * - onToggleFavorite: (movie) => void
 * - favoriteBusyMap: { [movieId]: boolean }
 */
export const ProfileView = ({
  user,
  movies = [],
  favoriteIds = [],
  onBack,
  onOpen,
  onToggleFavorite,
  favoriteBusyMap = {}
}) => {
  const username = user?.Username || user?.username;
  const email = user?.Email || user?.email;

  const favoriteMovies = useMemo(() => {
    if (!Array.isArray(movies) || !Array.isArray(favoriteIds)) return [];
    const idSet = new Set(favoriteIds.map(String));
    return movies.filter((m) => idSet.has(String(m?._id)));
  }, [movies, favoriteIds]);

  return (
    <div className="container px-0">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="m-0">Profile</h4>
        {onBack && (
          <Button type="button" variant="secondary" onClick={onBack}>
            Back to Home
          </Button>
        )}
      </div>

      <Card className="mb-3">
        <Card.Body>
          <div className="row">
            <div className="col-12 col-md-6">
              <p className="mb-1"><strong>Username:</strong> {username}</p>
              {email && <p className="mb-0"><strong>Email:</strong> {email}</p>}
            </div>
            <div className="col-12 col-md-6">
              <p className="mb-0"><strong>Favorites:</strong> {favoriteMovies.length}</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <h5 className="mb-2">Your Favorite Movies</h5>
      {favoriteMovies.length === 0 ? (
        <div className="text-muted">No favorites yet.</div>
      ) : (
        <div className="row g-3">
          {favoriteMovies.map((movie) => {
            const busy = !!favoriteBusyMap[movie._id];
            const title = movie?.Title || "Untitled";
            const img = movie?.ImagePath || "https://via.placeholder.com/600x900?text=No+Poster";
            return (
              <div key={movie._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card className="h-100 movie-card shadow-sm">
                  <Card.Img variant="top" src={img} alt={title} className="card-img-top" />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title as="h6" className="mb-1 text-truncate-2">{title}</Card.Title>
                    <div className="mt-auto d-flex gap-2">
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        className="flex-fill"
                        onClick={() => onOpen && onOpen(movie)}
                      >
                        Open
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        className="flex-fill"
                        disabled={busy}
                        onClick={() => onToggleFavorite && onToggleFavorite(movie)}
                      >
                        {busy ? "Working…" : "Remove Favorite"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
