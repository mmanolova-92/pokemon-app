export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemonspecy: {
        name: string;
    };
    pokemon_v2_pokemontypes: {
        pokemon_id: number;
        pokemon_v2_type: {
            name: string;
        };
    }[];
    pokemon_v2_pokemonabilities: {
        pokemon_v2_ability: {
          name: string;
        };
    }[];
};