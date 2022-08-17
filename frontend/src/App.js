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
import FavoritesPage from "./pages/FavoritesPage";
import { MovieSearchContextProvider } from "./store/search-movie-context";

function App() {
  return (
    <div>
      <MainNavigation />
      <MovieSearchContextProvider>
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </MovieSearchContextProvider>
      <Routes>
        <Route path="/tv-shows" element={<TVShowsPage />} />
        <Route path="/movies/:id" element={<MoviesDetailsPage />} />
        <Route path="/tv-shows/:id" element={<TVShowsDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
