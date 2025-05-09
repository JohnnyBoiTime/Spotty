import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Audio } from "expo-av";

// player needs:
// audio to play
// song index
// next song
// previous song
// is the song playing
// playback position
// playback duration

// Player for the music
interface PlayerState {
    audioToPlay: string[];
    playAudio: any[];
    playerAlbumCover: number;
    songIndex: number;
    isPlaying: boolean;
    playbackPos: number;
    playbackDuration: any;
    isOpen: boolean;
}

// Initial states
const initialState: PlayerState = {
    audioToPlay: [],
    playAudio: [],
    playerAlbumCover: 1323,
    songIndex: 8276, // Song index is set high so 0th index song doesnt mess anything up
    isPlaying: false,
    playbackPos: 0,
    playbackDuration: 0,
    isOpen: false,
};

// slice/reducers
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setAudioToPlay(state, action: PayloadAction<string[]>) {
            state.audioToPlay = action.payload;
        },
        setPlayAudio(state, action: PayloadAction<any[]>) {
            state.playAudio = action.payload as any;
        },
        setPlayerAlbumCover(state, action: PayloadAction<number>) {
            state.playerAlbumCover = action.payload;
        },
        setSongIndex(state, action: PayloadAction<number>) {
            state.songIndex = action.payload;
        },
        setIsPlaying(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload;
        },
        setPlaybackPos(state, action: PayloadAction<number>) {
            state.playbackPos = action.payload;
        },
        setPlaybackDuration(state, action: PayloadAction<any>) {
            state.playbackDuration = action.payload;
        },
        setIsOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        }
    },
});

// export actions and reducer
export const {setAudioToPlay, setIsPlaying, setPlayerAlbumCover, setPlayAudio, setSongIndex, setPlaybackPos, setPlaybackDuration, setIsOpen} = playerSlice.actions;
export default playerSlice.reducer;
