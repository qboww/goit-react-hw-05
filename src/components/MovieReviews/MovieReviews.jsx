import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTmdbApi from "../../hooks/useTmdbApi";
import { PulseLoader } from "react-spinners";
import css from "./MovieReviews.module.css";

const stripHtmlTags = (html) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || "";
};

const MovieReviews = () => {
  const { fetchReviews } = useTmdbApi();
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchReviews(movieId);
      setReviews(data);
    };

    fetchData();
  }, [fetchReviews, movieId]);

  if (!reviews) {
    return (
      <div className="loaderWrapper">
        <PulseLoader color="#ffffff" size={10} />
      </div>
    );
  }

  return (
    <div className={css.reviewsContainer}>
      <h2>Reviews</h2>
      <div className={css.reviewsContentContainer}>
        {reviews.results.length > 0 ? (
          <ul className={css.reviewsList}>
            {reviews.results.slice(0, 10).map((review) => {
              return (
                <li key={review.id}>
                  <p>{review.rating}</p>
                  <h4>{review.author}</h4>
                  <p>{stripHtmlTags(review.content)}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <h4>Sorry, but there are no reviews for this movie</h4>
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
