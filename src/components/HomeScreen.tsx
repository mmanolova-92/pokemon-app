import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { POKEMON_QUERY } from '../gql/Query';
import Header from './Header';
import PokemonList from './PokemonList';

const HomeScreen: React.FC = () => {

    // Execute the query to get the continent data
    const { data, loading } = useQuery(POKEMON_QUERY);

    // Add a message while the pokemon data are being fetched
    if (loading) {
        return <Text>Fetching pokemon data...</Text>
    }

    return (
        <View style={styles.container}>
            {/* Add header to the app and send the pokemon data to the respective component */}
            <Header />
            <PokemonList data={data.pokemon_v2_pokemon}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 0
    }
});

export default HomeScreen;