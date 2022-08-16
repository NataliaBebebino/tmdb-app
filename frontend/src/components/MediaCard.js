import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import UserContext from "../store/users-context";
import Axios from "axios";

const MediaCard = (props) => {
  const userCtx = useContext(UserContext);

  const addToFavoritesHandler = (event) => {
    event.preventDefault(); // take a look at this line of code later

    Axios({
      method: "POST",
      data: {
        mediaId: props.id,
        type: props.mediaType,
      },
      withCredentials: true,
      url: "http://localhost:5000/favorites/new",
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <Link
      to={`${props.mediaType === "movie" ? "/movies/" : "/tv-shows/"}${
        props.id
      }`}
    >
      <Card style={{ width: "12rem" }}>
        <Card.Img
          style={{ height: "18rem", width: "12rem" }}
          variant="top"
          src={`http://image.tmdb.org/t/p/w342${props.image}`}
        />
        <Card.Body>
          {/* <Card.Title>{props.title}</Card.Title> */}
          <div className="container">
            <div className="col-md-12 text-center">
              <Card.Subtitle className="mb-2 text-muted">{`Ranking: ${props.average} ⭐`}</Card.Subtitle>

              {userCtx.isAuthenticated ? (
                <Button
                  className="btn btn-danger"
                  onClick={addToFavoritesHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MediaCard;
