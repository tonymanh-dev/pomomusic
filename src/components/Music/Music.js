import React, { useEffect, useRef, useState } from 'react';
import { db } from './firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { getDocs, collection } from 'firebase/firestore';
import ReactPlayer from 'react-player';

import {
    onReady,
    handleDuration,
    handlePlaying,
    handleProgress,
    updatePlaylist,
    handleMute,
    handleVolumeChange,
    handleVolumeSeek,
    handleSeek,
    handleSeekMouseDown,
    handleSeekMouseUp,
    toggleLoop,
    toggleShuffle,
    toggleIsPlaylist,
} from '../../redux/musicSlice';
import TextAnimate from './TextAnimate';
import Subtitle from './Subtitle';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Controlers from './Controlers';
import Volume from './Volume';
import Playlist from './Playlist';

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

const Music = () => {
    // const [progress, setProgress] = useState({});
    const dispatch = useDispatch();
    const {
        isPlaying,
        muted,
        played,
        volume,
        loop,
        shuffle,
        seeking,
        isPlaylist,
        currentSong,
        songs,
    } = useSelector((state) => state.music);
    const songDefault = songs[1];
    console.log('Playlist:', isPlaylist);
    console.log(currentSong);

    // Check seeking

    const playRef = useRef(null);
    const playlistRef = collection(db, 'songs');

    // // Get data from Firestore
    useEffect(() => {
        const getPlaylist = async () => {
            const data = await getDocs(playlistRef);
            const dataFire = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            // console.log(dataFire);
            dispatch(updatePlaylist(dataFire));
        };

        getPlaylist();
    }, []);

    // Having issue when get current time by this method
    // Pretty slow especial when music is stopped => Find anther method
    const currentTime =
        playRef && playRef.current ? playRef.current.getCurrentTime() : '00:00';

    // Ok
    const duration =
        playRef && playRef.current ? playRef.current.getDuration() : '00:00';

    const elapsedTime = format(currentTime);
    const totalDuration = format(duration);

    // console.log('Elapsed time', elapsedTime);

    console.log(
        'Current time:',
        playRef && playRef.current ? playRef.current : 'Coming...',
    );

    return (
        <>
            <Playlist />
            <div
                className="container-fluid position-fixed h-auto w-100 d-flex justify-content-center py-2 text-light"
                style={{
                    bottom: '0',
                    left: '0',
                    backgroundImage:
                        'linear-gradient(to left, #f4664c, #f66c48, #f77244)',
                    // background: '#f57660',
                    // borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 12px',
                }}
            >
                <div
                    className="row justify-content-between align-items-center h-100 w-100"
                    style={{
                        maxWidth: '1300px',
                    }}
                >
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <img
                                    src={
                                        currentSong
                                            ? currentSong?.image_url
                                            : songDefault?.image_url
                                    }
                                    alt=""
                                    className="rounded-1"
                                    style={{
                                        height: '50px',
                                        width: '50px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            <Subtitle
                                song={currentSong ? currentSong : songDefault}
                            />
                            {/* <TextAnimate title={nowPlay?.name} /> */}
                            <div className="d-flex gap-3 align-items-center">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="Favorite">
                                            Favorite song
                                        </Tooltip>
                                    }
                                >
                                    <i
                                        className="bi bi-heart-fill"
                                        style={{ fontSize: '12px' }}
                                    ></i>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="Favorite">
                                            Playlist
                                        </Tooltip>
                                    }
                                >
                                    <div
                                        onClick={() =>
                                            dispatch(toggleIsPlaylist())
                                        }
                                        role="button"
                                    >
                                        <i
                                            className="bi bi-music-note-list "
                                            style={{ fontSize: '18px' }}
                                        />
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                    <ReactPlayer
                        ref={playRef}
                        url={
                            currentSong ? currentSong?.link : songDefault?.link
                        }
                        playing={isPlaying}
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
                    <div className=" col-12 col-md-4 col-lg-6">
                        <Controlers
                            // ref={controlerRef}
                            isPlaying={isPlaying}
                            onPlay={() => dispatch(handlePlaying())}
                            loop={loop}
                            onLoop={() => dispatch(toggleLoop())}
                            shuffle={shuffle}
                            onShuffle={() => dispatch(toggleShuffle())}
                            onVolumeSeek={(e) => dispatch(handleVolumeSeek(e))}
                            played={played}
                            onSeek={(e) => dispatch(handleSeek(e))}
                            onSeekMouseDown={() =>
                                dispatch(handleSeekMouseDown())
                            }
                            onSeekMouseUp={(e) => {
                                dispatch(
                                    handleSeekMouseUp(
                                        playRef.current.seekTo(
                                            e / 100,
                                            'fraction',
                                        ),
                                    ),
                                );
                            }}
                            elapsedTime={elapsedTime}
                            totalDuration={totalDuration}
                        />
                    </div>
                    <div className="d-none d-md-flex col-md-4 col-lg-3 justify-content-end">
                        <Volume
                            volume={volume}
                            onVolumeChange={(e) =>
                                dispatch(handleVolumeChange(e.target.value))
                            }
                            muted={muted}
                            onMuted={() => dispatch(handleMute())}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Music;
