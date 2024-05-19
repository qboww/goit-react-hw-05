import React from "react";
import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <RotatingLines
        height="50"
        width="50"
        strokeWidth="3"
        strokeColor="#ffffff"
      />
    </div>
  );
};

export default Loader;
