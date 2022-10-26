import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./pokemon-card.styles.scss";

const PokemonCard = (props) => {
  const [url, setUrl] = useState(props.url);
  const [name, setName] = useState(props.name);
  const [pokemonIndex, setPokemonIndex] = useState("");
  const [pokemonUrl, setPokemonUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // if (props.pokemonIndex) {
      //   setPokemonIndex(props.pokemonIndex);
      // }
      setPokemonIndex(url.split("/")[url.split("/").length - 2]);
      setImageUrl(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`
      );
      setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
      const res = await axios.get(pokemonUrl);
      const weight = res.data.weight;
      const height = res.data.height;
      const abilities = res.data.abilities?.map(
        (ability) => ability.ability.name
      );
      setWeight(weight);
      setHeight(height);
      setAbilities(abilities);
    }
    fetchData();
  }, [pokemonIndex, pokemonUrl, url]);

  return (
    <div className="pokemon-card__container">
      <Link to={`/pokemon/${pokemonIndex}`}>
        <div className="pokemon-card__img">
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <h3 className="pokemon-card__title">{name}</h3>
      <div className="pokemon-card__properties">
        <div className="pokemon-card__property">
          <span>Height:</span>
          <span>{height}</span>
        </div>
        <div className="pokemon-card__property">
          <span>Weight:</span>
          <span>{weight}</span>
        </div>
        <div className="pokemon-card__property">
          <span>Abilities:</span>
          <div className="pokemon-card__abilities">
            {abilities?.map((ability) => (
              <span key={ability}>{ability}</span>
            ))}
          </div>
        </div>
      </div>
      <Link
        className="pokemon-card__details-link"
        to={`/pokemon/${pokemonIndex}`}
      >
        <div>See Details</div>
      </Link>
    </div>
  );
};

export default PokemonCard;
