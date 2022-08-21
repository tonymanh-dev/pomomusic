import { createSlice, current } from '@reduxjs/toolkit';

const initSong = {
    id: '8DPsEtiwcHbpCPJjjrtG',
    image_url:
        'https://images.unsplash.com/photo-1605455447870-74140e959c8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    link: 'https://youtu.be/LCHJY1M-RP4',
    name: 'Good morning, enjoy your day with this playlist',
    type: 'Pop songs',
};

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
    currentSong: initSong,
    currentIndex: 0,
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
        },
        onReady: (state) => {
            state.onReady = true;
        },
        togglePlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        handleDuration: (state, action) => {
            state.duration = action.payload;
        },
        handleProgress: (state, action) => {
            if (!state.seeking) state.played = action.payload.played;
        },

        // Volume controler
        toggleMute: (state) => {
            state.muted = !state.muted;
        },
        handleVolumeChange: (state, action) => {
            state.volume = parseFloat(action.payload / 100);
            state.muted = action.payload === 0 ? true : false;
        },

        // Music controler
        handleNextSong: (state) => {
            const songs = current(state.songs);
            const curIndex = songs.findIndex(
                (song) => song.id === state.currentSong?.id,
            );
            const random = Math.floor(Math.random() * songs.length);
            const nextSong =
                songs[
                    state.shuffle && random !== curIndex ? random : curIndex + 1
                ];

            state.currentSong =
                songs.length - 1 > curIndex ? nextSong : songs[0];
        },
        handlePrevSong: (state) => {
            const songs = current(state.songs);
            const curIndex = songs.findIndex(
                (song) => song.id === state.currentSong?.id,
            );
            const random = Math.floor(Math.random() * songs.length);
            const prevSong =
                songs[
                    state.shuffle && random !== curIndex ? random : curIndex - 1
                ];

            state.currentSong =
                curIndex > 0 ? prevSong : songs[songs.length - 1];
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
    togglePlaying,

    toggleMute,
    handleVolumeChange,

    handleNextSong,
    handlePrevSong,
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
