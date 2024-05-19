import React, { useState } from "react";
import TmdbApi from "../../services/tmdb-api";

import css from "./TmdbApiTester.module.css";

const TmdbApiTester = () => {
  //#region hooks
  const [tmdbApi] = useState(new TmdbApi());
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  //#endregion

  //#region handlers
  const handleFetchTrendingMovies = async () => {
    try {
      console.log("Fetching trending movies...");
      const data = await tmdbApi.fetchMovies();
      setTrendingMovies(data);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error fetching trending movies: ", error);
      setErrorMessage(error.message);
    }
  };

  const handleFetchMovieById = async (id) => {
    try {
      const data = await tmdbApi.fetchMovieById(id);
      setMovieDetails(data);
      setCast(null);
      setReviews(null);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleFetchCast = async (id) => {
    try {
      const data = await tmdbApi.fetchCast(id);
      setCast(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleFetchReviews = async (id) => {
    try {
      const data = await tmdbApi.fetchReviews(id);
      setReviews(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleFetchMovieByQuery = async (query) => {
    try {
      const data = await tmdbApi.fetchMovieByQuery(query);
      setSearchResults(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  //#endregion

  return (
    <div>
      <div className={css.aboutText}>
        <h1>API Tester</h1>
        <p>
          Each field and button fetches some public data from <a href="https://www.themoviedb.org">TMDB</a>
        </p>
        <p>Try filling in these fields and pressing buttons in order to make fetch requests</p>
      </div>

      <div className={css.sidesContainer}>
        <div className={css.sideContainer}>
          <button onClick={handleFetchTrendingMovies}>Fetch Trending Movies</button>
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
            <button onClick={() => handleFetchMovieByQuery(searchTerm)}>Search Movies</button>
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
            <button onClick={() => handleFetchMovieById(movieId)}>Fetch Movie Details</button>
          </div>

          {movieDetails && (
            <div>
              <p className={css.header}>Movie Title: {movieDetails.title}</p>
              <div className={css.detailsBtns}>
                <div className={css.btnResponse}>
                  <button disabled={!movieDetails} onClick={() => handleFetchCast(movieId)}>
                    Fetch Cast
                  </button>
                  {cast && <p>Cast count: {cast.cast.length}</p>}
                </div>

                <div className={css.btnResponse}>
                  <button disabled={!movieDetails} onClick={() => handleFetchReviews(movieId)}>
                    Fetch Reviews
                  </button>
                  {reviews && <p>Reviews count: {reviews.results.length}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {errorMessage && <p className={css.error}>{errorMessage}</p>}
    </div>
  );
};

export default TmdbApiTester;
