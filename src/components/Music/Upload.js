import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlaylist } from '../../redux/musicSlice';
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const Upload = () => {
    const [newSong, setNewSong] = useState({
        name: '',
        type: '',
        link: '',
        image_url: '',
    });

    const playlistRef = collection(db, 'songs');

    // // Get data from Firestore
    // useEffect(() => {
    //     const getPlaylist = async () => {
    //         const data = await getDocs(playlistRef);
    //         const dataFire = data.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         // console.log(dataFire);
    //         dispatch(updatePlaylist(dataFire));
    //     };

    //     getPlaylist();
    // }, []);

    // Add new song from user interface
    const handleChange = (e) => {
        setNewSong((prev) => {
            const { name, value } = e.target;
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // Upload data to firestore
    const handleUpload = async () => {
        await addDoc(playlistRef, newSong);
        alert('Upload successfully !');
        setNewSong(() => {
            return {
                name: '',
                type: '',
                link: '',
                image_url: '',
            };
        });
    };

    // Update or edit song
    // const updateSong = async (id, name, link, img) => {
    //     const songDoc = doc(db, 'songs', id);
    //     const newFields = { name: name, link: link, img: img };
    //     await updateDoc(songDoc, newFields);
    // };

    // Delete song
    // const deleteSong = async (id) => {
    //     const songDoc = doc(db, 'songs', id);
    //     await deleteDoc(songDoc);
    // };

    return (
        <div className="d-flex justify-content-center">
            <div className="mb-3 w-25">
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label text-light">
                        Name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        onChange={handleChange}
                        name="name"
                        value={newSong.name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label text-light">
                        Type
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        onChange={handleChange}
                        name="type"
                        value={newSong.type}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label text-light">
                        Link URL
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        onChange={handleChange}
                        name="link"
                        value={newSong.link}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label text-light">
                        Image(URL)
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        onChange={handleChange}
                        name="image_url"
                        value={newSong.image_url}
                    />
                </div>

                <button
                    type="button"
                    className="btn bg-light "
                    onClick={handleUpload}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default Upload;
