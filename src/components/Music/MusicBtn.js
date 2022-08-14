import React from 'react';

const MusicBtn = ({ type, onClick, size, onShuffle }) => {
    let fontSize = '20px';
    if (size === 'large') {
        fontSize = '24px';
    }
    if (size === 'small') {
        fontSize = '14px';
    }
    if (type === 'bi bi-shuffle') {
        fontSize = '12px';
    }

    return (
        <div
            style={{
                fontSize: fontSize,
                cursor: 'pointer',
                height: '24px',
                width: '24px',
                borderRadius: '50px',
            }}
            className="btn border-0 d-flex align-items-center justify-content-center position-relative pe-auto text-light"
            onClick={onClick}
        >
            <i className={type}></i>
            {onShuffle && (
                <i
                    className="bi bi-dot position-absolute"
                    style={{ bottom: '-4px' }}
                ></i>
            )}
        </div>
    );
};

export default MusicBtn;
