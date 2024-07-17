import React, { createContext, Component, useState, setState, useRef, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import { importedAlbums } from "../Albums";


// Context screen to control variables/effects

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
    const [nameOfSong, setNameOfSong] = useState('');
    const [nameOfAlbum, setNameOfAlbum] = useState('');
    const [audioToPlay, setAudioToPlay] = useState([]);
    const [albumCover, setAlbumCover] = useState('');
    const [nameOfArtist, setNameOfArtist] = useState('');
    const [downloadedList, setDownloadedList] = useState({title: '', path: ''}); // Probably only need the path
    const [currentSongList, setCurrentSongList] = useState({ title: '', path: ''});
    const [changeSongList, setChangeSongList] = useState({title: '', path: ''});
    const [songIndex, setSongIndex] = useState(8264);
    const [nextSong, setNextSong] = useState('');
    const [prevSong, setPrevSong] = useState('');
    const [colorOfSong, setColorOfSong] = useState('white');
    const [album, setAlbum] = useState([{}]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPos, setPlaybackPos] = useState(0);
    const [playbackDuration, setPlaybackDuration] = useState(0);
    const [numSongs, setNumSongs] = useState(0);
    const songRef = useRef(null);


    useEffect(() => {
        if (songRef.current) {
            // song.stopAsync();
            // song.unloadAsync();
            songRef.current.stopAsync();
            songRef.current.unloadAsync();
        }
    }, []);

     // Resume
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

    // milliseconds -> (minutes / seconds)
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
                    downloadedMusic[songTitle] = newSound; // save title as key for easy access
                    console.log(`Successfully downloaded: ${songTitle} (${songsDownloaded++} / ${totalSongsToDownload})`);
                } catch (error) { 
                    console.log("Could not download all music ", error);
                }

            };
        }
        setDownloadedList(downloadedMusic); 
    };

    // Pre-load all music at start up, probably change
    // to after the user logs in, or just hve no log
    // in at all
    useEffect(() => {
        preLoadMusic();
    }, []);

    useEffect(() => {

        // Play selected audio file
        const startSong = async () => {
        
            // When song is tapped again, restarts song
            // When a different song is played, unloads previous song
            // And loads in new one
            if (songRef.current) {
                await songRef.current.stopAsync();
                await songRef.current.unloadAsync();
            }

            // Creates/plays sound
            songRef.current = audioToPlay[songIndex];
            console.log("inside!");
            await audioToPlay[songIndex].playAsync();
            setIsPlaying(true);
            console.log(songRef.current);
            setNameOfSong(currentSongList.title[songIndex]);

            // Updates current positon of the song (in milliseconds)
            audioToPlay[songIndex].setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPlaybackPos(status.positionMillis);
                    setPlaybackDuration(status.durationMillis); // Get duration for every song, put in an array, .map through it and put length next to song.
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
        // CUT SOME OF THE VALUES! Some are not even used
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
                albumCover,
                nextSong,
                prevSong,
                colorOfSong,
                downloadedList,
                audioToPlay,
                time,
                resumeSong,
                pauseSong,
                skipForward,
                goBack,
                scroller,
                changeSongList,
                setChangeSongList,
                setColorOfSong,
                setAudioToPlay,
                setNextSong,
                setPrevSong,
                setNumSongs,
                setAlbum,
                setCurrentSongList,
                setNameOfSong,
                setNameOfAlbum,
                setNameOfArtist,
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


