import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const Navigation = lazy(() => import("../components/Navigation/Navigation"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const TmdbApiTester = lazy(() => import("../pages/TmdbApiTester/TmdbApiTester"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../components/MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

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
            <Route path="/test-api" element={<TmdbApiTester />} />
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
