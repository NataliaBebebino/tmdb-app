import React from "react";
import MediaCardList from "../components/MediaCardList";
import SearchBar from "../components/SearchBar";

const MoviesPage = () => {
  const searchHandler = (enteredSearch) => {
    console.log("búsqueda", enteredSearch);
  };

  return (
    <div>
      <h1>Movies</h1>
      <SearchBar
        placeholder={"Enter name of the movie"}
        onSearch={searchHandler}
      />
      <br></br>
      <MediaCardList />
    </div>
  );
};

export default MoviesPage;
