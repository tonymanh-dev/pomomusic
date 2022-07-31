import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = (props) => {
    const [pomodoro, setPomodoro] = useState(50);
    const [executing, setExecuting] = useState({});
    const [startAnimate, setStartAnimate] = useState(false);

    console.log('executing', executing);

    const setCurrentMode = (active_state) => {
        updateExecute({
            ...executing,
            active: active_state,
        });
        setTimerTime(executing);
    };

    const startTimer = () => {
        setStartAnimate(!startAnimate);
    };

    // const pauseTimer = () => {
    //     setStartAnimate(false);
    // };

    const stopTimer = () => {
        setStartAnimate(false);
    };

    // const settingBtn = () => {
    //     setExecuting({});
    //     setPomodoro(0);
    // };

    // Update pomodoro time
    const setTimerTime = (evalute) => {
        switch (evalute.active) {
            case 'pomodoro':
                setPomodoro(evalute.pomodoro);
                break;
            case 'shortBreak':
                setPomodoro(evalute.pomodoro);
                break;
            case 'longBreak':
                setPomodoro(evalute.pomodoro);
                break;
            default:
                setPomodoro(25);
                break;
        }
    };

    const updateExecute = (updateTimer) => {
        setExecuting(updateTimer);
        setTimerTime(updateTimer);
    };

    const children = ({ remainingTime }) => {
        const min = Math.floor(remainingTime / 60);
        const sec = remainingTime % 60;

        return `${min} : ${sec}`;
    };
    return (
        <AppContext.Provider
            value={{
                stopTimer,
                updateExecute,
                pomodoro,
                executing,
                startAnimate,
                startTimer,
                // pauseTimer,
                // settingBtn,
                setCurrentMode,
                children,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
