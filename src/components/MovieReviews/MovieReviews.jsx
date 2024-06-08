import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTmdbApi from "../../hooks/useTmdbApi";
import Loader from "../../components/Loader/Loader";
import css from "./MovieReviews.module.css";

const stripHtmlTags = (html) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || "";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB");
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
    return <Loader />;
  }

  return (
    <div className={css.reviewsContainer}>
      <h3 className="header">Reviews</h3>
      <div>
        {reviews.results.length > 0 ? (
          <ul className={css.reviewsList}>
            {reviews.results.slice(0, 10).map((review) => {
              return (
                <li key={review.id}>
                  <h4>{review.author}</h4>
                  <p className={css.review}>{stripHtmlTags(review.content)}</p>
                  <div>
                    <p>Comment Date: {formatDate(review.created_at)}</p>
                    <p>Rating: {review.author_details.rating}/10</p>
                  </div>
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
