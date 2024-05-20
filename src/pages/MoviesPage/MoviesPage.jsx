import React, { useState, useEffect } from "react";
import useTmdbApi from "../../hooks/useTmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const { fetchMovieByQuery } = useTmdbApi();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("query")) {
      const urlQuery = searchParams.get("query");
      setQuery(urlQuery);
      fetchMovieByQuery(urlQuery, setSearchResults);
    }
  }, [fetchMovieByQuery, searchParams]); 
  
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovieByQuery(query, setSearchResults);
    updateQueryString(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const updateQueryString = (query) => {
    const params = new URLSearchParams();
    if (query.trim() !== "") {
      params.append("query", query);
    }
    setSearchParams(params);
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
          value={query}
          onChange={handleInputChange}
          placeholder="Enter Movie Query"
        />
        <button type="submit">Search Movies</button>
      </form>
      <MovieList movies={searchResults} listName={"Search results: "} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
