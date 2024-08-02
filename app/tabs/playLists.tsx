import { View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import React, {useState} from 'react';
import { AppDispatch, RootState } from "@/store";
import { createTheme, darkColors, Card, Text, Input, lightColors, Image, ThemeProvider, Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { setPlayList } from "@/store/slices/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";

interface Song {
  title: string;
  artist: string;
}

interface Playlist {
      nameOfPlaylist: string,
      playlistCover: number,
      songs: Song[],
};

// Displays created playlists
const PlayLists: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const playlist = useSelector((state: RootState) => state.playlist); 
  
  const insidePlaylist = (playlistName: string) => {

    const findPlaylistMatch: Playlist | undefined = playlist.playlists.find((name) => name.nameOfPlaylist === playlistName); // Finds name of playlist

   // Must check if it is undefined
   if (findPlaylistMatch) {
    dispatch(setPlayList(findPlaylistMatch));
    console.log(playlist.displayPlaylist);
   }

    navigation.navigate("PlaylistContents");
  }

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      >
        <SafeAreaView>
        <ScrollView>
          {playlist.playlists.map((playlist, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
            <Button onPress={() => insidePlaylist(playlist.nameOfPlaylist)}>
            <Image style={styles.imageInfo} source={playlist.playlistCover} ></Image>
            <Text h4>{playlist.nameOfPlaylist}</Text>
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
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'black',
    width: 300,
    height: 400,
  },
  cardTitle: {
    fontSize: 40,
    color: 'white',
  },
  imageInfo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginRight: 20,
},
});

export default PlayLists;
