import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { POMODORO } from '../../Utils/constant';
import { handlePlayEndSound } from '../../Utils/helper';

// const renderTime = ({ remainingTime }) => {
//     const minutes = Math.floor(remainingTime / 60);
//     const seconds = remainingTime % 60;

//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// };

const CountdownTimer = ({
    isPlaying,
    timer,
    keyTimer,
    onComplete,
    alarmSound,
    mode,
    start,
}) => {
    const renderTime = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        // Play end sound when remaining time smaller than 5 sec
        if (remainingTime < 5 && alarmSound && mode === POMODORO && start) {
            handlePlayEndSound();
        }

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return (
        <div className="d-flex justify-content-center">
            <CountdownCircleTimer
                key={keyTimer}
                size="280"
                colors={['#fff']}
                trailColor={'#f4664c'}
                strokeWidth="5"
                duration={timer}
                // children={children}
                isPlaying={isPlaying}
                onComplete={onComplete}
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default CountdownTimer;
