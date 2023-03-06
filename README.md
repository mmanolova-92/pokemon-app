# Pokemon App

The Pokemon App provides basic browsing and discovering features of the pokemons.

## Project Description

The Pokemon app lists all the pokemons with their image and name, and provides a search function which allows the user to look up for a specific pokemon by its name. Furthermore, the user can select a Pokemon and basic information about its specy, height, weight, types and abilities is shown in a popup window. The app is created with React Native and TypeScript. Expo is used as a baseline due to its ability to show the progress of the app development directly on the phone or a web browser. The data is retrieved from the [Pokemon API](https://pokeapi.co/)  by using GraphQL.

## Requirements

- Git
- Node
- Expo

## Installation

Clone the repo and install the dependencies.

```bash
git clone https://github.com/mmanolova-92/pokemon-app.git
cd pokemon-app
npm install
npx expo start
```

## Folder Structure

The folder structure is automatically defined by creating the app. Additionally, a **src** folder is created for the components, TypeScript interfaces, and GraphQL query. 

```
pokemon-app
└───.expo
└───.git
└───assets
└───node_modules
└───src
│   └───components
│   │   Header.tsx
│   │   HomeScreen.tsx
│   │   PokemonDetailsModal.tsx
│   │   PokemonList.tsx
│   └───gql
│       │   Query.tsx
│   └───interfaces
│   │   Pokemon.tsx
│   .gitignore
│   app.json
│   App.tsx
│   babel.config
│   package.json
│   package-lock.json
│   README.md
│   tsconfig.json
```

## Usage

The app is created by using a blank TypeScript template for Expo apps.

```bash
npx create-expo-app -t expo-template-blank-typescript PokemonApp
```

Apollo Client was chosen as a state management library to fetch data with GraphQL and is set up in the **App.tsx** file. The URL of the Pokemon API is specified and the React Native app is wrapped in the Apollo Provider component. 

```bash
const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache()
});
```

```bash
<ApolloProvider client={client}>
   <SafeAreaProvider>
      <View style={styles.container}>
          <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
</ApolloProvider>
```

Then, the GraphQL query is defined in the **Query.tsx** file.

```bash
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
```

A separate component is created for the app home screen and the GraphQL query is executed by using the **useQuery** function of Apollo Client. The retrieved data is passed to the component that lists all the pokemons in the app. Additionally, an app header is added to the home screen.

```bash
const HomeScreen: React.FC = () => {
    const { data, loading } = useQuery(POKEMON_QUERY);
    if (loading) {
        return <Text>Fetching pokemon data...</Text>
    }
    return (
        <View style={styles.container}>
            <Header />
            <PokemonList data={data.pokemon_v2_pokemon}/>
        </View>
    )
};
```

The app header is created in a separate component by using Appbar from the **react-native-paper** library. 

```bash
const Header: React.FC = () => {
    return (
        <Appbar.Header>
            <Appbar.Content 
                title="POKEMON APP"
                style={styles.header}
                titleStyle={styles.title} />
        </Appbar.Header>
    )
}
```

As the Pokemon data retrieved from the API is passed to another component for listing the pokemons, an interface is created to define the structure of an object that contains the information about each pokemon. This interface is created in a separate file because it can be imported and used in many components of the app easily.

```bash
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
```

In the list component the pokemon data passed from the home screen is defined as an array of type the interface **Pokemon**.

```bash
interface PokemonData {
    pokemons: Pokemon[];
}

interface Props {
    data: PokemonData;
};
```

The pokemon images can be accessed by using a base URL and adding the pokemon id to it.

```bash
const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
```

The app provides a search functionality. Therefore, an initial array is created and populated with the data retrieved from the API. Additionally, an array with pokemon data is created and the initial array is assigned to it. Then, a search state is defined and set to an empty string. The search function is implemented by updating the search state with the text provided by the user in the searchbar and initiating the filtering if the text has at least 3 characters. The filtered pokemon data is automatically added to an array and the pokemon data array is updated. In case the search query is empty, then the initial array is shown in the app.

```bash
const PokemonList: React.FC<Props> = ({ data }) => {
    const initialList = data;
    const [pokemonList, setPokemonList] = useState<PokemonData>(initialList);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (searchQuery.length >= 3) {
            let pokemonListFiltered = pokemonList.filter((pokemon: Pokemon) => pokemon.name.match(searchQuery.toLowerCase()));
            if (query || query !== '') {
                setPokemonList(pokemonListFiltered);
            }
        } else {
            setPokemonList(initialList);
        }
    }
    ...
};
```

When the user selects a pokemon in the app, a modal appears on the screen and shows more information about the chosen pokemon. For that a modal state is defined and its visibility is set to false, and a function to hide the modal is implemented. In addition, an object is created to receive information about the selected pokemon to be able to show it in the modal.

```bash
const PokemonList: React.FC<Props> = ({ data }) => {
    ...
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const hideModal = () => setModalVisible(false);
    const [pokemonSelected, setPokemonSelected] = useState<Pokemon>();
    ...
};
```

The image and name of the pokemons are shown in a list of cards provided by the **react-native-paper** library. In the next step, the content of the cards is defined. The card item receives pokemon data with the same structure as the one of the **Pokemon** interface. Each card is wrapped in a button to enable opening the modal by updating the modal state and the selected pokemon object on a button press. Then, the image and name of the pokemon are added.

```bash
const PokemonList: React.FC<Props> = ({ data }) => {
    ...
    const PokemonItem = ({pokemon} : { pokemon: Pokemon}) => {
        return (
            <TouchableOpacity 
                onPress={() => {
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
    ...
};
```

The list of cards containing the basic pokemon information is defined and a search bar is added as a header of the list. The modal showing additional information about the selected pokemon is called and the required data for it is passed. 

```bash
const PokemonList: React.FC<Props> = ({ data }) => {
    ...
    return (
        <View style={styles.container}>
            <FlatList 
                style={[styles.container, { marginLeft: 5.5, marginTop: 7.5 }]}
                numColumns={4}
                data={pokemonList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PokemonItem pokemon={item}/>}
                ListHeaderComponent={
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
```

The data that the modal receives is defined in the **Props** inferface.

```bash
interface Props {
    isModalVisible: boolean;
    hideModal: () => void;
    pokemon: Pokemon;
    baseUrl: string;
};
```

The modal is created by using a card with the image of the selected pokemon and its attributes like height, weight, specy, types and abilities. 

```bash
const PokemonDetailsModal: React.FC<Props> = ({ isModalVisible, hideModal, pokemon, baseUrl }) => {
    return (
        <View>
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
                                        <Text style={styles.infoTitle}>Specy/Text>
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
```

## Credits

[Pokemon API GraphQL Console](https://beta.pokeapi.co/graphql/console/)

[Apollo GraphQL Tutorial](https://www.apollographql.com/docs/react/get-started)

[Creating Expo apps](https://docs.expo.dev/get-started/create-a-new-app/)

[React Native Core Components](https://reactnative.dev/docs/components-and-apis)

[React Native Paper Components](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator)

[React Native + TypeScript Tutorial](https://reactnative.dev/docs/typescript)

[TypeScript Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
