import React, { useState } from "react";
import useTmdbApi from "../../hooks/useTmdbApi";
import MovieList from "../../components/MovieList/MovieList";
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

  const handleFetchMovieDetails = async () => {
    try {
      const data = await fetchMovieById(movieId);
      setMovieDetails(data);
      setCast(null); // Reset cast data
      setReviews(null); // Reset reviews data
    } catch (error) {
      console.error("Error fetching movie details: ", error);
    }
  };

  const handleFetchCast = async () => {
    try {
      const data = await fetchCast(movieId);
      setCast(data);
    } catch (error) {
      console.error("Error fetching cast: ", error);
    }
  };

  const handleFetchReviews = async () => {
    try {
      const data = await fetchReviews(movieId);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

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

      <form onSubmit={(e) => e.preventDefault()}>
        <div className={css.sidesContainer}>
          <div className={css.sideContainer}>
            <button type="button" onClick={() => fetchTrendingMovies(setTrendingMovies)}>
              Fetch Trending Movies
            </button>
            <MovieList movies={trendingMovies} listName="Trending results: " />
          </div>

          <div className={css.sideContainer}>
            <div className={css.inputNBtn}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter Movie Query"
              />
              <button type="button" onClick={() => fetchMovieByQuery(searchTerm, setSearchResults)}>
                Search Movies
              </button>
            </div>
            <MovieList movies={searchResults} listName="Search results: " />
          </div>

          <div className={css.sideContainer}>
            <div className={css.inputNBtn}>
              <input
                type="number"
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
                placeholder="Enter Movie ID"
              />
              <button type="button" onClick={handleFetchMovieDetails}>
                Fetch Movie Details
              </button>
            </div>

            {movieDetails && (
              <div>
                <p className={css.header}>Movie Title: {movieDetails.title}</p>
                <div className={css.detailsBtns}>
                  <div className={css.btnResponse}>
                    <button type="button" disabled={!movieDetails} onClick={handleFetchCast}>
                      Fetch Cast
                    </button>
                    {cast && <p>Cast count: {cast.cast.length}</p>}
                  </div>

                  <div className={css.btnResponse}>
                    <button type="button" disabled={!movieDetails} onClick={handleFetchReviews}>
                      Fetch Reviews
                    </button>
                    {reviews && <p>Reviews count: {reviews.results.length}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
};

export default TmdbApiTester;
