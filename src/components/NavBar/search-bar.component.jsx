import { useState, useEffect } from "react";

import "./search-bar.styles.scss";

const SearchBar = (props) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearch = (event) => {
    setSearchPhrase(event.target.value);
  };

  useEffect(() => {
    props.filterSearchedPokes(searchPhrase);
    return () => {};
  }, [props, searchPhrase]);

  return (
    <div className="search-bar">
      <div className="search-bar__box">
        <i className="gg-search"></i>
        <input
          type="text"
          placeholder="Search Teams"
          onChange={handleSearch}
          value={searchPhrase}
        />
      </div>
    </div>
  );
};

export default SearchBar;
