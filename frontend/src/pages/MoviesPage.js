import React, { useState, useContext, useEffect } from "react";
import MediaCardList from "../components/MediaCardList";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import MovieSearchContext from "../store/search-movie-context";

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const movieSearchCtx = useContext(MovieSearchContext);

  const searchMovies = (enteredSearch) => {
    if (!enteredSearch) {
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2e023c6fdb74b3b2d57ea6c91d6c138f&query=${enteredSearch}`
      )
      .then((response) => {
        let movies = response.data.results.map((item) => {
          let moviesData = {
            title: item.title,
            average: item.vote_average,
            image: item.poster_path,
            id: item.id,
            mediaType: "movie",
          };
          return moviesData;
        });

        setMovieList(movies);
      });
  };

  const searchHandler = (enteredSearch) => {
    movieSearchCtx.changeMovieSearch(enteredSearch);
    searchMovies(enteredSearch);
  };

  useEffect(() => {
    searchMovies(movieSearchCtx.movieSearch);
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <SearchBar
        placeholder={"Enter name of the movie"}
        onSearch={searchHandler}
      />
      <br></br>
      <MediaCardList mediaData={movieList} />
    </div>
  );
};

export default MoviesPage;
