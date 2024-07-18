import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Heading, Menu, Box, Button, Pressable, Input, View, Icon, List, composeEventHandlers, FlatList } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { importedAlbums } from './Albums';
import { useMusicPlayer } from './Contexts.js/MusicPlayerContext';

// Search albums, artist, songs, etc.

const Search = () => {

    const IconName = ["person-sharp", "disc-sharp", "musical-notes-sharp"];
    const [useIcon, setUseIcon] = useState(IconName[0]); // Set use icon initially
    const [searchResults, setSearchResults] = useState(0);

    const {
        setSongIndex,
    } = useMusicPlayer();

    const changeIcon = (value) => {
        setUseIcon(value);
        console.log(useIcon);
    };

    const placeHolderName = {
        'albums' : 'All',
        'person-sharp': 'Search by artist',
        'disc-sharp': 'Search by Album',
        'musical-notes-sharp': 'Search by Song',
    };

    // Change search results
    const changeDisplayed = () => {

        switch (searchResults) {
            case 0: // Display All
            return <FlatList
                data={importedAlbums}
                renderItem={({item}) => (
                    <View>
                    <Heading style={styles.songColor}>{item.artist}</Heading>
                    <Text style={styles.album}>{item.title}</Text>
                    {item.songs.title.map((song, index) => (
                    <TouchableOpacity key={index} onPress={() => console.log(`${song}`)}>
                        <Text style={styles.songColor}>{song}{"\n"}</Text>
                    </TouchableOpacity>
                    ))} 
                    </View>
                )}
                keyExtractor={(item) => item.songs.title}
                />;
            case 1: // Search by artist
                return <FlatList
                data={importedAlbums}
                renderItem={({item, index}) => (
                    <View>
                    <TouchableOpacity key={index} onPress={() => console.log(`${song} `)}>
                        <Text style={styles.songColor} >{item.artist}{"\n"}</Text>
                    </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.songs.title}
                />;
            case 2: // Search by album MAYBE HAVE IT SO WHEN USER CLICKS ON ALBUM IT DISPLAYS ALL THE SONGS!
                return <FlatList
                data={importedAlbums}
                renderItem={({item, index}) => (
                    <View>
                    <TouchableOpacity key={index} onPress={() => console.log(`${song} `)}>
                        <Text style={styles.songColor} >{item.title}{"\n"}</Text>
                    </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.songs.title}
                />;
            case 3: // Search by song
                return <FlatList
                data={importedAlbums}
                renderItem={({item}) => (
                    <View>
                    {item.songs.title.map((song, index) => (
                    <TouchableOpacity key={index} onPress={() => console.log(`${song}`)}>
                        <Text style={styles.songColor} >{song}{"\n"}</Text>
                    </TouchableOpacity>
                    ))} 
                    </View>
                )}
                keyExtractor={(item) => item.songs.title}
                />;
            default:
                return <Text>OK</Text>
        }

    };

    return <LinearGradient
        colors ={['#32174d', '#87ceeb' /*, '#800080'*/]} 
        locations={[1, 1] /* transition */}
        style={{ flex: 1}}
        >
            <Heading size="xl" textAlign={'center'} paddingTop={8} color="white" ></Heading>
            <Input 
            InputRightElement={
            <Box><Menu backgroundColor="#313336" w="190" closeOnSelect={false} trigger={triggerProps => {
                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <Icon as={<Ionicons name={useIcon}/>} 
                    size={5}
                    />
                </Pressable>;
                
            }}>
                <Menu.OptionGroup title="Search by:" value={useIcon} onChange={(value) => changeIcon(value)} defaultValue="person-sharp" type="radio" >
                <Menu.ItemOption value="albums" onPress={() => setSearchResults(0)}><Text style={styles.textColor}>All</Text></Menu.ItemOption>
                <Menu.ItemOption value="person-sharp" onPress={() => setSearchResults(1)}><Text style={styles.textColor}>Artist</Text></Menu.ItemOption>
                <Menu.ItemOption value="disc-sharp" onPress={() => setSearchResults(2)}><Text style={styles.textColor}>Album</Text></Menu.ItemOption>
                <Menu.ItemOption value="musical-notes-sharp" onPress={() => setSearchResults(3)}><Text style={styles.textColor}>Song</Text></Menu.ItemOption>
                </Menu.OptionGroup>
                </Menu>
                </Box> 
            }  
            color="white"
            mx="3" 
            placeholder={placeHolderName[useIcon]} 
            />
            {changeDisplayed()}
        </LinearGradient>
    
};

const styles = StyleSheet.create({
    allMusic: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    songColor: {
        color: 'white',
    },
    album: {
        fontSize: 20,
        color: 'white',
    }
});

export default Search;
