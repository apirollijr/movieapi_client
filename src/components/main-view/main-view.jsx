import React, { useEffect, useMemo, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { FilterBar } from "../filter-bar/filter-bar";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

const API_BASE = process.env.API_BASE_URL || "http://localhost:8080";

export const MainView = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [favBusy, setFavBusy] = useState({});

  // which auth screen to show if user is null
  const [authMode, setAuthMode] = useState("login");
  // whether profile view is active
  const [showProfile, setShowProfile] = useState(false);

  // ---------- favorites helpers ----------
  const getFavoriteIds = () => {
    if (!user) return [];
    const raw =
      user.FavoriteMovies ?? user.FavoriteMovieIDs ?? user.Favorites ?? [];
    if (!Array.isArray(raw)) return [];
    return raw.map((v) => (typeof v === "string" ? v : v?._id)).filter(Boolean);
  };

  const isFavorite = (movieId) => {
    if (!movieId) return false;
    return getFavoriteIds().includes(movieId);
  };

  const handleToggleFavorite = async (movie) => {
    if (!user || !token || !movie?._id) return;
    const username = user.Username || user.username;
    if (!username) return;

    const movieId = movie._id;
    const already = isFavorite(movieId);
    const url = `${API_BASE}/users/${encodeURIComponent(
      username
    )}/favorites/${encodeURIComponent(movieId)}`;

    try {
      setFavBusy((m) => ({ ...m, [movieId]: true }));
      const res = await fetch(url, {
        method: already ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        let msg = `${res.status} ${res.statusText}`;
        try {
          const body = await res.json();
          if (body?.message) msg += ` — ${body.message}`;
        } catch {}
        throw new Error(msg);
      }
      const current = getFavoriteIds();
      const next = already
        ? current.filter((id) => id !== movieId)
        : [...current, movieId];
      const updated = { ...(user || {}) };
      updated.FavoriteMovies = next; // normalize as strings
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    } catch (err) {
      console.error("Favorite toggle failed:", err);
      alert(`Favorite action failed: ${err.message}`);
    } finally {
      setFavBusy((m) => ({ ...m, [movieId]: false }));
    }
  };

  // ---------- fetch movies ----------
  useEffect(() => {
    if (!token) return;
    const url = `${API_BASE}/movies`;
    setLoading(true);
    setLoadError("");
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) {
          let msg = `${res.status} ${res.statusText}`;
          try {
            const body = await res.json();
            if (body?.message) msg += ` — ${body.message}`;
          } catch {}
          if (res.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            setToken("");
          }
          throw new Error(msg);
        }
        return res.json();
      })
      .then((data) => setMovies(Array.isArray(data) ? data : []))
      .catch((err) => setLoadError(`Failed to load movies: ${err.message}`))
      .finally(() => setLoading(false));
  }, [token]);

  // ---------- derived ----------
  const genres = useMemo(() => {
    const set = new Set(
      movies.map((m) => m?.Genre?.Name).filter(Boolean).map((s) => s.trim())
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [movies]);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

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

  // ---------- auth / navigation handlers ----------
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    setSelectedMovie(null);
    setShowProfile(false);
    setAuthMode("login");
  };

  const goHome = () => {
    setShowProfile(false);
    setSelectedMovie(null);
  };

  // ---------- render ----------
  return (
    <>
      <NavigationBar
        user={user}
        onLogout={handleLogout}
        onShowLogin={() => setAuthMode("login")}
        onShowSignup={() => setAuthMode("signup")}
        onShowHome={goHome}
        onShowProfile={() => setShowProfile(true)}
      />

      <div className="container py-3">
        {!user ? (
          authMode === "signup" ? (
            <SignupView onBackToLogin={() => setAuthMode("login")} />
          ) : (
            <LoginView
              onLoggedIn={(u, t) => {
                setUser(u);
                setToken(t);
                localStorage.setItem("user", JSON.stringify(u));
                localStorage.setItem("token", t);
              }}
              onShowSignup={() => setAuthMode("signup")}
            />
          )
        ) : selectedMovie ? (
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        ) : showProfile ? (
          <ProfileView
            user={user}
            movies={movies}
            favoriteIds={getFavoriteIds()}
            favoriteBusyMap={favBusy}
            onBack={goHome}
            onOpen={(m) => setSelectedMovie(m)}
            onToggleFavorite={(m) => handleToggleFavorite(m)}
          />
        ) : (
          <>
            <FilterBar
              search={search}
              setSearch={setSearch}
              genre={genre}
              setGenre={setGenre}
              genres={genres}
            />

            {loading && <div className="text-muted">Loading movies…</div>}
            {!!loadError && (
              <div className="alert alert-danger my-2" role="alert">
                {loadError}
              </div>
            )}

            <div className="row g-3">
              {filteredMovies.map((movie) => {
                const fav = isFavorite(movie._id);
                const busy = !!favBusy[movie._id];
                return (
                  <div key={movie._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <MovieCard
                      movie={movie}
                      isFavorite={fav}
                      favoriteBusy={busy}
                      onOpen={() => setSelectedMovie(movie)}
                      onToggleFavorite={() => handleToggleFavorite(movie)}
                    />
                  </div>
                );
              })}
              {filteredMovies.length === 0 && !loading && !loadError && (
                <div className="text-muted">No movies match your filter.</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
