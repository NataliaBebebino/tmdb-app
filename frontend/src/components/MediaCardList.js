import React from "react";
import MediaCard from "./MediaCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const MediaCardList = () => {
  return (
    <div className="container">
      <Row xs={2} md={4} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col>
            <MediaCard />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MediaCardList;
