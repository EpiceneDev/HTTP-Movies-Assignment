import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import MovieCard from "./MovieCard";


const MovieList = props => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, []);

  console.log('MOVIELIST PROPS', props)
    return (
      <div className="movie-list">
        {movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}

export default MovieList;