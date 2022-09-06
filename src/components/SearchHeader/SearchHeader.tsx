import React from "react";
import "./SearchHeader.scss";
import icon from "../../assets/icons/icon-search.svg";

function SearchHeader() {
  return (
    <div className="search">
      <input
        type="text"
        className="search__field"
        placeholder="Search for movies or TV series"
      ></input>
    </div>
  );
}

export default SearchHeader;
