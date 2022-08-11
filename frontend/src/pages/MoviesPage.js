import React from "react";
import MediaCardList from "../components/MediaCardList";
import SearchBar from "../components/SearchBar";

const MoviesPage = () => {
  return (
    <div>
      <h1>Movies</h1>
      <SearchBar />
      <br></br>
      <MediaCardList />
    </div>
  );
};

export default MoviesPage;
