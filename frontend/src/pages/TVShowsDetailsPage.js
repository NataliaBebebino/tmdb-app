import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../store/users-context";
import classes from "./DetailsPage.module.css";
import Axios from "axios";
import posterNotAvailableDetailPage from "../assets/posterNotAvailableDetailPage.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

const TVShowsDetailsPage = () => {
  const [tvShowsDetails, setTvShowsDetails] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);

  const params = useParams();
  const userCtx = useContext(UserContext);

  const addToFavoritesHandler = (event) => {
    event.preventDefault(); // take a look at this line of code later
    Axios({
      method: "POST",
      data: {
        mediaId: params.id,
        type: "tv",
      },
      withCredentials: true,
      url: "http://localhost:5000/favorites/new",
    }).then((res) => {
      setIsFavourite(true);
    });
  };

  const removeFavoriteHandler = (event) => {
    event.preventDefault(); // take a look at this line of code later
    Axios({
      method: "POST",
      data: {
        mediaId: params.id,
        type: "tv",
      },
      withCredentials: true,
      url: "http://localhost:5000/favorites/remove",
    }).then((res) => {
      setIsFavourite(false);
    });
  };

  useEffect(() => {
    if (!userCtx.isAuthenticated) return;
    Axios({
      method: "POST",
      data: {
        mediaId: params.id,
        type: "tv",
      },
      withCredentials: true,
      url: "http://localhost:5000/favorites/isFavorite",
    }).then((res) => {
      setIsFavourite(res.data);
    });
  }, [params.id, userCtx.isAuthenticated]);

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
          numberOfSeasons: response.data.number_of_seasons,
          numberOfEpisodes: response.data.number_of_episodes,
          release_date: response.data.first_air_date,
        });
      });
  }, [params.id]);

  return (
    <div className={`${classes.flexcontainer} rounded-5`}>
      <div className={classes.imageItem}>
        <img
          src={
            tvShowsDetails.image
              ? `http://image.tmdb.org/t/p/w500${tvShowsDetails.image}`
              : posterNotAvailableDetailPage
          }
          alt="tv-show-img"
          className="rounded-5 img-fluid"
        />
      </div>
      <div className={classes.detailItem}>
        <h1>{tvShowsDetails.title}</h1>
        <h6 className="fst-italic">{tvShowsDetails.genreNames}</h6>
        <div>
          <p>{tvShowsDetails.synopsis}</p>
        </div>
        <div>{`⭐ ${Math.round(tvShowsDetails.average * 10) / 10}`}</div>
        <div>{`📅 ${tvShowsDetails.release_date}`}</div>
        <div>{`📺 ${tvShowsDetails.numberOfSeasons} ${
          tvShowsDetails.numberOfSeasons > 1 ? "seasons" : "season"
        } / ${tvShowsDetails.numberOfEpisodes} ${
          tvShowsDetails.numberOfEpisodes > 1 ? "episodes" : "episode"
        }`}</div>
      </div>
      {userCtx.isAuthenticated ? (
        <div className={classes.favoriteItem}>
          {isFavourite ? (
            <span onClick={removeFavoriteHandler}>
              <i
                className="bi bi-heart-fill"
                style={{
                  color: "red",
                  WebkitTextStrokeWidth: "1.5px",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              ></i>
            </span>
          ) : (
            <span onClick={addToFavoritesHandler}>
              <i
                className="bi bi-heart"
                style={{
                  color: "red",
                  WebkitTextStrokeWidth: "1.5px",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              ></i>
            </span>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TVShowsDetailsPage;
