import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
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
            <Link
              className={css.link}
              to={{
                pathname: `/movies/${movie.id.toString()}`,
                state: { from: location.pathname },
              }}
            >
              <div className={css.btmFixConatiner}>
                <div className={css.imgRateContainer}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p
                    className={clsx(css.vote, {
                      ["highVote"]: movie.vote_average > 7.5,
                      ["medVote"]: movie.vote_average <= 7.5,
                      ["lowVote"]: movie.vote_average <= 6,
                    })}
                  >
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
                <div className={css.dataContainer}>
                  <p className={css.title}>{movie.title}</p>
                  <p className={css.date}>{movie.release_date}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
