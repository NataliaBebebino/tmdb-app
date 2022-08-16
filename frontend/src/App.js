import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import MainNavigation from "./components/MainNavigation";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import MoviesDetailsPage from "./pages/MoviesDetailsPage";
import TVShowsDetailsPage from "./pages/TVShowsDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv-shows" element={<TVShowsPage />} />
        <Route path="/movies/:id" element={<MoviesDetailsPage />} />
        <Route path="/tv-shows/:id" element={<TVShowsDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
