import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// changeSongList -> Temporarily stores current viewed song list to swap lists
// currentSongList -> Song list that is playing

// For example, when a user goes into an album, it stores the songs into changeSongList to display songs.
// When user taps on a song to play, it, currentSongList copies changeSongList to play.

// song interface to store list values
export interface SongList {
    title: string;
    path: number;
}

// Song list
interface SongListState {
    currentSongList: string[];
    changeSongList: SongList[];
}

// initial state
const initialState: SongListState = {
    currentSongList: [],
    changeSongList: [],
};

// creation of slice
const songListSlice = createSlice({
    name: 'songList',
    initialState,
    reducers: {
        setCurrentSongList(state, action: PayloadAction<string[]>) {
            state.currentSongList = action.payload;
        },
        setChangeSongList(state, action: PayloadAction<SongList[]>) {
            state.changeSongList = action.payload;
        },
    },
});

// export actions and reducer
export const { setCurrentSongList, setChangeSongList} = songListSlice.actions;
export default songListSlice.reducer;