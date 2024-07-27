import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";

// Very similar to an album so pretty much uses the same structure
// minus name of album

interface Song {
    title: string;
    artist: string;
}

interface Playlist {
    nameOfPlaylist: string;
    playlistCover: number;
    songs: Song[];
}

// Album structure
interface PlaylistState {
    playlists: Playlist[];
    displayPlaylist: Playlist;
}

// Set initial states
const initialState: PlaylistState = {
    playlists: [],
    displayPlaylist: { 
        nameOfPlaylist: '',
        playlistCover: 321,
        songs: [],
    },
};

// Reducers
const playListSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        createPlaylist: (state, action: PayloadAction<Playlist>) => {
            state.playlists.push(action.payload);
        },
        addSongToPlaylist: (state, action: PayloadAction<{playlistName: string, song: Song}>) => {
            const {playlistName, song} = action.payload;
            // Finds playlist to store song to
            const playlist = state.playlists.find((existingPaylist) => existingPaylist.nameOfPlaylist === playlistName);
            if (playlist) {
                playlist.songs.push(song);
            }
        },
        setPlayList: (state, action: PayloadAction<Playlist>) => {
            state.displayPlaylist = action.payload;
        },
    },
});

// exports actions to use in app
export const {createPlaylist, addSongToPlaylist, setPlayList} = playListSlice.actions; 
export default playListSlice.reducer; // exports reducer to handle actions
