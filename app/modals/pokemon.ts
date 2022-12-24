export interface PokemonData {
  id: number;
  name: string;
  types?: string[];
  evolution?: {
    id: number;
    image: string;
  }[];
  //Stats
  baseHappines?: number;
  captureRate?: number;
  hatchCounter?: number;
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
  selected: boolean;
}

export interface PokemonDataResult {
  pokemon_v2_pokemon?: PokemonData[];
}
