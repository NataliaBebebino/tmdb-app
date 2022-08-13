import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import classes from "./MoviesDetailsPage.module.css";

const TVShowsDetailsPage = () => {
  const [tvShowsDetails, setTvShowsDetails] = useState({});

  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${params.id}?api_key=2e023c6fdb74b3b2d57ea6c91d6c138f`
      )
      .then((response) => {
        let genreNames = response.data.genres
          .map((genre) => {
            return genre.name;
          })
          .join(", ");

        setTvShowsDetails({
          image: response.data.backdrop_path,
          title: response.data.original_name,
          synopsis: response.data.overview,
          average: response.data.vote_average,
          genreNames: genreNames,
        });
      });
  }, [params.id]);

  return (
    <div className={`${classes.flexcontainer} rounded-5`}>
      <div className={classes.imageItem}>
        <img
          src={`http://image.tmdb.org/t/p/w500${tvShowsDetails.image}`}
          alt="tv-show-img"
          className="rounded-5"
        />
      </div>
      <div className={classes.detailItem}>
        <h1>{tvShowsDetails.title}</h1>
        <h6 className="fst-italic">{tvShowsDetails.genreNames}</h6>
        <p>{tvShowsDetails.synopsis}</p>
        <span>{`⭐ ${Math.round(tvShowsDetails.average * 10) / 10}`}</span>
      </div>
    </div>
  );
};

export default TVShowsDetailsPage;
