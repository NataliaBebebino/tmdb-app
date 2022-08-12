import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const MediaCard = (props) => {
  return (
    <Link
      to={`${props.mediaType === "moviesType" ? "/movies/" : "/tv-shows/"}${props.id}`}
    >
      <Card style={{ width: "75%" }}>
        <Card.Img
          variant="top"
          src={`http://image.tmdb.org/t/p/w342${props.image}`}
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`⭐ ${props.average}`}</Card.Subtitle>
          <Button variant="primary">replace with fav icon</Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MediaCard;
