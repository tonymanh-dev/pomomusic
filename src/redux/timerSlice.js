import { createSlice } from '@reduxjs/toolkit';
import { POMODORO, SHORT_BREAK, LONG_BREAK } from '../Utils/constant';

const initialState = {
    mode: POMODORO,
    start: false,
    music: true,
    alarmSound: true,
    session: 0,
    countBreaks: 0,
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
        updateData: (state, action) => {
            const { modes, music, autoPomodoros, longBreakInterval } =
                action.payload;

            state.modes[POMODORO] = modes[POMODORO];
            state.modes[SHORT_BREAK] = modes[SHORT_BREAK];
            state.modes[LONG_BREAK] = modes[LONG_BREAK];
            state.music = music;
            state.autoPomodoros = autoPomodoros;
            state.longBreakInterval = longBreakInterval;
        },

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

        // Settings for anonymous user
        updateTime: (state, action) => {
            const { mode, time } = action.payload;
            state.modes[mode].time = time;
        },
        setLongBreakInterval: (state, action) => {
            state.longBreakInterval = action.payload;
        },
        toggleAutoMusic: (state) => {
            state.music = !state.music;
        },

        toggleAutoPomodoros: (state) => {
            state.autoPomodoros = !state.autoPomodoros;
        },
        toggleAlarmSound: (state) => {
            state.alarmSound = !state.alarmSound;
        },
    },
});

export const {
    updateData,
    onStart,
    changeKeyTimer,
    setMode,
    incrementSession,
    handleCountToLongBreak,
    updateTime,
    setLongBreakInterval,
    toggleAutoPomodoros,
    toggleAutoMusic,
    toggleAlarmSound,
} = timerSlice.actions;

export default timerSlice.reducer;
