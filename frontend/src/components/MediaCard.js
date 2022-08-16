import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";


const MediaCard = (props) => {

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
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MediaCard;
