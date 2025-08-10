import React, { useEffect, useMemo, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { FilterBar } from "../filter-bar/filter-bar";

export const MainView = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // NEW: filter state
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch(`${import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Failed to load movies", err));
  }, [token]);

  // Unique list of genres for dropdown
  const genres = useMemo(() => {
    const set = new Set(
      movies
        .map((m) => m?.Genre?.Name)
        .filter(Boolean)
        .map((s) => s.trim())
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [movies]);

  // Apply filters
  const filteredMovies = useMemo(() => {
    const q = search.trim().toLowerCase();
    return movies.filter((m) => {
      const matchesText =
        !q ||
        m.Title?.toLowerCase().includes(q) ||
        m.Description?.toLowerCase().includes(q);

      const matchesGenre = !genre || m?.Genre?.Name === genre;

      return matchesText && matchesGenre;
    });
  }, [movies, search, genre]);

  if (!user) {
    // show login/signup (whatever you already have)
    // return <LoginView ... />
  }

  return (
    <div className="container py-3">
      <FilterBar
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
        genres={genres}
      />

      {selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : (
        <div className="row g-3">
          {filteredMovies.map((movie) => (
            <div key={movie._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <MovieCard
                movie={movie}
                onOpen={() => setSelectedMovie(movie)}
              />
            </div>
          ))}
          {filteredMovies.length === 0 && (
            <div className="text-muted">No movies match your filter.</div>
          )}
        </div>
      )}
    </div>
  );
};
