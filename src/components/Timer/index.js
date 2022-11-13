/* eslint-disable no-restricted-globals */
import React, { useCallback } from 'react';
import Button from '../Button/Button';
import CountdownTimer from './CountdownTimer';
import { useCountdown } from 'react-countdown-circle-timer';
import {
    LONG_BREAK,
    modeBtn,
    POMODORO,
    SHORT_BREAK,
} from '../../Utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMode,
    incrementSession,
    onStart,
    handleCountToLongBreak,
} from '../../redux/timerSlice';
import {
    togglePlaying,
    onPlayMusic,
    onStopMusic,
} from '../../redux/musicSlice';
import {
    handlePlayStartSound,
    handlePauseEndSound,
    endAudio,
} from '../../Utils/helper';

const Timer = () => {
    const dispatch = useDispatch();
    const {
        mode,
        modes,
        alarmSound,
        start,
        autoPomodoros,
        music,
        longBreakInterval,
        countBreaks,
    } = useSelector((state) => state.timer);

    const time = modes[mode]?.time * 60;

    const handlePlayMusic = () => {
        setTimeout(() => {
            dispatch(onPlayMusic());
        }, 1000);
    };

    // Handle play timer and music
    const handleStart = () => {
        dispatch(onStart());

        if (!endAudio.paused) {
            endAudio.pause();
        }

        if (!start && alarmSound && mode === POMODORO && time) {
            // Handle play start sound
            handlePlayStartSound();
        }

        //
        if (music && mode === POMODORO) {
            switch (start) {
                case true:
                    dispatch(onStopMusic());
                    break;
                case false:
                    handlePlayMusic();
                    break;
                default:
                    dispatch(togglePlaying());
            }
        }
    };

    const onSwitch = useCallback(
        (id) => {
            dispatch(setMode(id));
        },
        [dispatch],
    );

    // Auto switch to mode.
    const switchToMode = (id) => {
        dispatch(onStart());
        onSwitch(id);

        if (mode !== POMODORO && alarmSound) {
            handlePlayStartSound();
        }

        if (autoPomodoros) {
            setTimeout(() => {
                dispatch(onStart());
            }, 1000);
        }
    };

    // Handle next to mode
    const handleSwitchMode = (id) => {
        dispatch(handleCountToLongBreak('reset'));

        let allowed = false;
        if (start) {
            dispatch(onStart());
            allowed = confirm(
                'Pomodoro is still runing. Are you want to switch?',
            );

            if (allowed) {
                onSwitch(id);
                dispatch(onStopMusic());
            } else {
                dispatch(onStart());
            }
        } else onSwitch(id);
    };

    // Handle switch to mode
    const handleOnComplete = () => {
        if (alarmSound) {
            handlePauseEndSound();
        }

        switch (mode) {
            case LONG_BREAK:
            case SHORT_BREAK:
                switchToMode(POMODORO);

                handlePlayMusic();
                dispatch(incrementSession());
                window.document.title = 'Time to Work 👨🏻‍💻';
                if (mode === SHORT_BREAK) dispatch(handleCountToLongBreak());
                break;
            default:
                window.document.title = 'Time to Break 🕺';

                //Stop music when switch to Short and Long break
                dispatch(onStopMusic());

                if (countBreaks < longBreakInterval) {
                    switchToMode(SHORT_BREAK);
                } else {
                    switchToMode(LONG_BREAK);
                    // dispatch(onStopMusic());

                    dispatch(handleCountToLongBreak('reset'));
                }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center ">
                <div
                    className="card text-light justify-content-around align-items-center border-0"
                    style={{
                        background: 'transparent',
                        height: '440px',
                        borderRadius: '14px',
                    }}
                >
                    <div
                        className="d-flex justify-content-center rounded-5 container  gap-4 p-2 "
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
                        style={{ fontSize: '80px' }}
                    >
                        <CountdownTimer
                            start={start}
                            mode={mode}
                            timer={time}
                            keyTimer={mode}
                            isPlaying={start}
                            alarmSound={alarmSound}
                            onComplete={handleOnComplete}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn bg-light text-primary rounded-pill fw-bold"
                            style={{ fontSize: '16px', padding: '12px 50px' }}
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
