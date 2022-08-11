import React from "react";
import MediaCard from "./MediaCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const MediaCardList = (props) => {
  return (
    <div className="container">
      <Row xs={2} md={4} className="g-4">
        {props.mediaData.map((item) => (
          <Col key={item.id}>
            <MediaCard
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MediaCardList;
