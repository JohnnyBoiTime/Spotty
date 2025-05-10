import React, { createContext, useRef, useEffect, useContext } from "react";
import { Platform } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';
import { Asset} from "expo-asset";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { importedAlbums } from "./generatedFiles/Albums";
import { setIsPlaying, setPlaybackDuration, setPlaybackPos, setSongIndex } from "../../Spotty/store/slices/playerSlice";
import { AppDispatch, RootState } from "../../Spotty/store/";
import { useDispatch, useSelector } from "react-redux";
import { setNameOfSong } from "../../Spotty/store/slices/albumSlice";

// Thanks to https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

export interface AudioLoad {
    newSound: Audio.Sound;
}

// Contexts
const AudioContext = createContext<{
    loadSongList: (songTitle: string) => Promise<void>;
    playSong: ( songTitle: string, index: number) => Promise<void>;
    resumeSong: () => Promise<void>;
    pauseSong: () => Promise<void>;
    skipSong: () => Promise<void>;
    prevSong: () => Promise<void>;
    scroller: (value: number) => Promise<void>;
    songRef: React.MutableRefObject<Audio.Sound | null>;
  }>({
    loadSongList: async () => {},
    playSong: async () => {},
    resumeSong: async () => {},
    pauseSong: async () => {},
    skipSong: async () => {},
    prevSong:  async () => {},
    scroller: async () => {},
    songRef: { current: null },
});

// Access contexts
export const useAudio = () => {
  const context = useContext(AudioContext);
  return context;
};

export const AudioProvider = ({children} : {children: React.ReactNode}) => {
    
  // Dispatch/select actions from store
    const dispatchRedux = useDispatch<AppDispatch>();
    const playerState = useSelector((state: RootState) => state.player);
    const songList = useSelector((state: RootState) => state.songList);
    const albumState = useSelector((state: RootState) => state.album);
    const songRef = useRef<Audio.Sound | null>(null);

    // Store files locally on device
    const songStorage = async (filePath: string, fileName: string): Promise<string | null> => {
        if (Platform.OS === 'web') {
          return filePath;
        }
    
      const songUri = `${FileSystem.documentDirectory}${fileName}.mp3`;

        try {

          // https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string

          // Make directory
          const directory = await FileSystem.getInfoAsync(FileSystem.documentDirectory || '{}');
          if (!directory.exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory || '{}');
          }

          // Does it exist?
          const itExists = await AsyncStorage.getItem(fileName);
          if (itExists) {
            return itExists
          }

          // Doesn't exist, copy files
          await FileSystem.copyAsync({
            from: filePath,
            to: songUri,
          });

          // set key and store
          await AsyncStorage.setItem(fileName, songUri);
          console.log(`Copied/Stored: ${songUri}`);
          return songUri;
        } catch (error) {
          console.error(`Could not copy and store: ${error} to ${songUri}`);
          return null;
        }
      };

      const albumStorage = async (albumPath: string, fileName: string): Promise<string | null> => {
        
        if (Platform.OS === 'web') {
          return albumPath;
        }

        const albumUri = `${FileSystem.documentDirectory}${fileName}.jpg`;

        try {

          // https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string

          // Make directory
          const directory = await FileSystem.getInfoAsync(FileSystem.documentDirectory || '{}');
          if (!directory.exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory || '{}');
          }

          // Does it exist?
          const itExists = await AsyncStorage.getItem(fileName);
          if (itExists) {
            console.log(`${fileName} already exists at ${itExists}`);
            return itExists
          }

          // Doesn't exist, copy files
          await FileSystem.copyAsync({
            from: albumPath,
            to: albumUri,
          });

          // set key and store
          await AsyncStorage.setItem(fileName, albumUri);
          console.log(`Copied/Stored: ${albumUri}`);
          return albumUri;
        } catch (error) {
          console.error(`Could not copy and store: ${error} to ${albumUri}`);
          return null;
        }
      }

    // Load from generated files
    const loadSongList = async (): Promise<void> => {

     // Uncomment to track first time download progress
     //   let totalSongsToDownload = 0;
    
     //   importedAlbums.forEach(importedAlbums => {
      //      totalSongsToDownload += importedAlbums.songs.title.length;
      //  });
    
      // Go through albums and store songs in device
        for (const album of importedAlbums) {
            for (let i = 0; i < album.songs.title.length; i++) {
                const songTitle = album.songs.title[i];
                const songPath = album.songs.path[i];
                const albumCover = album.cover;
                const albumTitle = album.title;
                try {
                  const downloadAlbumCover = Asset.fromModule(albumCover);
                  const downloadsong = Asset.fromModule(songPath);
                  await downloadsong.downloadAsync();
                  await downloadAlbumCover.downloadAsync();
                  const pathToSong = downloadsong.localUri || downloadsong.uri;
                  const pathToAlbum = downloadAlbumCover.localUri || downloadAlbumCover.uri;
                  await songStorage(pathToSong, songTitle);
                  await albumStorage(pathToAlbum, albumTitle);
           //       console.log(`Successfully downloaded ${songTitle} (${i + 1} / ${totalSongsToDownload})`)
                  } catch (error) { 
                    console.log("Could not download all music/albums ", error);
               }
            }
        }
    };

    // Skip to next song
    const skipSong = async() => {
      if (songRef.current) {
        const nextIndex = (playerState.songIndex + 1) % albumState.numSongs;
        dispatchRedux(setSongIndex(nextIndex));
      }
    }

    // Go back a song
    const prevSong = async() => {
      if (songRef.current) {
        const prevIndex = (playerState.songIndex - 1 + albumState.numSongs) % albumState.numSongs;
        dispatchRedux(setSongIndex(prevIndex));
      }
    }

    // Play sound
    const playSong = async ( songTitle: string, index: number): Promise<void> => {

      // Is there a song?
      if (!songTitle) {
        console.error("Invalid title: ", songTitle);
        return;
      }
        else {
        
        // Create sound from song stored on device  
        const downloadPath = await AsyncStorage.getItem(songTitle);
        if (downloadPath != null) {
          const {sound: newSound} = await Audio.Sound.createAsync({uri: downloadPath}); 
          const audioLoad: AudioLoad = {newSound};

          dispatchRedux(setNameOfSong(songTitle));

          try{

            // stop and unload song 
            await songRef.current?.stopAsync();
            await songRef.current?.unloadAsync();
            songRef.current = audioLoad.newSound; // Set to new sound
            
            // Play song 
            await songRef.current.playAsync();
            dispatchRedux(setIsPlaying(true));

            // Move the scroller
            songRef.current.setOnPlaybackStatusUpdate((status) => {
              if (status.isLoaded) {
                dispatchRedux(setPlaybackPos(status.positionMillis));
                dispatchRedux(setPlaybackDuration(status.durationMillis));
                if (status.didJustFinish) {
                  const nextIndex = playerState.songIndex + 1;
                  dispatchRedux(setSongIndex(nextIndex));
                }
              }
            })

          } catch (error) {
            console.error("Error playing audio", error);
          }
        }
      }
    };

      // Pause the song
      const pauseSong = async (): Promise<void> => {
        if (songRef.current) {
          try {
            await songRef.current.pauseAsync();
            dispatchRedux(setIsPlaying(false));
          } catch (error) {
            console.log(`Could not pause music:${error} `)
          }
        }
      }

      // Resume the song
      const resumeSong = async (): Promise<void> => {
        if (songRef.current) {
          try {
            await songRef.current.playAsync();
            dispatchRedux(setIsPlaying(true));
          } catch (error) {
            console.log(`Could not pause music:${error} `)
          }
        }
      };

      // Keep track of music
      const scroller = async (value: number): Promise<void> => {

        if (songRef.current) {
          const thumbPosition = value * playerState.playbackDuration; // Percentage
          await songRef.current.setPositionAsync(thumbPosition);
          dispatchRedux(setPlaybackPos(thumbPosition));  // Store position
        }
      };

   // Download songs on start
   useEffect(() => {
      loadSongList();
    }, []);

    // Play new song on index change
    useEffect(() => {
     // playSong(songList.currentSongList[playerState.songIndex], playerState.songIndex);
      
     const list = songList.currentSongList;
     const index = playerState.songIndex;
     if (list.length > 0 && index >= 0 && index < list.length) {
      playSong(list[index], index);
     }
    
    }, [playerState.songIndex, songList.currentSongList]);

    // Provider
    return (
        <AudioContext.Provider value={{scroller, songRef, loadSongList, pauseSong, playSong, skipSong, prevSong, resumeSong}}>
            {children}
        </AudioContext.Provider>
    );
};
