// src/main-view/main-view.jsx
import React, { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';


export const MainView = () => {
  const [movies] = useState([
    {
      _id: '1',
      Title: 'The Matrix',
      Description: 'A hacker discovers the reality is a simulation.',
      Genre: { Name: 'Action' },
      Director: { Name: 'Wachowski Sisters' },
      ImagePath: 'https://via.placeholder.com/150x220?text=Matrix',
    },
    {
      _id: '2',
      Title: 'Inception',
      Description: 'Dream within a dream.',
      Genre: { Name: 'Sci-Fi' },
      Director: { Name: 'Christopher Nolan' },
      ImagePath: 'https://via.placeholder.com/150x220?text=Inception',
    },
    {
      _id: '3',
      Title: 'The Godfather',
      Description: 'The story of a mafia family.',
      Genre: { Name: 'Crime' },
      Director: { Name: 'Francis Ford Coppola' },
      ImagePath: 'https://via.placeholder.com/150x220?text=Godfather',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} onMovieClick={setSelectedMovie} />
      ))}
    </div>
  );
};
