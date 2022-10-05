import React, { useContext, useState, useEffect } from "react";
import MediaCardList from "../components/MediaCardList";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import TvShowSearchContext from "../store/search-tv-show-context";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TVShowsPage = () => {
  const [tvShowList, setTvShowList] = useState([]);
  const tvShowSearchCtx = useContext(TvShowSearchContext);
  const searchTvShow = (enteredSearch) => {
    if (!enteredSearch) {
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${enteredSearch}`
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
      })
      .catch(function (error) {
        console.log(error.toJSON());
        toast.error("Getting tv show detail failed");
      });
  };

  const searchHandler = (enteredSearch) => {
    tvShowSearchCtx.changeTvShowSearch(enteredSearch);
    //searchTvShow(enteredSearch);
  };

  useEffect(() => {
    searchTvShow(tvShowSearchCtx.tvShowSearch);
  }, [tvShowSearchCtx.tvShowSearch]);

  return (
    <div>
      <h1 className="text-center mt-3 mb-3">TV Shows</h1>
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
