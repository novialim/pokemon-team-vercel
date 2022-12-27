import type { PokemonData } from "~/modals/pokemon";

import { useEffect, useState } from "react"

const xCircleLogo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface PokemonCardProps {
  pokemon: PokemonData;
  handlePokemonSelect: (pokemon: PokemonData) => void;
  deselect?: boolean;
  handlePokemonDeselect?: (pokemon: PokemonData) => void;
  selected?: boolean;
  disableAll?: boolean;
}

const PokemonCard = ({
  pokemon,
  handlePokemonSelect,
  deselect = false,
  handlePokemonDeselect,
  selected = false,
  disableAll = false,
}: PokemonCardProps) => {
  let pokemonSprites = JSON.parse(
    pokemon?.pokemon_v2_pokemonsprites[0]?.sprites
  );

  const [checked, setChecked] = useState(selected);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  const handleChange = () => {
    setChecked(!selected);
    handlePokemonSelect(pokemon);
  };

  const handleOnClick = () => {
    handlePokemonDeselect && handlePokemonDeselect(pokemon);
  };

  return (
    <div
      key={pokemon.id}
      className={`relative p-4 px-8 border rounded-2xl m-2 min-h-48 min-w-48 ${
        selected && !deselect ? "opacity-25" : "opacity-100"
      }`}
    >
      {deselect ? (
        <button
          className="absolute right-4 text-red-500"
          onClick={handleOnClick}
        >
          {xCircleLogo}
        </button>
      ) : (
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="absolute right-4 cursor-pointer"
          disabled={checked || disableAll}
        />
      )}
      <h2>{pokemon.name}</h2>
      <img src={pokemonSprites.front_default} alt={pokemon.name} />
    </div>
  );
};

export default PokemonCard;
