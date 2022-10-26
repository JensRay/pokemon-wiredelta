import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import DarkMode from "../UI/dark-mode.component";
import PropertiesDropdown from "../UI/properties-dropdown.component";
import SuggestedItems from "../UI/suggested-items.component";

import "./pokemon-page.styles.scss";

function capitalize(w) {
  return w[0].toUpperCase() + w.slice(1);
}

const PokemonPage = () => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [pokemonIndex, setPokemonIndex] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [baseExperience, setBaseExperience] = useState(0);
  const [isDefault, setIsDefault] = useState("");
  const [order, setOrder] = useState("");
  const [species, setSpecies] = useState("");
  const [abilities, setAbilities] = useState([]);
  const [form, setForm] = useState("");
  // const [types, setTypes] = useState([]);
  // const [gameIndices, setGameIndices] = useState([]);
  // const [stats, setStats] = useState([]);
  // const [moves, setMoves] = useState([]);

  const { id } = useParams();
  let navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setPokemonIndex(id);
    async function fetchData() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
      setUrl(url);
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;
      const res = await axios.get(url);
      const data = res.data;
      const name = data.name;
      const weight = data.weight;
      const height = data.height;
      const baseExperience = data.base_experience;
      const isDefault = data.is_default;
      const order = data.order;
      const species = data.species.name;
      const abilities = data.abilities?.map((ability) => ability.ability.name);
      const form = data.forms.name;
      // const abilities = data.abilities?.map((ability) => ability.ability.name);
      // const abilities = data.abilities?.map((ability) => ability.ability.name);
      // const abilities = data.abilities?.map((ability) => ability.ability.name);
      // const abilities = data.abilities?.map((ability) => ability.ability.name);

      setName(name);
      setImageUrl(imageUrl);
      setWeight(weight);
      setHeight(height);
      setBaseExperience(baseExperience);
      setIsDefault(isDefault);
      setOrder(order);
      setSpecies(capitalize(species));
      setAbilities(abilities);
      setForm(form);
    }
    fetchData();
  }, [id, pokemonIndex]);

  return (
    <div className="pokemon-page">
      <div className="pokemon-page__heading">
        <div className="pokemon-page__heading-side-box">
          <Link className="pokemon-page__button-back" onClick={handleClickBack}>
            &#10094; Back
          </Link>
        </div>
        <div className="pokemon-page__heading-box">
          <img className="pokemon-page__main-img" src={imageUrl} alt={name} />
        </div>
        <div className="pokemon-page__heading-side-box">
          <DarkMode />
        </div>
      </div>
      <h2 className="pokemon-page__title">{name.toUpperCase()}</h2>
      <div className="pokemon-page__pokemon-main-properties">
        <span>Height: {height}</span>
        <span>Weight: {weight}</span>
        <span>Base experience: {baseExperience}</span>
        <span>Default: {isDefault.toString()}</span>
        <span>Order: {order}</span>
        <span>Species: {species}</span>
      </div>
      <div className="pokemon-page__properties-dropdowns">
        <PropertiesDropdown title={"Abilities"}>
          {abilities?.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </PropertiesDropdown>
        <PropertiesDropdown title={"Form"} />
        <PropertiesDropdown title={"Types"} />
        <PropertiesDropdown title={"Game Indices"} />
        <PropertiesDropdown title={"Stats"} />
        <PropertiesDropdown title={"Moves"} />
      </div>
      <SuggestedItems pokemonIndex={pokemonIndex} />
    </div>
  );
};

export default PokemonPage;
