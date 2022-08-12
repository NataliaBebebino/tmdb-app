import React from "react";
import MediaCard from "./MediaCard";
import classes from "./MediaCardList.module.css";

const MediaCardList = (props) => {
  return (
    <div className="container">
      <div className={classes.flexcontainer}>
        {props.mediaData.map((item) => (
          <div key={item.id} className={classes.flexitem}>
            <MediaCard
              title={item.title}
              image={item.image}
              average={item.average}
              id={item.id}
              mediaType={item.mediaType}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MediaCardList;
