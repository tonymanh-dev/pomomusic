import React, { useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADMIN_UID } from '../../Utils/constant';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Spinner from '../Spinner';

const MyPlaylist = () => {
    const [songInput, setSongInput] = useState('');

    const { songs } = useSelector((state) => state.music);
    const navigate = useNavigate();

    const handleSearch = () => {
        return songs.filter(
            (song) =>
                song.name.toLowerCase().includes(songInput) ||
                song.name.toUpperCase().includes(songInput),
        );
    };

    // Update or edit song
    // const updateSong = async (id, name, link, img) => {
    //     const songDoc = doc(db, 'songs', id);
    //     const newFields = { name: name, link: link, img: img };
    //     await updateDoc(songDoc, newFields);
    // };

    // Handle delete song
    const handleDelete = async (id) => {
        try {
            const songDoc = doc(db, 'songs', id);
            await deleteDoc(songDoc);
            toast.success('The song was deleted 😎', {
                autoClose: 1000,
            });
        } catch (error) {
            console.log(error.message);
            toast.error('Somthing went wrong. Try again 🤪');
        }
    };

    return (
        <div
            className="container-sm"
            style={{ paddingTop: '80px', maxWidth: '720px' }}
        >
            <div className=" text-start">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fs-3 fw-bold text-primary mb-0">
                        <i className="bi bi-music-note-list me-2"></i>
                        My Playlist
                    </h2>
                    <button
                        type="button"
                        className="btn border-0 fw-bold  fs-4 text-secondary"
                        onClick={() => navigate('/uploadmusic')}
                    >
                        <i className="bi bi-plus-circle me-1 fs-4"></i>
                        Submit music
                    </button>
                </div>

                <div className="mb-4 w-100 position-relative">
                    <input
                        type="text"
                        className="form-control ps-3 fs-4 rounded-pill border-0 "
                        placeholder="Search your song or playist"
                        style={{
                            height: '46px',
                            backgroundColor: '#f0f2f5',
                        }}
                        value={songInput}
                        onChange={(e) => setSongInput(e.target.value)}
                    />
                    <button
                        style={{
                            top: '0',
                            right: '8px',
                            height: '100%',
                            position: 'absolute',
                        }}
                        className="btn border-0 rounded-4 fs-3 text-secondary"
                    >
                        <i className="bi bi-search "></i>
                    </button>
                </div>
                <div style={{ overflow: 'auto', paddingBottom: '10rem' }}>
                    <ul className="list-group list-group-flush ">
                        {handleSearch().map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item-action border-0  py-2 px-0 d-flex align-items-center justify-content-between "
                            >
                                <div className="d-flex align-items-center">
                                    <div className="me-2">
                                        {item.image_url ? (
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
                                        ) : (
                                            <i className="bi bi-card-image fs-1 text-muted opacity-25 me-2"></i>
                                        )}
                                    </div>
                                    <div
                                        className="d-flex flex-column text-start text-dark "
                                        style={{ minWidth: '0' }}
                                    >
                                        <Tippy
                                            content={item.name}
                                            delay={[200, null]}
                                            arrow="round"
                                            theme={'material'}
                                        >
                                            <p
                                                className="fw-bold fs-4 mb-0"
                                                style={{
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {item.name}
                                            </p>
                                        </Tippy>
                                        <p className="fs-5 mb-0">
                                            {item.type ? item.type : 'Music'}
                                        </p>
                                    </div>
                                </div>
                                {item.uid !== ADMIN_UID && (
                                    <div>
                                        <button
                                            type="button"
                                            className="btn border-0"
                                            onClick={() => {
                                                console.log(item);
                                                handleDelete(item.id);
                                            }}
                                        >
                                            <span className="py-2 ps-2 fs-5 text-primary">
                                                <i className="bi bi-trash"></i>
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer style={{ fontSize: '16px' }} />
        </div>
    );
};

export default MyPlaylist;
