import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MediaCard = (props) => {
  return (
    <Card style={{ width: "75%" }}>
      <Card.Img
        variant="top"
        src={`http://image.tmdb.org/t/p/w342${props.poster_path}`}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>Some text</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
