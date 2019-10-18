import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import AddMovie from './Movies/AddMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);



  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => {
        return <MovieList {...props} movies={movies} setMovies={setMovies} /> 
      }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />
        }}
      />
      <Route path="/update-movie/:id"
        render={props => {
        return <UpdateForm {...props} />
        }}
      />
       <Route path="/api/movies"
        render={props => {
        return <AddMovie {...props} />
        }}
      />
    </>
  );
};

export default App;