import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTmdbApi from "../../hooks/useTmdbApi";

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
    <div>
      {reviews && reviews.results && reviews.results.length > 0 ? (
        <ul>
          {reviews.results.slice(0, 4).map((review) => {
            return (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{stripHtmlTags(review.content)}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h4>Sorry, but there are no reviews for this movie</h4>
      )}
    </div>
  );
};

export default MovieReviews;
