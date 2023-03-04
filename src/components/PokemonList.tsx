import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import { Pokemon } from '../interfaces/Pokemon';
import PokemonDetailsModal from './PokemonDetailsModal';

// Define the interface for the pokemon data
interface PokemonData {
    pokemons: Pokemon[];
}

// Define the props to be received
interface Props {
    data: PokemonData;
};

// Define the base url for the Pokemon images
const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const PokemonList: React.FC<Props> = ({ data }) => {
    
    // Set an initial array with the received data
    const initialList = data;

    // Define the array with pokemon data and assign the initial array to it
    const [pokemonList, setPokemonList] = useState<PokemonData>(initialList);

    // Define the search state and set to an empty string
    const [searchQuery, setSearchQuery] = useState<string>('');
    // Implement the search function
    const handleSearch = (query: string) => {
        // Update the search state
        setSearchQuery(query);
        if (searchQuery.length >= 3) {
            // Create a new array with all elements that pass the search filter
            let pokemonListFiltered = pokemonList.filter((pokemon: Pokemon) => pokemon.name.match(searchQuery.toLowerCase()));
            if (query || query !== '') {
                // Update the array with the pokemon data if the query is not empty
                setPokemonList(pokemonListFiltered);
            }
        } else {
            // Update the array with the pokemon data if the query is empty
            setPokemonList(initialList);
        }
    }

    // Define the modal visibility state and set to false
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // Implement the function to hide the modal
    const hideModal = () => setModalVisible(false);

    // Define the object with the data of the selected pokemon
    const [pokemonSelected, setPokemonSelected] = useState<Pokemon>();

    // Define the content of the cards in the flat list 
    const PokemonItem = ({pokemon} : { pokemon: Pokemon}) => {
        return (
            <TouchableOpacity 
                onPress={() => {
                    // Update the modal visibility state to open the modal
                    setModalVisible(true);
                    setPokemonSelected(pokemon);
                }}>
                <Card style={styles.cardContainer}>
                    <Image
                        style={styles.cardImage}
                        source={{ uri: baseUrl + pokemon.id + '.png' }}
                    />
                    <Text style={styles.cardText}>{pokemon.name}</Text>
                </Card>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {/* Define the flat list with cards that contain the image and name of the pokemons */}
            <FlatList 
                style={[styles.container, { marginLeft: 5.5, marginTop: 7.5 }]}
                numColumns={4}
                data={pokemonList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PokemonItem pokemon={item}/>}
                ListHeaderComponent={
                    // Add a search bar as a header to the flat list
                    <Searchbar
                        placeholder='Search pokemon'
                        placeholderTextColor='#808080'
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
                }
            />
            <PokemonDetailsModal isModalVisible={modalVisible} hideModal={hideModal} pokemon={pokemonSelected} baseUrl={baseUrl} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    cardContainer: {
        width: 75,
        height: 130,
        margin: 10
    },
    cardImage: {
        width: 50,
        height: 50,
        resizeMode : 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
    cardText: {
        padding: 10,
        textAlignVertical: 'center',
        textAlign:'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default PokemonList;