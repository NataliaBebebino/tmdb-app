import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Axios from "axios";
import UserContext from "../store/users-context";
import classes from "./DetailsPage.module.css";
import posterNotAvailableDetailPage from "../assets/posterNotAvailableDetailPage.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MoviesDetailsPage = () => {
  const [moviesDetails, setMoviesDetails] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);

  const params = useParams();
  const userCtx = useContext(UserContext);

  const addToFavoritesHandler = (event) => {
    event.preventDefault(); // take a look at this line of code later
    Axios({
      method: "POST",
      data: {
        mediaId: params.id,
        type: "movie",
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_URL}/favorites/new`,
    }).then((res) => {
      setIsFavourite(true);
    })
    .catch(function (error) {
      console.log(error.toJSON());
      toast.error("Adding favorite failed");
    });
  };


  const removeFavoriteHandler = (event) => {
    event.preventDefault(); // take a look at this line of code later
    Axios({
      method: "POST",
      data: {
        mediaId: params.id,
        type: "movie",
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_URL}/favorites/remove`,
    }).then((res) => {
      setIsFavourite(false);
    })
    .catch(function (error) {
      console.log(error.toJSON());
      toast.error("Removing favorite failed");
    });
  };

  useEffect(() => {
    if (!userCtx.isAuthenticated) return;
    Axios({
      method: "POST",
      data: {
        mediaId: params.id,
        type: "movie",
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_URL}/favorites/isFavorite`,
    }).then((res) => {
      setIsFavourite(res.data);
    })
    .catch(function (error) {
      console.log(error.toJSON());
      toast.error("Getting favorite failed");
    });
  }, [params.id, userCtx.isAuthenticated]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        let genreNames = response.data.genres
          .map((genre) => {
            return genre.name;
          })
          .join(", ");

        let totalMinutes = response.data.runtime;
        let minutes = totalMinutes % 60;
        let hours = (totalMinutes - minutes) / 60;
        let duration = `${hours}h ${minutes}m`;

        setMoviesDetails({
          image: response.data.backdrop_path,
          title: response.data.original_title,
          synopsis: response.data.overview,
          average: response.data.vote_average,
          genreNames: genreNames,
          release_date: response.data.release_date,
          duration: duration,
        });
      })
      .catch(function (error) {
        console.log(error.toJSON());
        toast.error("Getting movie detail failed");
      });
  }, [params.id]);

  return (
    <div className={`${classes.flexcontainer} rounded-5`}>
      <div className={classes.imageItem}>
        <img
          src={
            moviesDetails.image
              ? `http://image.tmdb.org/t/p/w500${moviesDetails.image}`
              : posterNotAvailableDetailPage
          }
          alt="movie-img"
          className="rounded-5 img-fluid"
        />
      </div>
      <div className={classes.detailItem}>
        <h1>{moviesDetails.title}</h1>
        <h6 className="fst-italic">{moviesDetails.genreNames}</h6>
        <p>{moviesDetails.synopsis}</p>
        <div>{`⭐ ${Math.round(moviesDetails.average * 10) / 10}`}</div>
        <div>{`📅 ${moviesDetails.release_date}`}</div>
        <div>{`🕑 ${moviesDetails.duration}`}</div>
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

export default MoviesDetailsPage;
