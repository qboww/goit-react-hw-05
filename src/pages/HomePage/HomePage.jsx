import React, { useEffect, useState } from "react";
import useTmdbApi from "../../hooks/useTmdbApi";
import MovieList from "../../components/MovieList/MovieList";

import css from "./HomePage.module.css";

const HomePage = () => {
  const { fetchTrendingMovies, errorMessage } = useTmdbApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies(setMovies);
  }, [fetchTrendingMovies]);

  return (
    <div>
      <div className={css.aboutText}>
        <h1>Search movies</h1>
        <p>
          We provided you some new films of the day, presented by{" "}
          <a className="default-link" href="https://www.themoviedb.org">
            TMDB
          </a>
        </p>
        <p>Here are films that you might not have seen!</p>
      </div>

      <MovieList movies={movies} listName="Trending movies:" />

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
};

export default HomePage;
