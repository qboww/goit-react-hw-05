import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <div className={css.navContainer}>
      <nav className={css.navLinks}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
        <NavLink to="/test-api" className={buildLinkClass}>
          Test API
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
