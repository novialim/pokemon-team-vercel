import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { debounce } from "lodash";

const query = gql`
  query Pokemon($searchTerm: String!) {
    pokemon_v2_pokemon(limit: 100, where: { name: { _like: $searchTerm } }) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

interface PokemonData {
  map(arg0: (pokemon: PokemonData) => JSX.Element): React.ReactNode;
  id: number;
  name: string;
  types: string[];
  pokemon_v2_pokemonsprites: {
    front_default: string;
  };
  length: number;
}

interface PokemonDataResult {
  pokemon_v2_pokemon?: PokemonData;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [getPokemon, { loading, error, data }] =
    useLazyQuery<PokemonDataResult>(query);
  const { pokemon_v2_pokemon: pokemonData } = data || {};

  const debouncedExecuteQuery = debounce(() => {
    getPokemon({ variables: { searchTerm: `%${searchTerm}%` } });
  }, 800);

  const handleClick = () => {
    getPokemon({ variables: { searchTerm: `%${searchTerm}%` } });
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
    debouncedExecuteQuery();
  };

  return (
    <div>
      <input name="searchTerm" value={searchTerm} onChange={handleChange} />
      <button onClick={handleClick}>Search</button>
      <hr />

      {loading && <div>Searching...</div>}
      {error && <div>Error!</div>}
      {data && pokemonData?.length === 0 && <div>No results found</div>}

      {pokemonData &&
        pokemonData?.length > 0 &&
        pokemonData?.map((pokemon: PokemonData) => {
          let pokemonSprites: { [index: string]: any } = JSON.parse(
            pokemon?.pokemon_v2_pokemonsprites[0]?.sprites
          );
          console.log(pokemon?.pokemon_v2_pokemonsprites[0]?.sprites);
          return (
            <div key={pokemon.id}>
              <h2>{pokemon.name}</h2>
              <img src={pokemonSprites.front_default} alt="" />
            </div>
          );
        })}
    </div>
  );
};

export default Search;
