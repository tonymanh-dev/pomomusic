import { createSlice } from '@reduxjs/toolkit';
import {
    POMODORO,
    SHORT_BREAK,
    LONG_BREAK,
    PAUSED,
    TIME_FOR_A_BREAK,
    TIME_TO_FOCUS,
    STOP,
    START,
} from '../constanst';

const initialState = {
    mode: POMODORO,
    round: 1,
    autoBreaks: false,
    autoPomodoros: false,
    longBreakInterval: 4,
    modes: {
        [POMODORO]: {
            id: POMODORO,
            label: 'Pomodoro',
            time: 25,
        },
        [SHORT_BREAK]: {
            id: SHORT_BREAK,
            label: 'Short Break',
            time: 5,
        },
        [LONG_BREAK]: {
            id: LONG_BREAK,
            label: 'Long Break',
            time: 15,
        },
    },
};

export const timerSlice = createSlice({
    name: '',
    initialState: initialState,
    reducers: {},
});
