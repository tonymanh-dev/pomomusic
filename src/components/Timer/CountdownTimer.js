import React, { useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
        return <div className="timer">Too lale...</div>;
    }

    return (
        <div className="timer">
            <div className="value " style={{ fontSize: '70px' }}>
                {remainingTime}
            </div>
        </div>
    );
};

const CountdownTimer = () => {
    return (
        <div className="d-flex justify-content-center">
            <CountdownCircleTimer
                isPlaying={false}
                duration={100}
                colors={['rgba(255,255,255,1)']}
                colorsTime={['']}
                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                trailColor="#f4664c"
                strokeWidth="6"
                size="240"
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default CountdownTimer;
