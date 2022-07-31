import React, { useContext, useEffect } from 'react';
import Button from '../Button';
import CountdownTimer from './CountdownTimer';
import { modeBtn } from '../../constanst';

const Timer = () => {
    return (
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
                    className="d-flex justify-content-between py-2 container "
                    style={{
                        background: 'rgba(255,255,255, 0.1)',
                        borderRadius: '50px',
                    }}
                >
                    {modeBtn.map((mode) => (
                        <Button key={mode.id} title={mode.label} />
                    ))}
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <CountdownTimer />
                </div>

                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-light fs-3 fw-bold px-5 py-3"
                        style={{ borderRadius: '30px', color: '#f4664c' }}
                        onClick={() => {}}
                    >
                        START
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Timer;
