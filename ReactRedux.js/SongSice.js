import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
    name: 'song',
    initialState: {
        title: '',
    },
    reducers: {
        setSongName: (state, action) => {
            state.title = action.payload;
        },
    },
});

export const {setSongName} = songSlice.actions;
export const selectSong = (state) => state.song;
export default songSlice.reducer;