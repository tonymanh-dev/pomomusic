import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePlaylist, handlePickSong } from '../../redux/musicSlice';

const Playlist = () => {
    const [songInput, setSongInput] = useState('');
    const dispatch = useDispatch();
    const { songs, isPlaylist } = useSelector((state) => state.music);
    if (!songs) return;

    const handleSearch = () => {
        return songs?.filter(
            (song) =>
                song.name.toLowerCase().includes(songInput) ||
                song.name.toUpperCase().includes(songInput),
        );
    };

    return (
        <div className="position-ralative container">
            <div
                className="position-fixed h-100 px-3 d-flex flex-column align-items-center align-items-md-start shadow-sm w-auto w-md-25"
                style={{
                    top: '0px',
                    maxWidth: '400px',
                    minWidth: '360px',
                    left: isPlaylist ? '0' : '-100%',
                    transition: '550ms',
                    backgroundImage:
                        'linear-gradient(to left bottom, #f4664c, #f66c48, #f77244, #f87941, #f97f3d)',
                }}
            >
                <div className="d-flex justify-content-between alight-items-center w-100 pt-3 ps-3 pb-2 text-light">
                    <h2 className="fs-4 fw-bold">Playlist</h2>
                    <span
                        className="px-3 rounded-5 "
                        role="button"
                        onClick={() => dispatch(closePlaylist())}
                    >
                        <i className="bi bi-x-lg fs-4"></i>
                    </span>
                </div>
                <div className="mb-3 w-100 px-3 position-relative">
                    <input
                        type="text"
                        className="form-control ps-3 fs-6 rounded-pill border-0 "
                        placeholder="Search your song or playist"
                        style={{
                            height: '34px',
                            backgroundColor: '#f0f2f5',
                        }}
                        value={songInput}
                        onChange={(e) => setSongInput(e.target.value)}
                    />
                    <button
                        style={{
                            top: '0',
                            right: '14px',
                            height: '100%',
                            position: 'absolute',
                        }}
                        className="btn border-0 rounded-4 fs-4 text-secondary"
                    >
                        <i className="bi bi-search "></i>
                    </button>
                </div>
                <div className="w-100">
                    <ul className="list-group list-group-flush ">
                        {handleSearch().map((item) => (
                            <li
                                type="button"
                                key={item.name}
                                className="list-group-item-action border-0 w-100 py-1 px-0 d-flex align-items-center px-3 rounded-1 "
                                // style={{ color: '#f4664c' }}
                                onClick={() => dispatch(handlePickSong(item))}
                            >
                                <div className="me-2 shadow">
                                    <img
                                        className="rounded"
                                        style={{
                                            height: '34px',
                                            width: '34px',
                                            objectFit: 'cover',
                                        }}
                                        src={item.image_url}
                                        alt=""
                                    />
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="fw-bold fs-6 ">
                                        {item.name}
                                    </span>
                                    <span style={{ fontSize: '12px' }}>
                                        {item.type ? item.type : 'Lofi'}
                                    </span>
                                </div>
                                {/* <div>
                                    <span>{duration}</span>
                                </div> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Playlist;
