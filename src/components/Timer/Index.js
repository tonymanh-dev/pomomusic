/* eslint-disable no-restricted-globals */
import React, { useContext, useEffect, useCallback } from 'react';
import Button from '../Button';
import CountdownTimer from './CountdownTimer';
import { LONG_BREAK, modeBtn, POMODORO, SHORT_BREAK } from '../../constanst';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMode,
    incrementSession,
    onStart,
    handleCountToLongBreak,
} from '../../redux/timerSlice';
import { handlePlaying } from '../../redux/musicSlice';

const Timer = () => {
    const dispatch = useDispatch();
    const {
        mode,
        modes,
        start,
        autoPomodoros,
        music,
        longBreakInterval,
        countBreaks,
    } = useSelector((state) => state.timer);
    const { isPlaying } = useSelector((state) => state.music);

    console.log(isPlaying);

    const time = modes[mode].time * 60;

    const handleStart = () => {
        dispatch(onStart());
        if (!isPlaying && music) {
            dispatch(handlePlaying());
        }
    };

    const onSwitch = useCallback(
        (id) => {
            dispatch(setMode(id));
        },
        [dispatch],
    );

    // Auto switch to mode.
    const switchToMode = useCallback(
        (id) => {
            dispatch(onStart());
            onSwitch(id);

            if (autoPomodoros) {
                setTimeout(() => {
                    dispatch(onStart());
                }, 1000);
            }
        },
        [onSwitch, autoPomodoros, dispatch],
    );

    // Handle next to mode
    const handleSwitchMode = (id) => {
        dispatch(handleCountToLongBreak('reset'));

        let allowed = false;
        if (start) {
            dispatch(onStart());
            allowed = confirm(
                'Pomodoro is still runing. Are you want to switch?',
            );
            allowed ? onSwitch(id) : dispatch(onStart());
        } else onSwitch(id);
    };

    // Handle switch to mode
    const handlePromodoros = useCallback(() => {
        switch (mode) {
            case LONG_BREAK:
            case SHORT_BREAK:
                switchToMode(POMODORO);
                dispatch(incrementSession());
                if (mode === SHORT_BREAK) dispatch(handleCountToLongBreak());
                break;
            default:
                if (countBreaks < longBreakInterval) {
                    switchToMode(SHORT_BREAK);
                } else {
                    switchToMode(LONG_BREAK);
                    dispatch(handleCountToLongBreak('reset'));
                }
        }
    }, [mode, longBreakInterval, switchToMode, dispatch, countBreaks]);

    // console.log(mode);
    // console.log('count ', countBreaks);
    return (
        <>
            <div className="d-flex justify-content-center ">
                <div
                    className="card text-light border-0 justify-content-around align-items-center"
                    style={{
                        background: 'transparent',
                        width: '460px',
                        height: '400px',
                        borderRadius: '14px',
                    }}
                >
                    <div
                        className="d-flex justify-content-between p-1  container rounded-5 "
                        style={{
                            background: 'rgba(255,255,255, 0.1)',
                        }}
                    >
                        {modeBtn.map((label) => (
                            <Button
                                key={label.id}
                                title={label.label}
                                onClick={() => handleSwitchMode(label.id)}
                                active={label.id === mode}
                            />
                        ))}
                    </div>

                    <div
                        className="d-flex justify-content-center align-items-center fw-bold "
                        style={{ fontSize: '60px' }}
                    >
                        <CountdownTimer
                            timer={time}
                            keyTimer={mode}
                            isPlaying={start}
                            handlePromodoro={handlePromodoros}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn bg-light text-primary rounded-pill fw-bold"
                            style={{ fontSize: '18px', padding: '12px 28px' }}
                            onClick={handleStart}
                        >
                            {start ? 'STOP' : 'START'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Timer;
