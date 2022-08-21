import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePlaylist, handlePickSong } from '../../redux/musicSlice';

const Playlist = () => {
    const [songInput, setSongInput] = useState('');

    const dispatch = useDispatch();
    const { currentSong, songs, isPlaylist } = useSelector(
        (state) => state.music,
    );

    const handleSearch = () => {
        // Sorting name alphabetically
        const nameAscending = [...songs].sort((a, b) =>
            a.name > b.name ? 1 : -1,
        );

        return nameAscending?.filter(
            (song) =>
                song.name.toLowerCase().includes(songInput) ||
                song.name.toUpperCase().includes(songInput),
        );
    };

    return (
        <div className="position-ralative container">
            <div
                className="position-fixed h-100 px-3 d-flex flex-column align-items-center align-items-md-start shadow-lg"
                style={{
                    top: '0',
                    right: '0',
                    left: isPlaylist ? '0' : '-120%',
                    maxWidth: '400px',
                    minWidth: '360px',
                    zIndex: '20 ',
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
                <div
                    className="w-100"
                    style={{ overflow: 'auto', paddingBottom: '10rem' }}
                >
                    <ul className="list-group list-group-flush ">
                        {handleSearch().map((item) => (
                            <li
                                type="button"
                                key={item.id}
                                className="list-group-item-action border-0 w-100 py-2 px-0 my-1 d-flex align-items-center px-3 rounded-1"
                                onClick={() => dispatch(handlePickSong(item))}
                                style={{
                                    backgroundColor:
                                        currentSong?.id === item.id
                                            ? 'rgba(255,255,255,0.2)'
                                            : '',
                                }}
                            >
                                <div className="me-2 shadow">
                                    <img
                                        className="rounded"
                                        style={{
                                            height: '38px',
                                            width: '38px',
                                            objectFit: 'cover',
                                        }}
                                        src={item.image_url}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="d-flex flex-column"
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    <span className="fw-bold fs-5 ">
                                        {item.name}
                                    </span>
                                    <span style={{ fontSize: '12px' }}>
                                        {item.type ? item.type : 'Lofi'}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Playlist;
