import React, { createContext, useState } from "react";

const MovieSearchContext = createContext({
  movieSearch: null,
  changeMovieSearch: (movieSearch) => {},
});

export function MovieSearchContextProvider(props) {
  const [movieSearch, setMovieSearch] = useState(null);

  const changeMovieSearch = (movieSearch) => {
    setMovieSearch(movieSearch);
  };

  const context = {
    movieSearch: movieSearch,    
    changeMovieSearch: changeMovieSearch,
  };

  return (
    <MovieSearchContext.Provider value={context}>
      {props.children}
    </MovieSearchContext.Provider>
  );
}

export default MovieSearchContext;
