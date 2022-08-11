import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MediaCard = (props) => {
  return (
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
  );
};

export default MediaCard;
