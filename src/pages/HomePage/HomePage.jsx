import React, { useEffect, useState } from "react";
import useTmdbApi from "../../hooks/useTmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import { Toaster } from "react-hot-toast";

import css from "./HomePage.module.css";

const HomePage = () => {
  const { fetchTrendingMovies } = useTmdbApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies(setMovies);
  }, [fetchTrendingMovies]);

  return (
    <div>
      <div className={css.aboutText}>
        <h1>Trending movies</h1>
        <p>
          We provided you some new films of the day, presented by{" "}
          <a className="default-link" href="https://www.themoviedb.org">
            TMDB
          </a>
        </p>
        <p>Here are films that you might not have seen!</p>
      </div>
      <MovieList movies={movies} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default HomePage;
