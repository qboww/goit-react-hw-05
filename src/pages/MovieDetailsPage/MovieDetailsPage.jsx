import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { useRef } from "react";
import { PulseLoader } from "react-spinners";
import useTmdbApi from "../../hooks/useTmdbApi";
import { Toaster } from "react-hot-toast";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { fetchMovieById, fetchVideos } = useTmdbApi();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const location = useLocation();
  const goBackRef = useRef(location.state || "/movies");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieById(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchVideoData = async () => {
      try {
        const videoData = await fetchVideos(movieId);
        setVideos(videoData.results);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchData();
    fetchVideoData();
  }, [fetchMovieById, fetchVideos, movieId]);

  if (!movie) {
    return (
      <div className="loaderWrapper">
        <PulseLoader color="#ffffff" size={10} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className={css.detailsContainer}>
          <div className={css.imageContainer}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </div>
          <div>
            <div>
              <h1>{movie.title}</h1>
              <div className={css.dataTextContainer}>
                <div>
                  <h3 className={css.header}>Overview</h3>
                  <p className={css.overview}>{movie.overview}</p>
                </div>
                <div>
                  <h3 className={css.header}>Statistics</h3>
                  <ul>
                    <li>
                      <p>Release date: {movie.release_date}</p>
                    </li>
                    <li>
                      <p>Vote average: {movie.vote_average}</p>
                    </li>
                    <li>
                      <p>Votes: {movie.vote_count}</p>
                    </li>
                  </ul>
                </div>
                <div className={css.genres}>
                  <h3 className={css.header}>Genres</h3>
                  <ul>
                    {movie.genres.map((genre) => (
                      <li key={genre.id}>
                        <p>{genre.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav>
          <div className={css.linksContainer}>
            <div className={css.links}>
              <NavLink to="cast">Cast</NavLink>
              <NavLink to="reviews">Reviews</NavLink>
            </div>

            <div className={css.links}>
              <Link to={goBackRef.current}>
                <a className={css.goBack} onClick={() => window.history.back()}>
                  Go Back
                </a>
              </Link>
            </div>
          </div>
          <Outlet />
        </nav>
      </div>

      <div className={css.videoContainer}>
        <h3 className={css.header}>Trailers and videos</h3>
        {loadingVideos ? (
          <div className="loaderWrapper">
            <PulseLoader color="#ffffff" size={10} />
          </div>
        ) : videos.length > 0 ? (
          <ul className={css.videosList}>
            {videos.slice(0, 4).map((video) => (
              <li key={video.id}>
                {video.site === "YouTube" && (
                  <iframe
                    className={css.videosFrame}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.name}
                  ></iframe>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No videos available for this movie.</p>
        )}
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MovieDetailsPage;
