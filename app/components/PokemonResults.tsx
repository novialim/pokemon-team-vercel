import type { PokemonData } from "~/modals/pokemon";
import PokemonCard from "~/components/PokemonCard"

import type { ApolloError } from "@apollo/client";
interface PokemonResultsProps {
  loading: boolean;
  error: ApolloError | undefined;
  data: PokemonData[];
  handlePokemonSelect: (pokemon: PokemonData) => void;
  disableAll: boolean;
}

const PokemonResults = ({
  loading,
  error,
  data,
  handlePokemonSelect,
  disableAll,
}: PokemonResultsProps) => {
  return (
    <>
      {error && <div>Error!</div>}
      {!loading && data && data?.length === 0 && <div>No results found</div>}
      {data && data?.length > 0 && <div>Results:</div>}
      <div className={`flex flex-wrap`}>
        {data &&
          data?.length > 0 &&
          data?.map((pokemon: PokemonData) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                key={pokemon.id}
                handlePokemonSelect={handlePokemonSelect}
                selected={pokemon.selected}
                disableAll={disableAll}
              />
            );
          })}
      </div>
    </>
  );
};

export default PokemonResults;
