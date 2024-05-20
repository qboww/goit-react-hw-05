import React from "react";

import css from "./MovieList.module.css";

const MovieList = ({ movies, listName }) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={css.moviesListContainer}>
      <p className="header">{listName}</p>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title}
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
