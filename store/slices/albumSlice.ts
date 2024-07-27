import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Album info needs:
// song name
// name of album
// name of artist
// album cover
// number of songs

// Album structure
interface AlbumState {
    nameOfSong: string;
    nameOfAlbum: string;
    nameOfArtist: string;
    albumCover: number;
    numSongs: number;
}

// Set initial states
const initialState: AlbumState = {
    nameOfSong: '',
    nameOfAlbum: '',
    nameOfArtist: '',
    // Set to 8965 to not conflict with other album paths
    albumCover: 8965, 
    numSongs: 0,
};

// Reducers
const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setNameOfSong(state, action: PayloadAction<string>) { 
            state.nameOfSong = action.payload;
        },
        setNameOfAlbum(state, action: PayloadAction<string>) {
            state.nameOfAlbum = action.payload;
        },
        setNameOfArtist(state, action: PayloadAction<string>) {
            state.nameOfArtist = action.payload;
        },
        setAlbumCover(state, action: PayloadAction<number>) {
            state.albumCover = action.payload;
        },
        setNumSongs(state, action: PayloadAction<number>) {
            state.numSongs = action.payload;
        },
    },
});

// exports actions to use in app
export const {setNameOfSong, setNameOfAlbum, setNameOfArtist, setAlbumCover, setNumSongs} = albumSlice.actions; 
export default albumSlice.reducer; // exports reducer to handle actions
