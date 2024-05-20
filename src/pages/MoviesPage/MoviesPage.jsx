import React, { useState } from "react";
import useTmdbApi from "../../hooks/useTmdbApi";
import MovieList from "../../components/MovieList/MovieList";

import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const { fetchMovieByQuery, errorMessage } = useTmdbApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovieByQuery(searchTerm, setSearchResults);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className={css.aboutText}>
        <h1>Search movies</h1>
        <p>
          Here you are able to find any film you want{" "}
          <a className="default-link" href="https://www.themoviedb.org">
            TMDB
          </a>
        </p>
        <p>Just fill in search input with desired movie name and we will find it for you</p>
      </div>

      <form onSubmit={handleSearch} className={css.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter Movie Query"
        />
        <button type="submit">Search Movies</button>
      </form>
      <MovieList movies={searchResults} listName={"Search results: "}/>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
};

export default MoviesPage;
