import React, { useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Image,} from 'react-native';
import { useMusicPlayer } from './Contexts.js/MusicPlayerContext';
import {  Heading, HStack, Box, VStack, Pressable } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { importedAlbums } from './Albums';

// Whats new and recoomended are just for show and proof of concept, may change later

const Home = ({navigation}) => {

    const {
        setNumSongs,
        setCurrentSongList,
        setNameOfAlbum,
        setNameOfArtist,
        setAlbumCover,
    } = useMusicPlayer();

    
    // Set info for the chosen album
    const albumDetails = (album) => {
        // Get audio for selected songs:
        const updateSongList = album.songs.title.map(songTitle => downloadedList[songTitle]);
        setAudioToPlay(updateSongList);

        // Other info for chosen album
        setNameOfAlbum(album.title);
        setNumSongs(album.songs.title.length);
        setAlbumCover(album.cover);
        setNameOfArtist(album.artist);
        setCurrentSongList(album.songs);
        navigation.navigate("AlbumContents");
    };



    return (
        // Cool gradient background
        <LinearGradient
        colors ={['#502fb7', '#5e3ec2' /*, '#800080'*/]} 
        locations={[0.8, 1] /* transition */}
        style={{ flex: 1}}
        >
        <Heading marginTop={2}></Heading>

        {/* Formatted content vertically and scroll horizontally */}
        <VStack space={5}>
        <Box alignContent='center'>
            <Heading>Downloaded: </Heading>
            <ScrollView horizontal={true}>
            {/*Displays all albums from Album.js */}
            <HStack space={3}>
                {importedAlbums.map((album, index) => ( 
                    <Pressable key={index} onPress={() => albumDetails(album)}>
                    <Image style={styles.imageInfo} key={index} source={album.cover}></Image>
                    </Pressable>
                ))}
            </HStack>
            </ScrollView>
            </Box>
            <Box alignContent='center'>
            <Heading>Whats New: </Heading>
            <ScrollView horizontal={true}>
            <HStack space={3}>
            <Image source={require('./assets/Biscuit.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Magic.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Crossroads.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Panchiko.jpg')} style={styles.imageInfo}/>
            </HStack>
            </ScrollView>
            </Box>
            <Box alignContent='center'>
            <Heading>Recommended: </Heading>
            <ScrollView horizontal={true}>
            <HStack space={3}>
            <Image source={require('./assets/Computer.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Magic.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Crossroads.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Panchiko.jpg')} style={styles.imageInfo}/>
            </HStack>
            </ScrollView>
            </Box>
            </VStack>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    text : {
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerBox: {
        width: 300,
        height: 200,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageInfo: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
    },
});

export default Home;
