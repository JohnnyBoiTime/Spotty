import { Text, View, StyleSheet} from "react-native";
import React, {useState} from 'react';
import { Asset } from "expo-asset";
import * as FileSystem from 'expo-file-system';
import { useDispatch, useSelector } from "react-redux";
import { Icon, Card, Slider, Dialog, ButtonGroup, Input, Button, Image } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { RootState, AppDispatch } from "../store"
import { useAudio } from "./context";
import { addSongToPlaylist, createPlaylist, setPLayListCover} from "../store/slices/playlistSlice";
import { TapGestureHandler, PanGestureHandler, PanGestureHandlerGestureEvent, HandlerStateChangeEvent } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import axios from 'axios';

// const urlServer = 'HIDDEN';

// Interfaces
interface Song {
  title: string;
  artist: string;
}

interface Playlist {
  nameOfPlaylist: string;
  playlistCover: number;
  songs: Song[];
}

interface Entry {
  playlistName: string,
  song: Song,
}

interface SongData {
  uri: string;
};

async function localPath(uri: string, destination: string): Promise<string> {
  const asset = Asset.fromModule(uri);

  await asset.downloadAsync();

  const destinationPath = `${FileSystem.documentDirectory}${destination}`;

  await FileSystem.copyAsync({
    from: asset.localUri || '',
    to: destinationPath,
  });

  return destinationPath; 
};

// Component for music player

const MusicPlayer: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const albumState = useSelector((state: RootState) => state.album);
  const playerState = useSelector((state: RootState) => state.player);
  const playList = useSelector((state: RootState) => state.playlist);
  const {playSong, pauseSong, scroller, resumeSong, skipSong, prevSong} = useAudio();
  const [playlistName, setPlaylistName] = useState('');
  const [songName, setSongName] = useState('');
  const [visible, setVisible] = useState(false);
  const yDir = useSharedValue(650);


  // Check on iphone if time/scroller is off, it probs is

  /*
  // Send song to server to put into S3 bucket
  async function postSong({song}: {song: SongData}): Promise<void> {
    const formData = new FormData();
    formData.append('song', {
      uri: song.uri,
      type: 'audio/mpeg',
      name: song.uri.split('/').pop(),
    } as any);
  
    formData.append('artist', albumState.nameOfArtist);
  
    const result = await axios.post(`${urlServer}/upload-song`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  
    return result.data;
  
  };
  
  // Submits current song that is playing
  const submit = async () => {
    try {
      const localPathThing = await localPath(require(`./assets/Albums/${albumState.nameOfArtist} - ${albumState.nameOfAlbum}/${albumState.nameOfArtist}  - ${albumState.nameOfArtist} - 08 시계 (Backwards).mp3`), 'Backwards.mp3');
      const song = {uri: localPathThing};
      const result = await postSong({song});
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  */

  // Coneals/displays music player and keeps it in bounds
  const swiping = (event: PanGestureHandlerGestureEvent) => {

      yDir.value = event.nativeEvent.absoluteY;
      console.log(yDir.value);
    if (event.nativeEvent.absoluteY < 650) {
      yDir.value = 650;
    }
    if (event.nativeEvent.absoluteY > 772) {
      yDir.value = 772
    }

  };

  // Open and close the player
  const tapping = (event: HandlerStateChangeEvent) => {
    if (yDir.value === 772 && event.nativeEvent.numberOfPointers === 1) {
      yDir.value = withTiming(650);
    }
    if (yDir.value === 650 && event.nativeEvent.numberOfPointers === 1) {
      yDir.value = withTiming(772);
    }
  }

  // Allow touch movement for player
  const animated = useAnimatedStyle(() => {
    return {
      transform: [{translateY: yDir.value}],
      backgroundColor: 'transparent',
    };
  })

  // Prevents error if passed through function to scroller
  const songProgress = (value: number) => {
    scroller(value);
  };

  const showPlaylists = (songTitle: string, list: any) =>{
    setSongName(songTitle);
    setVisible(true);
  };

  // Changes text input
  const input = (inputted: string,) =>{
    setPlaylistName(inputted);
  };


  const saveSongTap = (playlist: string) => {

    // Format to dispatch
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

  // Save to playlist
  const saveSong = (songTitle: string) => {
    try {

      // Format for playlist
      const playListEntry: Playlist = 
        {
          nameOfPlaylist: playlistName,
          playlistCover: playerState.playerAlbumCover,
          songs: [ {title: songTitle, artist: albumState.nameOfArtist } ],
        };

        // Format for song
        const songEntry: Entry = {
          playlistName: playlistName,
          song: {title: songTitle, artist: albumState.nameOfArtist }, 
        };
       
        const findPlaylistMatch = playList.playlists.find((name) => name.nameOfPlaylist === playListEntry.nameOfPlaylist); // Finds name of playlist
        const findSongMatch = findPlaylistMatch?.songs.find((song) => song.title === songTitle); // Finds song in playlist
        
        // Does the playlist already exist?
        if (!findPlaylistMatch) {
          dispatch(createPlaylist(playListEntry));
          console.log("Playlist created!")
          
        }
        else {
          // The playlist already exists, but what about the song?
          if (!findSongMatch) {
            dispatch(addSongToPlaylist(songEntry));
            dispatch(setPLayListCover(playerState.playerAlbumCover));
          }
          else {
            console.log(`Song already exists in: ${playListEntry.nameOfPlaylist}`);
          }
        }

        setVisible(false); // Close dialog

    } catch(error) {
      console.log(error);
    }
  }

  // milliseconds -> (minutes / seconds)
  const time = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

 return (
  
    <PanGestureHandler onGestureEvent={swiping}>
    <Animated.View style={[animated]} onPointerDown={(event) => console.log(event)}>
    {/* Show player if song is playing */}
    { playerState.isPlaying || albumState.nameOfSong ? ( 
    <Card containerStyle={styles.card}> 
    <TapGestureHandler onActivated={tapping}>
    <Animated.View>
    <View style={styles.view}>
    <Image style={styles.playerImage} key={albumState.albumCover} source={playerState.playerAlbumCover}/>
    <Card.FeaturedSubtitle numberOfLines={1} ellipsizeMode='tail' style={styles.cardSongTitle}>{albumState.nameOfSong}</Card.FeaturedSubtitle>
      <View>
      <Icon color={'white'} name='save' onPress={() => showPlaylists(albumState.nameOfSong, playList.playlists) }/>
      </View>
    </View>  
    </Animated.View>
    </TapGestureHandler>
    <Card.Divider/>
    <View style={{flexDirection: 'row'}}>
    <Text style={{color: 'white'}}> {time(playerState.playbackPos)}</Text>
    <Text style={{color: 'white', paddingLeft: 320}}> {time(playerState.playbackDuration)}</Text>
    </View>
    <Slider
    minimumTrackTintColor="blue"
    value={playerState.playbackPos / playerState.playbackDuration || 0}
    minimumValue={0}
    maximumValue={1}
    step={0.001}
    onValueChange={songProgress}
    thumbStyle={styles.thumb}
    />
    <ButtonGroup 
      containerStyle={styles.buttonGroup}
      onPress={(value) => {
        switch (value) {
          case 0:
            prevSong();
            break;
          case 1:
            if (playerState.isPlaying === true) {
              pauseSong();
            }
            else {
              resumeSong();
            }

            break;
          case 2:
            skipSong();
            break;
        }
      
      }}
      buttonContainerStyle={styles.cardButton} buttons={[
      <Ionicons name='play-skip-back' />,
      <Ionicons name={ playerState.isPlaying ? 'pause': 'play'} />,
      <Ionicons name='play-skip-forward' />,
    ]}/>
    {/* Playlist dialog */}
    <Dialog isVisible={visible}>
              <Dialog.Title title="Playlists:"/>
              <Input onChangeText={input}></Input>
            {playList.playlists.map((playlist, playlistIndex) => (
              <Button key={playlistIndex} color={'transparent'} onPress={() => saveSongTap(playlist.nameOfPlaylist)}>
              <Text>{playlist.nameOfPlaylist}</Text>
              </Button>
            ))}
            <Dialog.Button title='save' onPress={() => saveSong(albumState.nameOfSong)}/>
          </Dialog>
    </Card>
  ) : (
    <Text></Text> // Don't show music player if song not playing
   )}
      </Animated.View>
      </PanGestureHandler>
 );
}

const styles = StyleSheet.create({
    scroll: {
      padding: 10,
      alignItems: 'flex-start',
    },
    buttonGroup: {
      borderWidth: 0, 
      borderRadius: 0,
    },
    view: {
      flexDirection: 'row',
      padding: 5,
      flexWrap: 'wrap',
      
    },
    card: {
      backgroundColor: 'black',
      height: 200,
      width: 430,
      margin: 0,
      borderColor: 'transparent',

    },
    cardSongTitle: {
      fontSize: 20,
      borderColor: 'white',
      height: 30,
      flex: 1,
      
    },
    thumb: {
      width: 20,
      height: 20,
      backgroundColor: 'blue',
    },
    playerImage: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    cardTitle: {
      color: 'white',
      fontSize: 24,
    },
    gradient: {
      flex: 1,
    },
    cardButton: {
      backgroundColor: 'black',
      borderColor: 'transparent',
    },
    albumName: {
     textAlign: 'center',
    },
    artistName: {
      fontSize: 20,
      textAlign: 'center',
    },
    songs: {
     width: '100%',
    },
    artist: {
      textAlign: 'left',
    },
    button: {
      width: '100%',
      flex: 1,
    },
    imageInfo: {
      width: 200,
      height: 200,
      marginLeft: 100,
      resizeMode: 'cover',
  },
  });

  export default MusicPlayer;