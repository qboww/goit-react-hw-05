import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";

import useTmdbApi from "../../hooks/useTmdbApi";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { fetchMovieById, errorMessage } = useTmdbApi();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackRef = location.state || "/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData();
  }, [fetchMovieById, movieId]);

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={css.detailsContainer}>
        <div className={css.imageContainer}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className={css.dataContainer}>
          <div>
            <h2>{movie.title}</h2>
            <div className={css.dataText}>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <div className={css.dataTextContainer}>
                <h3>Statistics</h3>
                <p>Release date: {movie.release_date}</p>
                <p>Vote average: {movie.vote_average}</p>
                <p>Votes: {movie.vote_count}</p>
              </div>
            </div>
          </div>
          <Link to={goBackRef}>
            <button className={css.goBack}>Go Back</button>
          </Link>
        </div>
      </div>

      <nav className={css.navContainer}>
        <h3>Additional info</h3>
        <div className={css.Links}>
          <NavLink to="cast">Cast</NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </div>
        <Outlet />
      </nav>
    </div>
  );
};

export default MovieDetailsPage;
