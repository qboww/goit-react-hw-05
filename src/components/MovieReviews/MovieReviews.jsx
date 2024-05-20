import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTmdbApi from "../../hooks/useTmdbApi";

import css from "./MovieReviews.module.css";

const stripHtmlTags = (html) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || "";
};

const MovieReviews = () => {
  const { fetchReviews, errorMessage } = useTmdbApi();
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchData();
  }, [fetchReviews, movieId]);

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!reviews) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className={css.reviewsContainer}>
      <h2>Reviews</h2>
      <div className={css.reviewsContentContainer}>
        {reviews && reviews.results && reviews.results.length > 0 ? (
          <ul className={css.reviewsList}>
            {reviews.results.slice(0, 10).map((review) => {
              return (
                <li key={review.id}>
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
