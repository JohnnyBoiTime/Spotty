import React, { createContext, Component, useState, setState, useRef, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import { current } from "@reduxjs/toolkit";
import * as FileSystem from 'expo-file-system';


// Context screen to control variables 

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
    // Some are not needed as it changed through making the project,
    // will go through later
    const [nameOfSong, setNameOfSong] = useState('');
    const [nameOfAlbum, setNameOfAlbum] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [nameOfArtist, setNameOfArtist] = useState('');
    const [nameOfSongMP3, setNameOfSongMP3] = useState('');
    const [currentSongList, setCurrentSongList] = useState({ title: '', path: ''});
    const [songIndex, setSongIndex] = useState(0);
    const [nextSong, setNextSong] = useState('');
    const [prevSong, setPrevSong] = useState('');
    const [colorOfSong, setColorOfSong] = useState('white');
    const [album, setAlbum] = useState([{}]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPos, setPlaybackPos] = useState(0);
    const [playbackDuration, setPlaybackDuration] = useState(0);
    const [numSongs, setNumSongs] = useState(0);
    const songRef = useRef(null);

     // Plays song
     const resumeSong = async () => {
        try{
            await songRef.current.getStatusAsync();
            if (songRef.current) {
                await songRef.current.playAsync();
                setIsPlaying(true)
            }
        } catch (error) {
            console.log("Song could not be played", error);
        }
    };

    // Function inspired by Kartikey from this post: https://stackoverflow.com/questions/68042313/pausing-react-native-expo-audio
    const pauseSong = async () => {
        try {
            const status = await songRef.current.getStatusAsync();
            if (status.isLoaded && status.isPlaying) {
                    await songRef.current.pauseAsync();
                    setIsPlaying(false);
            }
        } catch (error) {
            console.log("Song could not be paused", error);

        }
    };

    // Skip to next song
    const skipForward = () => {
        const nextIndex = (songIndex + 1) % numSongs;
         setSongIndex(nextIndex);
    }

    // Go back to previous song
    const goBack = () => {
        console.log(songIndex);
        const prevIndex = (songIndex - 1 + numSongs) % numSongs;
        setSongIndex(prevIndex);
    }

    // Position of scroller
    const scroller = async (value) => {
        if (songRef.current) {
            const positionBall = value * playbackDuration;
            await songRef.current.setPositionAsync(positionBall);
            setPlaybackPos(position);
        }
    };

    // Milliseconds -> (minutes/seconds)
    const time = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = Math.floor((millis % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Put all music into a list to download
    const preLoadMusic = async () => {

        const downloadedMusic = {}; // Temp store download music

        // keep track of amount of songs downlaoded
        let songsDownloaded = 1;
        let totalSongsToDownload = 0;

        // See how many albums need to be downloaded
        importedAlbums.forEach(importedAlbums => {
            totalSongsToDownload += importedAlbums.songs.title.length;
        });

        // Go through all imported music and load individually, works, but is slow
        for (const album of importedAlbums) {
            for (let i = 0; i < album.songs.title.length; i++) {
                const songTitle = album.songs.title[i];
                const songPath = album.songs.path[i];
                try {
                    const {sound: newSound} = await Audio.Sound.createAsync(songPath);
                    downloadedMusic[songTitle] = newSound; // save title as key for easy access to audio 
                    console.log(`Successfully downloaded: ${songTitle} (${songsDownloaded++} / ${totalSongsToDownload})`);
                } catch (error) { 
                    console.log("Could not download all music ", error);
                }

            };
        }
        setDownloadedList(downloadedMusic); // Store downloaded songs to access later
    };

    // Pre-load all music at start up, probably change
    // to after the user logs in, or just hve no log
    // in at all
    useEffect(() => {
        preLoadMusic();
    }, []);

    useEffect(() => {
        const startSong = async () => {

            // When song is tapped again, restarts song
            // When a different song is played, unloads previous song
            // And loads in new one
            if (songRef.current) {
                await songRef.current.stopAsync();
                await songRef.current.unloadAsync();
            }
    
            // Creates/plays sound
            const {sound: newSound} = await Audio.Sound.createAsync(currentSongList.path[songIndex]);
            songRef.current = newSound;
            await newSound.playAsync();
            setIsPlaying(true);
            console.log(songRef.current);
            setNameOfSong(currentSongList.title[songIndex]);

            // Updates current positon of the song (in milliseconds)
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPlaybackPos(status.positionMillis);
                    setPlaybackDuration(status.durationMillis);
                    // When song finishes, go to next song
                    // by updating index
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        const nextIndex = (index + 1) % numSongs;
                        setSongIndex(nextIndex);
                        startSong(nextIndex);
                    }
                }
            });

            console.log("song be playing!");
        };
        startSong();
    }, [songIndex]);

    return (
        // Some are not needed, will go through it later
        <MusicPlayerContext.Provider
            value={{
                currentSongList,
                nameOfSong,
                nameOfAlbum,
                nameOfArtist,
                songIndex,
                isPlaying,
                playbackPos,
                playbackDuration,
                songRef,
                album,
                numSongs,
                nameOfSongMP3,
                albumCover,
                nextSong,
                prevSong,
                colorOfSong,
                time,
                resumeSong,
                pauseSong,
                saveSong,
                skipForward,
                goBack,
                scroller,
                setColorOfSong,
                setNextSong,
                setPrevSong,
                setNumSongs,
                setAlbum,
                setCurrentSongList,
                setNameOfSong,
                setNameOfAlbum,
                setNameOfArtist,
                setNameOfSongMP3,
                setSongIndex,
                setIsPlaying,
                setPlaybackPos,
                setPlaybackDuration,
                setAlbumCover,
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => {
    return useContext(MusicPlayerContext);
};

