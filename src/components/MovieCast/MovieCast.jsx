import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTmdbApi from "../../hooks/useTmdbApi";
import { PulseLoader } from "react-spinners";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { fetchCast } = useTmdbApi();
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCast(movieId);
        setCast(data);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    fetchData();
  }, [fetchCast, movieId]);

  if (!cast) {
    return (
      <div className="loaderWrapper">
        <PulseLoader color="#ffffff" size={10} />
      </div>
    );
  }

  return (
    <div className={css.imagesContainer}>
      <h3 className="header">Cast</h3>
      {cast && cast.cast && cast.cast.length > 0 ? (
        <ul>
          {cast.cast.slice(0, 10).map((actor) => {
            return (
              <li key={actor.id}>
                <img src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`} alt={actor.name} />
                <div>
                  <h3>{actor.name}</h3>
                  <div>
                    <p>Character: {actor.character}</p>
                    <p>Popularity: {actor.popularity}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h4>Sorry, but there is no cast information available for this movie</h4>
      )}
    </div>
  );
};

export default MovieCast;
