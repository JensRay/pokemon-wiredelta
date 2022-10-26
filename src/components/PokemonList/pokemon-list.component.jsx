import { useState, useEffect } from "react";
import axios from "axios";

import DarkMode from "../UI/dark-mode.component";
import PokemonCard from "../PokemonCard/pokemon-card.component";
import Navigation from "../navigation/navigation.component";

import "./pokemon-list.styles.scss";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [filter, setFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(0);

  const changeLimit = (limit) => {
    setLimit(Number(limit));
  };

  const paginateNext = () => {
    if (offset + limit < count) {
      setOffset(offset + limit);
    }
  };

  const paginatePrev = () => {
    if (offset > 19) {
      setOffset(offset - limit);
    }
  };

  const filterSearchedPokes = (searchPhrase) => {
    setFilter(searchPhrase);
  };

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
      setPokemons(res.data["results"]);
      setCount(res.data.count);
    }
    async function getAllData() {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${count}&offset=${offset}`
      );
      setAllPokemons(res.data["results"]);
    }
    getData();
    getAllData();
  }, [limit, offset, count]);

  return (
    <div className="main-container">
      <Navigation
        changeLimit={changeLimit}
        filterSearchedPokes={filterSearchedPokes}
      />
      <div className="pokemon-list__container">
        <div className="pokemon-list__header">
          <div className="pagination">
            <span
              onClick={paginatePrev}
              className={`${
                offset + 1 > limit && "pagination__active"
              } pagination__button`}
            >
              Previous page
            </span>
            <span className="pagination__counter">{`${offset + 1} / ${
              offset + limit
            }`}</span>
            <span
              onClick={paginateNext}
              className={`${
                offset < count ? "pagination__active" : ""
              } pagination__button`}
            >
              Next page
            </span>
          </div>
          <DarkMode />
        </div>
        <div className="pokemon-list__grid">
          {pokemons ? (
            <div className="row">
              {(filter !== "" ? allPokemons : pokemons)?.map(
                (pokemon) =>
                  pokemon.name.includes(filter) && (
                    <PokemonCard
                      key={pokemon.name}
                      name={pokemon.name}
                      url={pokemon.url}
                    />
                  )
              )}
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
