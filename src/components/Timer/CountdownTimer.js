import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const CountdownTimer = ({ isPlaying, timer, keyTimer, handlePromodoro }) => {
    return (
        <div className="d-flex justify-content-center">
            <CountdownCircleTimer
                key={keyTimer}
                size="280"
                colors={['#fff']}
                trailColor={'#f4664c'}
                strokeWidth="5"
                duration={timer}
                isPlaying={isPlaying}
                onComplete={handlePromodoro}
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default CountdownTimer;
