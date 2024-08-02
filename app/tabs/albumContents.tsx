import { View, StyleSheet, ScrollView} from "react-native";
import React, {useState, useEffect} from 'react';
import {  Text, Dialog, Icon, Input, Button, Image, } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {  setCurrentSongList } from "@/store/slices/songListSlice";
import { setSongIndex, setIsPlaying, setPlayerAlbumCover } from "@/store/slices/playerSlice";
import { createPlaylist, addSongToPlaylist } from "@/store/slices/playlistSlice";
import { SafeAreaView } from "react-native-safe-area-context";

// Interfaces
interface Song {
  title: string;
  artist: string;
}

interface Playlist {
      nameOfPlaylist: string,
      playlistCover: number,
      songs: Song[],
};

interface Entry {
  playlistName: string,
  song: Song,
};

// Displays and formats chosen album
const InsideAlbum: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const albumState = useSelector((state: RootState) => state.album);
  const songListState = useSelector((state: RootState) => state.songList);
  const playerState = useSelector((state: RootState) => state.player);
  const playList = useSelector((state: RootState) => state.playlist);
  const [visible, setVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [songName, setSongName] = useState('');

  // Stores chosen song info to display
  const handleSongChange = ( index: number) => {
    const currentSongList = songListState.changeSongList.map(song => song.title);
    dispatch(setCurrentSongList(currentSongList));
    dispatch(setIsPlaying(true));
    dispatch(setSongIndex(index));
  };

   // Changes song color based on name, potential problem
    // if there are 2 songs with the same name, probably
    // make it so artist name and specific album have to
    // be the same
    const changeSongColor = (name: string) => name === albumState.nameOfSong ? 'black' : 'white';
    

  // Make player album cover and current album cover different
  useEffect(() => {
    dispatch(setPlayerAlbumCover(albumState.albumCover));
  }, [songListState.currentSongList])

  const showPlaylists = (songTitle: string, list: any) =>{
    setSongName(songTitle);
    setVisible(true);
  };

  const input = (inputted: string,) =>{
    setPlaylistName(inputted);
  };

  const saveSongTap = (playlist: string) => {

    // Format song
    const songEntry: Entry = {
      playlistName: playlist,
      song: {title: songName, artist: albumState.nameOfArtist }, 
    };
    
    const findPlaylistMatch = playList.playlists.find((name) => name.nameOfPlaylist === songEntry.playlistName); // Finds name of playlist
    const findSongMatch = findPlaylistMatch?.songs.find((song) => song.title === songName); // Finds song in playlist
   
    // Song does not exist in playlist
    if (!findSongMatch) {
      dispatch(addSongToPlaylist(songEntry));
      console.log(`${songName} added to ${songEntry.playlistName}`);
      setVisible(false);
    }
    else {
      console.log(`${songName} already exists in: ${songEntry.playlistName}`);
    }

  }

  const saveSong = (songTitle: string) => {
    try {

      // Require name
      if (playlistName == '') {
        console.log("Playlist needs a name!");
        return;
      }

      // Playlist format
      const playListEntry: Playlist = 
        {
          nameOfPlaylist: playlistName,
          playlistCover: playerState.playerAlbumCover,
          songs: [ {title: songTitle, artist: albumState.nameOfArtist } ],
        };

        // Song format
        const songEntry: Entry = {
          playlistName: playlistName,
          song: {title: songTitle, artist: albumState.nameOfArtist }, 
        };
       
        const findPlaylistMatch = playList.playlists.find((name) => name.nameOfPlaylist === playListEntry.nameOfPlaylist); // Finds name of playlist
        const findSongMatch = findPlaylistMatch?.songs.find((song) => song.title === songTitle); // Finds song in playlist
        

        // Does the playlist already exist?
        if (!findPlaylistMatch) {
          dispatch(createPlaylist(playListEntry));
          console.log("Playlist created!");
        }
        else {
          // The playlist already exists, but what about the song?
          if (!findSongMatch) {
            dispatch(addSongToPlaylist(songEntry));
          }
          else {
            console.log(`Song already exists in: ${playListEntry.nameOfPlaylist}`);
          }
        }

        setVisible(false);
        setPlaylistName('');

    } catch(error) {
      console.log(error);
    }
  }

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      >
        <SafeAreaView style={{alignItems: 'center'}}>
       <Text h1>{albumState.nameOfAlbum}</Text>
        <Image style={styles.imageInfo} key={albumState.albumCover} source={albumState.albumCover}></Image>
        <Text h4 style={styles.artistName}>{albumState.nameOfArtist}</Text>
        </SafeAreaView>
        <ScrollView  contentContainerStyle={styles.scroll}>
      {songListState.changeSongList.map((item, index) => (
        <View  key={index} >
        <Button onPress={() => handleSongChange(index)} style={styles.button} color='transparent'>
          <Text  numberOfLines={2} ellipsizeMode="tail" h4 style={[styles.songs, {color: changeSongColor(item.title)} ]}>{item.title} {"\n"}
            <Text style={[styles.artist, {color: changeSongColor(item.title)}]}>{albumState.nameOfArtist}
            </Text>
          </Text>
          <Icon iconStyle={{marginLeft: -3}} name='save' onPress={() => showPlaylists(item.title, playList.playlists)}></Icon>
          <Dialog isVisible={visible} backdropStyle={{backgroundColor: 'transparent '}} onBackdropPress={() => setVisible(false)}>
              <Dialog.Title title="Playlists:"/>
              <Input onChangeText={input}></Input>
            {playList.playlists.map((playlist, playlistIndex) => (
              <Button key={playlistIndex} color={'transparent'} onPress={() => saveSongTap(playlist.nameOfPlaylist)}>
              <Text>{playlist.nameOfPlaylist}</Text>
              </Button>
            ))}
            <Dialog.Button title='save' onPress={() => saveSong(item.title)}/>
          </Dialog>
        </Button>
        </View>
      ))}
      </ScrollView>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'flex-start',
  },
  gradient: {
    flex: 1,
  },
  artistName: {
    fontSize: 20,
  },
  songs: {
   width: '100%',
   margin: -3,
  },
  artist: {
    textAlign: 'left',
  },
  button: {
    width: '100%',
  },
  imageInfo: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
},
});

export default InsideAlbum;
