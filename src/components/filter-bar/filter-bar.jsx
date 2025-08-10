import React from "react";

export const FilterBar = ({
  search,
  setSearch,
  genre,
  setGenre,
  genres
}) => {
  return (
    <div className="container my-3">
      <div className="row g-2">
        <div className="col-12 col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search movies (title or description)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
