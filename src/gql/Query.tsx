import { gql } from "@apollo/client";

// Define the GraphQL query
export const POKEMON_QUERY = gql`
    query GetPokemonDataQuery {
        pokemon_v2_pokemon(order_by: {id: asc}) {
            id
            name
            height
            weight
            pokemon_v2_pokemonspecy {
                name
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                    name
                }
            }
            pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                  name
                }
            }
            pokemon_v2_pokemonstats {
                pokemon_id
                pokemon_v2_stat {
                    pokemon_v2_pokemonstats {
                        base_stat
                        effort
                    }
                }
            }
        }  
    }
`;