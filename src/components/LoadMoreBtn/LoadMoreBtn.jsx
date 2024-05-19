import React from "react";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onLoadMore();
  };

  return (
    <button onClick={handleClick} className={css.loadBtn}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
