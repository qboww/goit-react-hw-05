import React, { useState } from "react";
import useTmdbApi from "../../hooks/useTmdbApi";
import css from "./TmdbApiTester.module.css";

const TmdbApiTester = () => {
  const {
    fetchTrendingMovies,
    fetchMovieById,
    fetchCast,
    fetchReviews,
    fetchMovieByQuery,
    errorMessage,
  } = useTmdbApi();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className={css.aboutText}>
        <h1>API Methods Tester</h1>
        <p>
          Each field and button fetches some public data from{" "}
          <a className="default-link" href="https://www.themoviedb.org">
            TMDB
          </a>
        </p>
        <p>Try filling in these fields and pressing buttons in order to make fetch requests</p>
      </div>

      <div className={css.sidesContainer}>
        <div className={css.sideContainer}>
          <button onClick={() => fetchTrendingMovies(setTrendingMovies)}>
            Fetch Trending Movies
          </button>
          {trendingMovies.length > 0 && (
            <div>
              <p className={css.header}>Trending Movies:</p>
              <ul>
                {trendingMovies.map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={css.sideContainer}>
          <div className={css.inputNBtn}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Movie Query"
            />
            <button onClick={() => fetchMovieByQuery(searchTerm, setSearchResults)}>
              Search Movies
            </button>
          </div>
          {searchResults.length > 0 && (
            <div>
              <p className={css.header}>Search Results:</p>
              <ul>
                {searchResults.map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={css.sideContainer}>
          <div className={css.inputNBtn}>
            <input
              type="number"
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
              placeholder="Enter Movie ID"
            />
            <button onClick={() => fetchMovieById(movieId, setMovieDetails)}>
              Fetch Movie Details
            </button>
          </div>

          {movieDetails && (
            <div>
              <p className={css.header}>Movie Title: {movieDetails.title}</p>
              <div className={css.detailsBtns}>
                <div className={css.btnResponse}>
                  <button disabled={!movieDetails} onClick={() => fetchCast(movieId, setCast)}>
                    Fetch Cast
                  </button>
                  {cast && <p>Cast count: {cast.cast.length}</p>}
                </div>

                <div className={css.btnResponse}>
                  <button
                    disabled={!movieDetails}
                    onClick={() => fetchReviews(movieId, setReviews)}
                  >
                    Fetch Reviews
                  </button>
                  {reviews && <p>Reviews count: {reviews.results.length}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
};

export default TmdbApiTester;
