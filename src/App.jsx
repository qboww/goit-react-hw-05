import React from "react";
import Navigation from "./components/Navigation/Navigation";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div>
      <Navigation />
      <div className="container">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
