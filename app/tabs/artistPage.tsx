import { View, StyleSheet, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Touchable } from "react-native";
import React from 'react';
import {  Text, Image, } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { importedAlbums } from "../generatedFiles/Albums";
import { AppDispatch, RootState } from "../../store";
import { setIsPlaying, setPlayerAlbumCover, setSongIndex } from "../../store/slices/playerSlice";
import { setCurrentSongList, SongList, setChangeSongList } from "../../store/slices/songListSlice";
import { setNumSongs, setNameOfAlbum, setAlbumCover, setNameOfArtist} from "../../store/slices/albumSlice";
import { useAudio } from "../context";

// Display top 5 most played songs, display all of the artists albums

// Find out why tf the player isnt changing the album cover 
// wtffffffffff

// Displays artist
const ArtistPageContents: React.FC = ({navigation}: any) => {

  // Creates the states to use them
    const dispatch = useDispatch<AppDispatch>();
    const playlist = useSelector((state: RootState) => state.playlist);
    const playerState = useSelector((state: RootState) => state.player);
    const songListState = useSelector((state: RootState) => state.songList);
    const albumState = useSelector((state: RootState) => state.album);
    const {playSong} = useAudio();

    // Uses the title and index to find the song to play
    const handleSongChange = (songTitle: string, index: number) => {

      // Finds album cover using song title
      for (const song of importedAlbums) {
        const songIndex = song.songs.title.indexOf(songTitle);
        if (songIndex !== -1) {
          console.log(song.cover);
          dispatch(setAlbumCover(song.cover));
        }
      }
  
      dispatch(setCurrentSongList([songTitle]))
      dispatch(setNumSongs(1));
      playSong(songTitle, index);    
    } 
    // Combines all artists album song arrays into one list to make each
    // song tappable, used for both the songs and album titiles
    const flattenSongList = (songList: any) => {
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

  // Renders the song list for the chosen artist
  // and gives each song an index so handeSongChange can be
  // called
  const renderSongList = ({item}) => { 

    let songIndex = 0;
    
    // Makes it so while a song is playing it isnt running
    // the for loop
    if (!playerState.isPlaying) {
      for (let i = 0; i < item.title.length; i++) {
        songIndex++;
      }
    }

    return ( 
        <TouchableOpacity onPress={() => handleSongChange(item.title, songIndex)}>
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
                    <View style={{flexDirection: 'row'}}>
                      <Image style={styles.imageInfo} source={item}></Image>
                      <Text h3 style={{flex: 1}}>{albumState.albumTitles[index].split(' - ')[1]}</Text>
                    </View>
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