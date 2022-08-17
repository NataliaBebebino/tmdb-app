import React, { createContext, useState } from "react";

const TvShowSearchContext = createContext({
  tvShowSearch: null,
  changeTvShowSearch: (tvShowSearch) => {},
});

export function TvShowSearchContextProvider(props) {
  const [tvShowSearch, setTvShowSearch] = useState(null);

  const changeTvShowSearch = (tvShowSearch) => {
    setTvShowSearch(tvShowSearch);
  };

  const context = {
    tvShowSearch: tvShowSearch,    
    changeTvShowSearch: changeTvShowSearch,
  };

  return (
    <TvShowSearchContext.Provider value={context}>
      {props.children}
    </TvShowSearchContext.Provider>
  );
}

export default TvShowSearchContext;