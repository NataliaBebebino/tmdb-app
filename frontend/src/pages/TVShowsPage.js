import React, { useContext, useState , useEffect} from "react";
import MediaCardList from "../components/MediaCardList";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import TvShowSearchContext from "../store/search-tv-show-context";

const TVShowsPage = () => {
  const [tvShowList, setTvShowList] = useState([]);
  const tvShowSearchCtx = useContext(TvShowSearchContext)

  const searchTvShow = (enteredSearch) => {
    if (!enteredSearch) {
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=2e023c6fdb74b3b2d57ea6c91d6c138f&query=${enteredSearch}`
      )
      .then((response) => {
        let tvShows = response.data.results.map((item) => {
          let tvShowsData = {
            title: item.name,
            average: item.vote_average,
            image: item.poster_path,
            id: item.id,
            mediaType: "tv",
          };
          return tvShowsData;
        });

        setTvShowList(tvShows);
      });
  };

  const searchHandler = (enteredSearch) => {
    tvShowSearchCtx.changeTvShowSearch(enteredSearch);
    searchTvShow(enteredSearch);
  };

  useEffect(() => {
    searchTvShow(tvShowSearchCtx.tvShowSearch);
  }, []);
  
  return (
    <div>
      <h1>TV Shows</h1>
      <SearchBar
        placeholder={"Enter name of the TV show"}
        onSearch={searchHandler}
      />
      <br></br>
      <MediaCardList mediaData={tvShowList} />
    </div>
  );
};

export default TVShowsPage;
