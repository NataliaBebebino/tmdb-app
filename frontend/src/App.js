import "./App.css";
import Footer from "./components/Footer";
import MainNavigation from "./components/MainNavigation";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <div>
      <MainNavigation />
      <MoviesPage />
      <Footer />
    </div>
  );
}

export default App;
