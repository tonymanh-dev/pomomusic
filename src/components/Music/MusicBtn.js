import React from 'react';

const MusicBtn = ({ type, onClick, size, shuffle }) => {
    let fontSize = '22px';
    if (size === 'large') {
        fontSize = '30px';
    }
    if (size === 'small') {
        fontSize = '16px';
    }
    if (type === 'bi bi-shuffle') {
        fontSize = '14px';
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
            {shuffle && (
                <i
                    className="bi bi-dot position-absolute"
                    style={{ bottom: '-6px' }}
                ></i>
            )}
        </div>
    );
};

export default MusicBtn;
