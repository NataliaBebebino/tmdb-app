import React from "react";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className={classes.search}>
            {/* <i className="fa fa-search"></i> */}
            <input
              type="text"
              className="form-control"
              placeholder="Enter name of the movie or TV show"
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
