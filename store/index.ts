import { configureStore } from "@reduxjs/toolkit";
import albumReducer from './slices/albumSlice';
import songListReducer from './slices/songListSlice';
import playerReducer from './slices/playerSlice';
import playlistReducer from './slices/playlistSlice';

// "stores" the state of the entire application


// handles state updates
const store = configureStore({
    reducer: {
        player: playerReducer,
        album: albumReducer,
        songList: songListReducer,
        playlist: playlistReducer,
    },
});

// returns type of state object and extracts that type to get shape of redux tree
export type RootState = ReturnType<typeof store.getState>; 

// extracts type of dispatch function from store
export type AppDispatch = typeof store.dispatch; 

export default store; // exports store to be used

