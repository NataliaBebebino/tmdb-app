import React, { useState } from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [enteredSearch, setEnteredSearch] = useState("");

  const searchInputChangeHandler = (event) => {
    setEnteredSearch(event.target.value);
  };

  const searchBarHandler = () => {
    props.onSearch(enteredSearch);
    setEnteredSearch("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchBarHandler();
    }
  };

  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className={classes.search}>
            {/* <i className="fa fa-search"></i> */}
            <input
              type="text"
              className="form-control"
              placeholder={props.placeholder}
              value={enteredSearch}
              onChange={searchInputChangeHandler}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-dark" onClick={searchBarHandler}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
