import { View, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import React from 'react';
import { Text, Button} from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setCurrentSongList } from "@/store/slices/songListSlice";
import {  setSongIndex, setIsPlaying  } from "@/store/slices/playerSlice";
import { useAudio } from "../context";

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
  const {playSong} = useAudio();

  const handleSongChange = (songTitle: string, index: number) => {
    const currentSongList = playlist.displayPlaylist.songs.map(song => song.title);
    console.log(currentSongList);
    dispatch(setCurrentSongList(currentSongList));
    dispatch(setIsPlaying(true));
    dispatch(setSongIndex(index));
    playSong(songTitle, index);
  };

  const changeSongColor = (name: string) => name === albumState.nameOfSong ? 'black' : 'white';

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      >
        <SafeAreaView>
        <Text h1 style={styles.title}>{[playlist.displayPlaylist.nameOfPlaylist]}</Text>
         <ScrollView>
          {playlist.displayPlaylist.songs.map((list, index) => (
              <View  key={index} >
              <Button onPress={() => handleSongChange(list.title, index)} style={styles.button} color='transparent'>
                <Text  numberOfLines={2} ellipsizeMode="tail" h4 style={{color: changeSongColor(list.title)}}>{list.title} {"\n"}
                  <Text style={{color: changeSongColor(list.title)}}>{albumState.nameOfArtist}
                  </Text>
                </Text>
              </Button>
              </View>
          ))} 
         </ScrollView>
       </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
});

export default InsidePlaylist;
