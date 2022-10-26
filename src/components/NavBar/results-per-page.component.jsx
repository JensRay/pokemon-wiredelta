import { useEffect, useState } from "react";
import "./results-per-page.styles.scss";

const ResultsPerPage = (props) => {
  const [isActive, setIsActive] = useState("");
  const [resultsNumber, setResultsNumber] = useState(20);

  useEffect(() => {
    props.changeLimit(resultsNumber);
  }, [resultsNumber, props]);

  const toggleList = () => {
    setIsActive(!isActive);
  };

  const handleClick = () => {
    toggleList();
  };

  const handleClickResultsPerPage = (event) => {
    setResultsNumber(event.target.value);
  };

  return (
    <div className="results-per-page">
      <button
        className="results-per-page__dropdown__button"
        onClick={handleClick}
      >
        <span>{`Showing ${resultsNumber} results`}</span>
        {!isActive ? <span>&#65088;</span> : <span>&#65087;</span>}
      </button>
      {isActive ? (
        <div className="results-per-page__dropdown-container">
          <button
            value={10}
            onClick={handleClickResultsPerPage}
            className={resultsNumber === "10" ? "results-per-page__active" : ""}
          >
            Show 10 results
          </button>
          <button
            value={20}
            onClick={handleClickResultsPerPage}
            className={resultsNumber === "20" ? "results-per-page__active" : ""}
          >
            Show 20 results
          </button>
          <button
            value={30}
            onClick={handleClickResultsPerPage}
            className={resultsNumber === "30" ? "results-per-page__active" : ""}
          >
            Show 30 results
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ResultsPerPage;
