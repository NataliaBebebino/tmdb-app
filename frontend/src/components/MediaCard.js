import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import posterNotAvailable from "../assets/posterNotAvailable.png";

const MediaCard = (props) => {
  return (
    <Card className="text-white bg-dark" style={{ width: "13rem" }}>
      <Link
        to={`${props.mediaType === "movie" ? "/movies/" : "/tv-shows/"}${
          props.id
        }`}
      >
        <Card.Img
          style={{ height: "18rem", width: "100%" }}
          variant="top"
          src={
            props.image
              ? `http://image.tmdb.org/t/p/w342${props.image}`
              : posterNotAvailable
          }
        />
      </Link>
      <Card.Body>
        <div className="container">
          <div className="col-md-12 text-center">
            <Card.Subtitle className="mb-2 text-truncate">
              {props.title}
            </Card.Subtitle>
            <Card.Subtitle>{`${props.average} ⭐`}</Card.Subtitle>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
