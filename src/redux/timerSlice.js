import { createSlice } from '@reduxjs/toolkit';
import { POMODORO, SHORT_BREAK, LONG_BREAK } from '../Utils/constant';

const initialState = {
    mode: POMODORO,
    start: false,
    session: 1,
    countBreaks: 0,
    music: true,
    autoPomodoros: true,
    longBreakInterval: 4,
    modes: {
        [POMODORO]: {
            id: POMODORO,
            label: 'Pomodoro',
            time: 45,
        },
        [SHORT_BREAK]: {
            id: SHORT_BREAK,
            label: 'Short Break',
            time: 5,
        },
        [LONG_BREAK]: {
            id: LONG_BREAK,
            label: 'Long Break',
            time: 10,
        },
    },
};

const timerSlice = createSlice({
    name: 'timer',
    initialState: initialState,
    reducers: {
        onStart: (state) => {
            state.start = !state.start;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        handleCountToLongBreak: (state, action) => {
            action.payload === 'reset'
                ? (state.countBreaks = 0)
                : (state.countBreaks += 1);
        },
        incrementSession: (state) => {
            state.session += 1;
        },

        // Settings
        updateTime: (state, action) => {
            const { mode, time } = action.payload;
            state.modes[mode].time = time;
        },
        setLongBreakInterval: (state, action) => {
            state.longBreakInterval = action.payload;
        },
        toggleMusic: (state) => {
            state.music = !state.music;
        },

        toggleAutoPomodoros: (state) => {
            state.autoPomodoros = !state.autoPomodoros;
        },
    },
});

export const {
    onStart,
    changeKeyTimer,
    setMode,
    incrementSession,
    handleCountToLongBreak,
    updateTime,
    setLongBreakInterval,
    toggleAutoPomodoros,
    toggleMusic,
} = timerSlice.actions;

export default timerSlice.reducer;
