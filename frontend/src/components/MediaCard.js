import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MediaCard = () => {
  return (
    <Card style={{ width: "75%" }}>
      <Card.Img variant="top" src="http://image.tmdb.org/t/p/w500/9Rj8l6gElLpRL7Kj17iZhrT5Zuw.jpg" />
      <Card.Body>
        <Card.Title>Movie Title</Card.Title>
        <Card.Text>
          Some text
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
