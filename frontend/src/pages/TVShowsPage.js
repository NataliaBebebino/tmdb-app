import React from "react";
import MediaCardList from "../components/MediaCardList";
import SearchBar from "../components/SearchBar";



const TVShowsPage = () => {
  return (
    <div>
      <h1>TV Shows</h1>
      <SearchBar placeholder={"Enter name of the TV show"}/>
      <br></br>
      <MediaCardList />
    </div>
  );
};

export default TVShowsPage;