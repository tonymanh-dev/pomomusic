import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { UserContext } from '../../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {
    const { user } = useContext(UserContext);
    const [song, setSong] = useState({
        name: '',
        type: '',
        link: '',
        image_url: '',
    });
    const navigate = useNavigate();
    if (!user) {
        navigate('/login');
    }

    const playlistRef = collection(db, 'songs');

    const handleChange = (e) => {
        setSong((prev) => {
            const { name, value } = e.target;
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // Validate fill into form
    const handleValidate = () => {
        if (song.name && song.link && song.image_url) {
            handleUpload();
        } else {
            toast.warning(
                'You have to fill out all of fields to submit. Check it again !',
            );
        }
    };

    // Handle upload data to firestore
    const handleUpload = async () => {
        try {
            await addDoc(playlistRef, {
                name: song.name,
                type: song.type,
                link: song.link,
                image_url: song.image_url,
                uid: user.uid,
            });
            toast.success(' 🦄 Upload successfully !', {
                autoClose: 1000,
            });
        } catch (error) {
            console.log(error.message);
            toast.error('Upload failed, try again !');
        }

        setSong(() => {
            return {
                name: '',
                type: '',
                link: '',
                image_url: '',
            };
        });
    };

    const Label = ({ label }) => (
        <label className="form-label fw-bold text-secondary fs-5">
            {label}
            {label !== 'Type' && <span className="text-primary ms-1">*</span>}
        </label>
    );

    return (
        <div
            className="container-sm"
            style={{ paddingTop: '80px', maxWidth: '720px' }}
        >
            <div className=" text-center">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                    <h2 className="fs-3 fw-bold text-primary mb-0">
                        <i className="bi bi-cloud-arrow-up-fill me-2"></i>
                        Submit music
                    </h2>
                    <button
                        type="button"
                        className="btn border-0 fw-bold  fs-4 text-secondary"
                        onClick={() => navigate('/myplaylist')}
                    >
                        <i className="bi bi-music-note-list me-1 fs-4"></i>
                        My playlist
                    </button>
                </div>
                <div className="my-3 text-start">
                    <Label label="Name" />
                    <input
                        className="form-control fs-4 border-0 rounded-1"
                        style={{ padding: '12px', backgroundColor: '#f0f2f5' }}
                        type="text"
                        placeholder="This is a playlist"
                        name="name"
                        value={song.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 text-start">
                    <Label label="Type" />
                    <input
                        className="form-control fs-4 border-0 rounded-1"
                        style={{ padding: '12px', backgroundColor: '#f0f2f5' }}
                        type="text"
                        placeholder="US-UK, Pop, Lofi..."
                        name="type"
                        value={song.type}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 text-start">
                    <Label label="Song (Youtube URL)" />

                    <input
                        className="form-control fs-4 border-0 rounded-1"
                        style={{ padding: '12px', backgroundColor: '#f0f2f5' }}
                        type="text"
                        placeholder="Example: https://www.youtube.com/music"
                        name="link"
                        value={song.link}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 text-start">
                    <Label label="Image (URL)" />
                    <input
                        className="form-control fs-4 border-0 rounded-1"
                        style={{ padding: '12px', backgroundColor: '#f0f2f5' }}
                        type="text"
                        placeholder="Example: https://google.com/photo"
                        name="image_url"
                        value={song.image_url}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-primary border-0 mt-3 w-100 p-3 fs-4 fw-bold rounded-5 text-light"
                    onClick={handleValidate}
                >
                    SUBMIT
                </button>
            </div>
            <ToastContainer style={{ fontSize: '16px' }} />
        </div>
    );
};

export default Upload;
