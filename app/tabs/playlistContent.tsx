import { View, StyleSheet, ScrollView} from "react-native";
import React from 'react';
import { Text, Button} from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setCurrentSongList } from "@/store/slices/songListSlice";
import {  setSongIndex, setIsPlaying  } from "@/store/slices/playerSlice";
// https://reactnativeelements.com/docs

// Interfaces
interface Song {
  title: string;
  artist: string;
}

interface Entry {
  playlistName: string;
  song: Song;
}

// Very similar to album display, minus an image displayed, will improve later
const InsidePlaylist: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const playlist = useSelector((state: RootState) => state.playlist);
  const albumState = useSelector((state: RootState) => state.album);  

  const handleSongChange = (index: number) => {
    const currentSongList = playlist.displayPlaylist.songs.map(song => song.title);
    dispatch(setCurrentSongList(currentSongList));
    dispatch(setIsPlaying(true));
    dispatch(setSongIndex(index));
  };

  const changeSongColor = (name: string) => name === albumState.nameOfSong ? 'black' : 'white';

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      >
        <Text h1 style={styles.title}>{[playlist.displayPlaylist.nameOfPlaylist]}</Text>

       <ScrollView>
        {playlist.displayPlaylist.songs.map((list, index) => (
            <View>
            <Button onPress={() => handleSongChange(index)}>
            <Text key={index} style={{color: changeSongColor(list.title)}} h3>{list.title}</Text>
            <Text key={index} style={{color: changeSongColor(list.title)}} h4>{list.artist}</Text>
            </Button>
            </View>
        ))} 
       </ScrollView>
 
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  }
});

export default InsidePlaylist;