import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Image, Text } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { Pokemon } from '../interfaces/Pokemon';

// Define the props to be received
interface Props {
    isModalVisible: boolean;
    hideModal: () => void;
    pokemon: Pokemon;
    baseUrl: string;
};


const PokemonDetailsModal: React.FC<Props> = ({ isModalVisible, hideModal, pokemon, baseUrl }) => {
    return (
        <View>
            {/* Add modal if a pokemon is selected by the user and the modal visibility state is set to true */}
            {isModalVisible &&
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={hideModal}>
                    <TouchableOpacity 
                        style={styles.modalContainer} 
                        activeOpacity={1}
                        onPressOut={hideModal}>
                        <View style={styles.modalView}>
                            <Card style={styles.modalCard}>
                                <Image
                                    style={styles.cardCover}
                                    source={{ uri: baseUrl + pokemon.id + '.png' }}
                                />
                                <View style={styles.infoColumn}>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoTitle}>Name</Text>
                                        <Text style={styles.infoText}>{pokemon.name}</Text>
                                        <Divider style={styles.divider} />
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoTitle}>Specy</Text>
                                        <Text style={styles.infoText}>{pokemon.pokemon_v2_pokemonspecy.name}</Text>
                                        <Divider style={styles.divider} />
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoTitle}>Height</Text>
                                        <Text style={styles.infoText}>{pokemon.height}</Text>
                                        <Divider style={styles.divider} />
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoTitle}>Weight</Text>
                                        <Text style={styles.infoText}>{pokemon.weight}</Text>
                                        <Divider style={styles.divider} />
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoTitle}>Types</Text>
                                        <View style={styles.infoColumn}>
                                            {pokemon.pokemon_v2_pokemontypes.map((p,idx) => {
                                                return <View key={idx}><Text style={styles.infoSubtext}>{p.pokemon_v2_type.name}</Text></View>
                                            })}
                                        </View>
                                        <Divider style={styles.divider} />
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoTitle}>Abilities</Text>
                                        <View style={styles.infoColumn}>
                                            {pokemon.pokemon_v2_pokemonabilities.map((p,idx) => {
                                                return <View key={idx}><Text style={styles.infoSubtext}>{p.pokemon_v2_ability.name}</Text></View>
                                            })}
                                        </View>
                                        <Divider style={styles.divider} />
                                    </View>
                                </View>
                            </Card>
                        </View>
                    </TouchableOpacity>
                </Modal>
            }
            </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalView: {
        width: '80%',
        height: '65%',
        margin: 20,
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalCard: {
        width: '100%',
        height: '100%'
    },
    cardCover: {
        width: 120,
        height: 120,
        alignSelf: 'center'
    },
    infoColumn: {
        flexDirection: 'column'
    },
    infoRow: {
        width: '80%',
        left: '10%'
    },
    infoTitle: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    infoText: {
        fontSize: 14
    },
    infoSubtext: {
        fontSize: 14
    },
    divider: {
        marginTop: 10,
    }
});

export default PokemonDetailsModal;