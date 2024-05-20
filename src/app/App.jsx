import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import Navigation from "../components/Navigation/Navigation";
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage"));

const App = () => {
  return (
    <div>
      <Navigation />

      <Suspense
        fallback={
          <div className="loaderWrapper">
            <PulseLoader color="#ffffff" size={10} />
          </div>
        }
      >
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
};

export default App;
