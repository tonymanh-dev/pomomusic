import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const Subtitle = ({ song }) => {
    return (
        <div className="d-flex flex-column mx-3" style={{ minWidth: '0' }}>
            <Tippy content={song.name} theme={'light'} delay={[300, null]}>
                <p
                    className=" fw-bold mb-0 fs-6 text-center lh-sm text-md-start "
                    style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    {song.name}
                </p>
            </Tippy>
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
