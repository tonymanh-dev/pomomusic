import React from 'react';
import Button from './MusicBtn';

const Volume = ({ onMuted, muted, onVolumeChange, volume }) => {
    return (
        <>
            <div className="d-flex align-items-center">
                {muted || volume === 0 ? (
                    <Button type="bi bi-volume-mute-fill" onClick={onMuted} />
                ) : (
                    <Button type="bi bi-volume-down-fill" onClick={onMuted} />
                )}
                <div className="w-75">
                    <input
                        type="range"
                        className="form-range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={muted ? 0 : volume}
                        id="customRange2"
                        onChange={onVolumeChange}
                    />
                </div>
            </div>
        </>
    );
};

export default Volume;
