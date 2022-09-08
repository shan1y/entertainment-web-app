import React from "react";
import "./SearchHeader.scss";

function SearchHeader(props: any) {
  const { setSearchTerm } = props;
  return (
    <div className="search">
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        className="search__field"
        placeholder="Search for movies or TV series"
      ></input>
    </div>
  );
}

export default SearchHeader;
