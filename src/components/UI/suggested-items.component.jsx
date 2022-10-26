import "./suggested-items.styles.scss";

import PokemonCard from "../PokemonCard/pokemon-card.component";

const SuggestedItems = (props) => {
  return (
    <div className="suggested-items__container">
      <h2>You Might Also Like</h2>
      <div className="suggested-items__items">
        <PokemonCard
          className="suggested-item"
          // pokemonIndex={props.pokemonIndex}
        />
        <PokemonCard />
        <PokemonCard />
      </div>
    </div>
  );
};

export default SuggestedItems;
