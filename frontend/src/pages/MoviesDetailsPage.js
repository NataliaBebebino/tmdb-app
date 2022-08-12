import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MoviesDetailsPage = () => {
  const [moviesDetails, setMoviesDetails] = useState({});

  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=2e023c6fdb74b3b2d57ea6c91d6c138f`
      )
      .then((response) => {
        setMoviesDetails({
          image: response.data.backdrop_path,
          title: response.data.original_title,
        });
      });
  }, [params.id]);

  return (
    <div>
      <div>{moviesDetails.title}</div>
      <img src={`http://image.tmdb.org/t/p/w342${moviesDetails.image}`} alt="movie-img"/>
    </div>
  );
};

export default MoviesDetailsPage;
