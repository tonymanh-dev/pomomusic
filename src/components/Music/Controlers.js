import React from 'react';
import Button from './MusicBtn';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const pColor = { backgroundColor: '#f4664c' };
const wColor = { backgroundColor: '#ffff' };

const Controlers = ({
    onPlay,
    isPlaying,
    played,
    totalDuration,
    elapsedTime,
    onDuration,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    onLoop,
    loop,
    onShuffle,
    shuffle,
}) => {
    return (
        <>
            <div className="d-flex flex-column align-items-center px-3 justify-content-center">
                <div className="d-flex align-items-center gap-4">
                    <Button
                        type="bi bi-shuffle"
                        size="small"
                        onClick={onShuffle}
                        onShuffle={shuffle}
                    />
                    <Button type="bi bi-skip-start-fill" />
                    {isPlaying ? (
                        <Button
                            type="bi bi-pause-circle-fill"
                            size="large"
                            onClick={onPlay}
                        />
                    ) : (
                        <Button
                            type="bi bi-play-circle-fill"
                            size="large"
                            onClick={onPlay}
                        />
                    )}
                    <Button type="bi bi-skip-end-fill" />

                    {loop ? (
                        <Button
                            type="bi bi-repeat-1"
                            size="small"
                            onClick={onLoop}
                        />
                    ) : (
                        <Button
                            type="bi bi-repeat"
                            size="small"
                            onClick={onLoop}
                        />
                    )}
                </div>
                <div className="w-100 mt-2 d-flex align-items-center flex-nowrap">
                    <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
                        {elapsedTime}
                    </span>
                    <Slider
                        className="mx-2"
                        min={0}
                        max={100}
                        value={played * 100}
                        onChange={onSeek}
                        onBeforeChange={onSeekMouseDown}
                        onAfterChange={onSeekMouseUp}
                        onDuration={onDuration}
                        // Styles
                        trackStyle={wColor}
                        railStyle={pColor}
                        dotStyle={pColor}
                        activeDotStyle={{
                            pColor,
                            boxShadow: 'none',
                        }}
                        handleStyle={{
                            border: '1px solid #f4664c',
                            wColor,
                            opacity: '1',
                            boxShadow: 'none',
                            height: '10px',
                            width: '10px',
                            marginTop: '-3px',
                        }}
                    />
                    <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
                        {totalDuration}
                    </span>
                </div>
            </div>
        </>
    );
};

export default Controlers;
