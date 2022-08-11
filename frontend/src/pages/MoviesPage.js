import React, { useState } from "react";
import MediaCardList from "../components/MediaCardList";
import SearchBar from "../components/SearchBar";
import axios from "axios";

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);

  const searchHandler = (enteredSearch) => {
    if (!enteredSearch) {
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2e023c6fdb74b3b2d57ea6c91d6c138f&query=${enteredSearch}`
      )
      .then((response) => {
        setMovieList(response.data.results);
      });
  };

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
