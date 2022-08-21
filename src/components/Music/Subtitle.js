import React from 'react';

const Subtitle = ({ song }) => {
    return (
        <div
            className="d-flex flex-column mx-3"
            style={{ maxHeight: '50px', width: '100%' }}
        >
            <p
                className=" fw-bold mb-0 fs-6 text-center lh-sm text-md-start "
                style={{
                    overflow: 'hidden',
                    // maxWidth: '100%',
                    // whiteSpace: 'nowrap',
                    // textOverflow: 'hidden',
                }}
            >
                {song.name}
            </p>
            {song.type && (
                <p
                    className="mb-0 d-flex justify-content-md-start justify-content-center"
                    style={{ fontSize: '12px' }}
                >
                    {song.type}
                </p>
            )}
        </div>
    );
};

export default Subtitle;
