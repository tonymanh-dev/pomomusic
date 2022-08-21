import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
    handleNextSong,
    handlePrevSong,
    handleSeek,
    handleSeekMouseDown,
    handleSeekMouseUp,
    toggleLoop,
    toggleShuffle,
    togglePlaying,
} from '../../redux/musicSlice';

import Button from './MusicBtn';

const pColor = { backgroundColor: '#f4664c' };
const wColor = { backgroundColor: '#ffff' };

const format = (seconds) => {
    if (isNaN(seconds)) {
        return '00:00';
    }
    const date = new Date(seconds * 1000);

    const hour = date.getUTCHours();
    const min = date.getUTCMinutes();
    const sec = date.getUTCSeconds().toString().padStart(2, '0');

    if (hour) {
        return `${hour}:${min.toString().padStart(2, '0')}:${sec}`;
    }
    return `${min}: ${sec}`;
};

const Controlers = ({ playRef }) => {
    const dispatch = useDispatch();
    const { isPlaying, played, loop, shuffle } = useSelector(
        (state) => state.music,
    );

    // Having an issue when get current time by this method
    // Pretty slow especial when music is stopped => Find anther method
    const currentTime =
        playRef && playRef.current ? playRef.current.getCurrentTime() : '00:00';

    // Ok
    const duration =
        playRef && playRef.current ? playRef.current.getDuration() : '00:00';

    const elapsedTime = format(currentTime);
    const totalDuration = format(duration);

    return (
        <>
            <div className="d-flex flex-column align-items-center mt-3 mt-md-0 justify-content-center">
                <div className="d-flex align-items-center gap-4">
                    <Button
                        type="bi bi-shuffle"
                        size="small"
                        onClick={() => dispatch(toggleShuffle())}
                        shuffle={shuffle}
                    />
                    <Button
                        type="bi bi-skip-start-fill"
                        onClick={() => dispatch(handlePrevSong())}
                    />
                    {isPlaying ? (
                        <Button
                            type="bi bi-pause-circle-fill"
                            size="large"
                            onClick={() => dispatch(togglePlaying())}
                        />
                    ) : (
                        <Button
                            type="bi bi-play-circle-fill"
                            size="large"
                            onClick={() => dispatch(togglePlaying())}
                        />
                    )}
                    <Button
                        type="bi bi-skip-end-fill"
                        onClick={() => dispatch(handleNextSong())}
                    />

                    {loop ? (
                        <Button
                            type="bi bi-repeat-1"
                            size="small"
                            onClick={() => dispatch(toggleLoop())}
                        />
                    ) : (
                        <Button
                            type="bi bi-repeat"
                            size="small"
                            onClick={() => dispatch(toggleLoop())}
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
                        onChange={(e) => dispatch(handleSeek(e))}
                        onBeforeChange={() => dispatch(handleSeekMouseDown())}
                        onAfterChange={(e) => {
                            dispatch(
                                handleSeekMouseUp(
                                    playRef.current.seekTo(e / 100, 'fraction'),
                                ),
                            );
                        }}
                        // Styles
                        trackStyle={wColor}
                        railStyle={{ background: 'rgba(255,255,255, 0.2' }}
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
