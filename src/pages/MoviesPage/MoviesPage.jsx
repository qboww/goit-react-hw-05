import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useTmdbApi from "../../hooks/useTmdbApi";
import css from "./MoviesPage.module.css";
import { Toaster } from "react-hot-toast";

const MoviesPage = () => {
  const { fetchMovieByQuery } = useTmdbApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovieByQuery = async () => {
      try {
        const queryWord = searchParams.get("query");
        if (!queryWord) return;

        const data = await fetchMovieByQuery(queryWord);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieByQuery();
  }, [fetchMovieByQuery, searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.title.value.trim();

    if (query === "") {
      alert("Error, enter movies");
      return;
    }

    setSearchParams({ query });
    form.reset();
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

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.wrapper}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            placeholder="Enter movie..."
            name="title"
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </div>
      </form>

      {movies.length === 0 && searchParams.get("query") ? (
        <p className={css.errorSearch}>No movies found. Please try again.</p>
      ) : (
        <div className={css.listWrapper}>
          <ul className={css.list}>
            {movies.map((movie) => (
              <li key={movie.id} className={css.item}>
                <Link className={css.link} to={`/movies/${movie.id}`}>
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
