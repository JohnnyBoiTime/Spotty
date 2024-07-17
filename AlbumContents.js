import React, { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { useMusicPlayer } from './Contexts.js/MusicPlayerContext';
import { Heading, Image, VStack, Text,Button, ScrollView, Stack, Box} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

// https://stackoverflow.com/questions/47922687/force-react-to-reload-an-image-file Help with image to use key to force re-render

const InsideTheAlbum = () => {
    const {
        nameOfAlbum,
        nameOfArtist,
        setAudioToPlay,
        downloadedList,
        changeSongList,
        setCurrentSongList,
        albumCover,
        nameOfSong,
        setSongIndex,
    } = useMusicPlayer();

    // Changes index to change song so useEffect can work
    const handleSongChange = (index) => {

        setCurrentSongList(changeSongList);
        // Get audio for selected songs once user taps on song
        const updateSongList = changeSongList.title.map(songTitle => downloadedList[songTitle]);
        setAudioToPlay(updateSongList);
        setSongIndex(index);
    };

    // Changes song color based on name, potential problem
    // if there are 2 songs with the same name, probably
    // make it so artist name and specific album have to
    // be the same
    const changeSongColor = (name) => {
        return name === nameOfSong ? 'black' : 'white';
    };

    return (
      <LinearGradient
      colors ={['#32174d', '#87ceeb']} 
      locations={[1, 1]}
      style={{ flex: 1}}
      >
          <Heading size="xl" textAlign={'center'} paddingTop={8} color="white" >{nameOfAlbum}</Heading>
          <Image key={albumCover} source={albumCover} style={styles.imageInfo}/>
          <VStack space={1} alignItems='center'>
          <Heading  alignItems='center'> <Text color='white'>{nameOfArtist}</Text></Heading> 
          </VStack>
          <Box>
          <ScrollView>
          <VStack alignItems='flex-start' width= '100%'>
            { changeSongList.title.map((song, index) => (
                <Button key={index} background='transparent' style={styles.songButton} height={10} onPress={() => handleSongChange(index)}> 
                    <Stack>
                        <Heading isTruncated size='md' mb='0' ml='-1' color={changeSongColor(song)}> {song}</Heading>
                        <Text ml='0.9' mt='-2' color='white'>{nameOfArtist}</Text>
                    </Stack>
                </Button>
            ))} 
          </VStack>
          </ScrollView>
          </Box>
      </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
    songContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    songNames: {
        textAlign: 'left',
        fontSize: 18,
    },
    artistNames: {
        textAlign: 'left',
    },
    imageInfo: {
        width: 200,
        height: 200,
        marginLeft: 100,
        resizeMode: 'cover',
    },
    songButton: {
        justifyContent: 'flex-start',
        paddingLeft: 10,
        width: '100%'
    }
});

export default InsideTheAlbum;
