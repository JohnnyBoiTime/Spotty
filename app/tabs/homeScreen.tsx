import {  View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React from 'react';
import { useDispatch, } from "react-redux";
import { Image } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { importedAlbums } from "../generatedFiles/Albums";
import { AppDispatch } from "../../store";
import { setNameOfAlbum, setAlbumCover, setNameOfArtist, setNumSongs } from "../../store/slices/albumSlice";
import { setChangeSongList, SongList } from "../..//store/slices/songListSlice";

// https://reactnativeelements.com/docs

// Format of album
interface Album {
  title: string;
  cover: number;
  artist: string;
  songs: {
    title: string[];
    path: number[];
  };
}


const HomeScreen: React.FC = ({navigation}: any) => {

  const dispatch = useDispatch<AppDispatch>(); // Updates the state

  
  // dispatches actions to update states
  const albumDetails = (album: Album) => {
  dispatch(setNameOfAlbum(album.title))
  dispatch(setNumSongs(album.songs.title.length));
  dispatch(setAlbumCover(album.cover));
  dispatch(setNameOfArtist(album.artist));

  // Map song titles
  const songList: SongList[] = album.songs.title.map((title, index) => ({
    title,
    path: album.songs.path[index],
   }));
  dispatch(setChangeSongList(songList));

  navigation.navigate("AlbumContents");

  };

  // Render albums from imported albums using Album interface
  const displayAlbums = ({item}: {item: Album}) => (
    <TouchableOpacity onPress={() => albumDetails(item)}>
      <View style={{paddingTop: 20}}>
        <Image source={item.cover} style={styles.imageInfo}/>
      </View>
    </TouchableOpacity>
  );

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      >
        <SafeAreaView>
            <FlatList
            contentContainerStyle={{padding: 47}} 
            numColumns={2}
            data={importedAlbums}
            renderItem={displayAlbums}
            keyExtractor={(album) => album.title}
            />
        </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  text : {
      color: 'white'
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  imageInfo: {
      width: 150,
      height: 150,
      resizeMode: 'cover',
      marginRight: 20,
  },
});

export default HomeScreen;