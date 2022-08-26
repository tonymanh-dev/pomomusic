import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';

import {
    handleDuration,
    handleProgress,
    toggleIsPlaylist,
    handleNextSong,
} from '../../redux/musicSlice';
import Subtitle from './Subtitle';
import Controlers from './Controlers';
import Volume from './Volume';
import Playlist from './Playlist';

// Fix re-render this component
const Music = () => {
    const dispatch = useDispatch();
    const { isPlaying, muted, volume, loop, currentSong } = useSelector(
        (state) => state.music,
    );

    const playRef = useRef(null);

    return (
        <>
            <Playlist />
            <div
                className="container-fluid position-fixed h-auto w-100 d-flex justify-content-center pb-4 pb-md-3 pb-xl-2 pt-2 text-light shadow-lg"
                style={{
                    bottom: '0',
                    left: '0',
                    zIndex: '30',
                    backgroundImage:
                        'linear-gradient(to left, #f4664c, #f66c48, #f77244)',
                }}
            >
                <div
                    className="row justify-content-between align-items-center h-100 w-100"
                    style={{
                        maxWidth: '1300px',
                    }}
                >
                    <div className="col-12 col-md-4 col-lg-4 pe-4 position-relative">
                        <div className="d-flex justify-content-sm-between justify-content-md-start align-items-center">
                            <div className="d-flex align-items-center">
                                <img
                                    src={currentSong.image_url}
                                    alt=""
                                    className="rounded-1 "
                                    style={{
                                        height: '50px',
                                        width: '50px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <Subtitle song={currentSong} />

                            <div className="d-flex gap-3 align-items-center ps-3">
                                <div>
                                    <i className="bi bi-heart-fill fs-5"></i>
                                </div>

                                <div
                                    onClick={() => dispatch(toggleIsPlaylist())}
                                    role="button"
                                >
                                    <i className="bi bi-music-note-list fs-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReactPlayer
                        ref={playRef}
                        url={currentSong?.link}
                        playing={isPlaying}
                        onEnded={!loop ? () => dispatch(handleNextSong()) : {}}
                        loop={loop}
                        muted={muted}
                        volume={volume}
                        onDuration={(data) => dispatch(handleDuration(data))}
                        onProgress={(data) => dispatch(handleProgress(data))}
                        style={{ display: 'none' }}
                        onError={() => console('Some thing went wrong!')}
                        pip={false}
                        config={{
                            file: {
                                forceAudio: true,
                            },
                        }}
                    />
                    <div className=" col-12 col-md-4 col-lg-4 px-4 px-md-0">
                        <Controlers playRef={playRef} />
                    </div>
                    <div className="d-none d-md-flex col-md-4 col-lg-4 justify-content-end ps-4">
                        <Volume />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Music;
