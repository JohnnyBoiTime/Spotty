import { View, StyleSheet, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Touchable } from "react-native";
import React from 'react';
import {  Text, Image, } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { importedAlbums } from "../generatedFiles/Albums";
import { AppDispatch, RootState } from "../../store";
import { setIsPlaying, setSongIndex } from "../../store/slices/playerSlice";
import { setCurrentSongList, SongList, setChangeSongList } from "../../store/slices/songListSlice";
import { setNumSongs, setNameOfAlbum, setAlbumCover, setNameOfArtist} from "../../store/slices/albumSlice";
import { useAudio } from "../context";

// Display top 5 most played songs, display all of the artists albums

// Displays artist
const ArtistPageContents: React.FC = ({navigation}: any) => {

    const dispatch = useDispatch<AppDispatch>();
    const playlist = useSelector((state: RootState) => state.playlist);
    const songListState = useSelector((state: RootState) => state.songList);
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
  
    // Combines all artists album song arrays into one list to make each
    // song tappable, used for both the songs and album titiles
    const flattenSongList = (songList) => {
      let flattenedList = []; // Complete list
      
        // Accesses an individual array, then access elements
        // in the array
        songList.forEach(item => {
            // Makes sure both the title and path are included
            // in the array
            if (Array.isArray(item.title) && Array.isArray(item.path)) {
                item.title.forEach((title, index) => {
                    flattenedList.push({ title, path: item.path[index] });
                });
            
            // Already flattened, so just add it to big list
            } else {
                flattenedList.push(item); 
            }
        });

      return flattenedList;
    };
  
  // Data for song list
  const flattenedSongList = flattenSongList(songListState.changeSongList);

  const changeSongColor = (name: string) => name === albumState.nameOfSong ? 'white' : 'black';

  const renderSongList = ({item}) => { 

    return ( 
        <TouchableOpacity>
            <Text style={{color: changeSongColor(item.title)}}>
              {item.title}
            </Text>
        </TouchableOpacity>
    )
  }  


  // Fills in "identifying" info for album
  const goToAlbum = (albumCover: any) => {
    for (const album of importedAlbums) {
    
      if (album.cover === albumCover) {
        
        dispatch(setNameOfAlbum(album.title));
        dispatch(setNumSongs(album.songs.title.length));
        dispatch(setAlbumCover(album.cover));
        dispatch(setNameOfArtist(album.artist));
        // Goes to selected album
    const songList: SongList[] = album.songs.title.map((title, index) => ({
      title,
      path: album.songs.path[index],
     }));
    dispatch(setChangeSongList(songList)); 
      }
    } 

navigation.navigate("AlbumContents");

  };
    

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      > 
    <View>
        <Text h1 style={styles.artistName}>{albumState.nameOfArtist}</Text>
    </View>
    <Text h3> All songs: </Text>
    <FlatList
    data={flattenedSongList}
    renderItem={renderSongList}
    />
    <View style={{padding: 10}}></View>
    <Text h2>Albums: </Text>
    <View style={{flexDirection: 'row'}}>
      <FlatList
              data={albumState.albumCovers}
              renderItem={({item, index}) => (
                <View key={index} style={{padding: 5}}>
                  <TouchableOpacity onPress={() => goToAlbum(item)}>
                    <Image style={styles.imageInfo} source={item}></Image>
                  </TouchableOpacity>
                </View> 
              )}
              />    
    </View>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  artistName: {
    textAlign: 'center',
  },
  gradient: {
    flex: 1,
  },
  imageInfo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginRight: 20,
},
});

export default ArtistPageContents;