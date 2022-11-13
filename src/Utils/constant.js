export const POMODORO = 'pomodoro';
export const SHORT_BREAK = 'short_break';
export const LONG_BREAK = 'long_break';
export const PAUSED = 'paused';
export const TIME_FOR_A_BREAK = 'Time for a break!';
export const TIME_TO_FOCUS = 'Time to focus!';
export const STOP = 'Stop';
export const START = 'Start';

export const modeBtn = [
    {
        id: 'pomodoro',
        label: 'Pomodoro',
    },
    {
        id: 'short_break',
        label: 'Short Break',
    },
    {
        id: 'long_break',
        label: 'Long Break',
    },
];

export const dummyTasks = {
    tasks: [
        {
            id: 3,
            label: "Finish today's homework",
            isComplete: false,
        },
        {
            id: 1,
            label: 'Write down some idea',
            isComplete: true,
        },
        {
            id: 2,
            label: 'Design homepage much better',
            isComplete: false,
        },
    ],
};

export const ADMIN_UID = process.env.REACT_APP_ADMIN_UID;
export const googleIcon =
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg';
export const fbIcon =
    'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg';

export const initUserData = {
    //Timer and task data here
    timer: {
        mode: POMODORO,
        start: false,
        session: 1,
        countBreaks: 0,
        music: true,
        autoPomodoros: true,
        longBreakInterval: 4,
        alarmSound: true,
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
    },
    tasks: [],
};
