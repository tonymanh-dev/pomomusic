import React from 'react';

const Subtitle = ({ song }) => {
    if (!song) return;
    return (
        <div
            className="d-flex flex-column mx-3 gap-1"
            style={{ maxHeight: '50px' }}
        >
            <p
                className=" fw-bold mb-0 text-center lh-sm text-md-start "
                style={{
                    fontSize: '12px',
                    overflow: 'hidden',
                    // maxWidth: '120px',
                    // whiteSpace: 'nowrap',
                    // textOverflow: 'clip',
                }}
            >
                {song.name}
            </p>
            <p
                className="mb-0 d-flex justify-content-md-start justify-content-center text-capitalize"
                style={{ fontSize: '10px' }}
            >
                {song.type}
            </p>
        </div>
    );
};

export default Subtitle;
