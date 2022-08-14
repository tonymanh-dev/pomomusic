import { createSlice } from '@reduxjs/toolkit';

const initState = {
    onReady: false,
    isPlaying: false,
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    loop: false,
    shuffle: false,
    seeking: false,
    currentSong: '',
    controls: false,
    duration: 0,
    isPlaylist: false,
    songs: [],
};

const musicSlice = createSlice({
    name: 'music',

    initialState: initState,
    reducers: {
        updatePlaylist: (state, action) => {
            state.songs = action.payload;

            // const newSongId = action.payload.id;
            // if (state.every((item) => item.id !== newSongId)) {
            //     state.push(action.payload);
            // }
        },
        onReady: (state) => {
            state.onReady = true;
        },
        handlePlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        handleMute: (state) => {
            state.muted = !state.muted;
        },
        handleDuration: (state, action) => {
            state.duration = action.payload;
            console.log(action.payload);
        },
        handleProgress: (state, action) => {
            if (!state.seeking) state.played = action.payload.played;
        },
        handleVolumeChange: (state, action) => {
            state.volume = parseFloat(action.payload);
            state.muted = action.payload === 0 ? true : false;
        },
        handleVolumeSeek: (state, action) => {
            state.volume = parseFloat(action.payload);
            state.muted = action.payload === 0 ? true : false;
        },
        handleSeek: (state, action) => {
            state.played = parseFloat(action.payload / 100);
        },
        handleSeekMouseDown: (state) => {
            state.seeking = true;
        },
        handleSeekMouseUp: (state) => {
            state.seeking = false;
        },
        toggleLoop: (state) => {
            state.loop = !state.loop;
        },
        toggleShuffle: (state) => {
            state.shuffle = !state.shuffle;
        },
        // Playlist
        toggleIsPlaylist: (state) => {
            state.isPlaylist = !state.isPlaylist;
        },
        closePlaylist: (state) => {
            state.isPlaylist = false;
        },
        handlePickSong: (state, action) => {
            state.currentSong = action.payload;
        },
    },
});
export const {
    onReady,
    updatePlaylist,
    handleDuration,
    handleProgress,
    handlePlaying,
    handleMute,
    handleVolumeChange,
    handleVolumeSeek,
    handleSeek,
    handleSeekMouseDown,
    handleSeekMouseUp,
    toggleLoop,
    toggleShuffle,
    toggleIsPlaylist,
    closePlaylist,
    handlePickSong,
} = musicSlice.actions;

export default musicSlice.reducer;
