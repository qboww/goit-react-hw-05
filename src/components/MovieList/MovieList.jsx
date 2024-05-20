import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies, listName }) => {
  const location = useLocation();

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={css.moviesListContainer}>
      <p className="header">{listName}</p>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </Link>
            <div className={css.badges}>
              <span className={css.releaseBadge}>[{movie.release_date}]</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
