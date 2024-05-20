import { useState, useCallback } from "react";
import TmdbApi from "../services/tmdb-api";

let tmdbApiInstance = null;

const useTmdbApi = () => {
  tmdbApiInstance ??= new TmdbApi();
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchTrendingMovies = useCallback(async (setData) => {
    try {
      const data = await tmdbApiInstance.fetchMovies();
      setData(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  const fetchMovieById = useCallback(async (id, setData) => {
    try {
      const data = await tmdbApiInstance.fetchMovieById(id);
      setData(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  const fetchCast = useCallback(async (id, setData) => {
    try {
      const data = await tmdbApiInstance.fetchCast(id);
      setData(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  const fetchReviews = useCallback(async (id, setData) => {
    try {
      const data = await tmdbApiInstance.fetchReviews(id);
      setData(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  const fetchMovieByQuery = useCallback(async (query, setData) => {
    try {
      const data = await tmdbApiInstance.fetchMovieByQuery(query);
      setData(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  return {
    fetchTrendingMovies,
    fetchMovieById,
    fetchCast,
    fetchReviews,
    fetchMovieByQuery,
    errorMessage,
  };
};

export default useTmdbApi;
