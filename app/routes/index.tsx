import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import PokemonCard from "~/components/PokemonCard"
import PokemonResults from "~/components/PokemonResults"
import Search from "~/components/Search"

import { useLazyQuery } from "@apollo/client"

import type { PokemonData, PokemonDataResult } from '~/modals/pokemon';
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

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonData[]>([]);
  const [getPokemon, { loading, error, data }] =
    useLazyQuery<PokemonDataResult>(query);
  const { pokemon_v2_pokemon: pokemonData }: PokemonDataResult = data || {};

  const [pokemonResults, setPokemonResults] = useState<PokemonData[]>([]);

  useEffect(() => {
    let updatedPokemonResults = Array.isArray(pokemonData)
      ? [...pokemonData]
      : [];

    // create a Set of selected pokemon names to reduce time complexity
    const selectedPokemonNames = new Set(
      selectedPokemons.map((pokemon) => pokemon.name)
    );

    // set default selected value to false for each pokemon
    updatedPokemonResults = updatedPokemonResults.map((pokemon) => {
      return { ...pokemon, selected: selectedPokemonNames.has(pokemon.name) };
    });

    setPokemonResults(updatedPokemonResults);
  }, [pokemonData, selectedPokemons]);

  useEffect(() => {
    const storedSelectedPokemons = JSON.parse(
      localStorage.getItem('selectedPokemons') || '[]'
    );
    setSelectedPokemons(storedSelectedPokemons);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedPokemons', JSON.stringify(selectedPokemons));
  }, [selectedPokemons]);

  const handleClick = () => {
    getPokemon({ variables: { searchTerm: `%${searchTerm.toLowerCase()}%` } });
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handlePokemonSelect = (pokemon: PokemonData) => {
    updatePokemon(true, pokemon.id);
    setSelectedPokemons((current) => [...current, pokemon]);
  };

  const handlePokemonDeselect = (pokemon: PokemonData) => {
    setSelectedPokemons((current) =>
      current.filter((currentPokemon) => currentPokemon.id !== pokemon.id)
    );
    updatePokemon(false, pokemon.id);
  };

  const updatePokemon = (state: boolean, id: number) => {
    let updatedPokemonResults = pokemonResults;

    let index = updatedPokemonResults?.findIndex((pokemon) => pokemon.id == id);
    if (index !== -1 && updatedPokemonResults && index !== undefined) {
      updatedPokemonResults[index].selected = state;
      setPokemonResults([...updatedPokemonResults]);
    }
  };

  return (
    <main className='p-4'>
      <div className='flex'>
        <div className='w-1/2'>
          <h1 className='pb-2'>Welcome to Pokemon Team</h1>
          <Search
            searchTerm={searchTerm}
            handleChange={handleChange}
            handleClick={handleClick}
          />
          <div>My Pokémons</div>
          <div className='flex flex-wrap'>
            {selectedPokemons &&
              selectedPokemons.map((pokemon) => {
                return (
                  <PokemonCard
                    pokemon={pokemon}
                    key={pokemon.id}
                    handlePokemonSelect={handlePokemonSelect}
                    deselect={true}
                    handlePokemonDeselect={handlePokemonDeselect}
                  />
                );
              })}
          </div>
        </div>
        <div className='w-1/2'>
          {pokemonResults && (
            <PokemonResults
              loading={loading}
              error={error}
              data={pokemonResults}
              handlePokemonSelect={handlePokemonSelect}
              disableAll={selectedPokemons.length >= 6}
            />
          )}
        </div>
      </div>
    </main>
  );
}
