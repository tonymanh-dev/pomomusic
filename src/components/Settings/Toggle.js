import React from 'react';

const Toggle = ({ on, onClick }) => {
    return (
        <div
            style={{
                height: '28px',
                width: '54px',
                backgroundColor: on ? '#9cd25f' : 'rgb(220, 220, 220)',
                position: 'relative',
                borderRadius: '2rem',
                transition: 'backgroundColor 0.6s ease',
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '2px',
                    left: '0',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0 0 1px',
                    transition: 'transform 0.2s ease',
                    transform: on ? 'translateX(28px)' : 'translateX(2px)',
                }}
            ></div>
        </div>
    );
};

export default Toggle;
