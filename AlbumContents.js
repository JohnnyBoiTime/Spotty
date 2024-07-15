import React, { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { useMusicPlayer } from './Contexts.js/MusicPlayerContext';
import { Heading, Image, VStack, Text,Button, ScrollView} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


// Use logic for skipping the song to change the color in the album

// https://stackoverflow.com/questions/47922687/force-react-to-reload-an-image-file Help with image to use key to force re-render

const InsideTheAlbum = () => {
    const {
        nameOfAlbum,
        nameOfArtist,
        songIndex,
        currentSongList,
        albumCover,
        colorOfSong,
        setSongIndex,
    } = useMusicPlayer();

    // Changes index to change song so useEffect can work
    const handleIndexChange = (index) => {
        setSongIndex(index);
        console.log(songIndex);
    };

    return (
      <LinearGradient
      colors ={['#32174d', '#87ceeb' /*, '#800080'*/]} 
      locations={[1, 1] /* transition */}
      style={{ flex: 1}}
      >
          <Heading size="xl" textAlign={'center'} paddingTop={8} color="white" >{nameOfAlbum}</Heading>
          <Image key={albumCover} source={albumCover} style={styles.imageInfo}/>
          <VStack space={1} alignItems='center'>
          <Heading  alignItems='center'> <Text style={styles.songNames} color='white'>{nameOfArtist}</Text></Heading> 
          </VStack>
          <ScrollView>
          <VStack alignItems='flex-start'>
            { currentSongList.title.map((song, index) => (
                
                <Button key={index} background='transparent' width='100%' style={styles.songButton} height={10} onPress={() => handleIndexChange(index)} ><Text style={styles.songNames} color={colorOfSong}>{song}</Text></Button>
                
            ))} 
          </VStack>
          </ScrollView>

      </LinearGradient>
  );
};

const styles = StyleSheet.create({
    songNames: {
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
    }
});

export default InsideTheAlbum;
