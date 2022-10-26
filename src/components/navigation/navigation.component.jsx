import { Fragment } from "react";

import ResultsPerPage from "../NavBar/results-per-page.component";
import Sorting from "../NavBar/sorting.component";
import SearchBar from "../NavBar/search-bar.component";

import "./navigation.styles.scss";

const Navigation = (props) => {
  return (
    <Fragment>
      <div className="navigation-container">
        <div className="navigation-bar">
          <ResultsPerPage changeLimit={props.changeLimit} />
          <SearchBar filterSearchedPokes={props.filterSearchedPokes} />
          <Sorting />
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
