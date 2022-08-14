import React, { useState, useEffect } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlaylist } from '../../redux/musicSlice';

const TestUpload = () => {
    const [audio, setAudio] = useState(null);
    const [audioList, setAudioList] = useState([]);
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state.music);
    console.log(playlist);

    const audioListRef = ref(storage, 'songs/');

    const handleUpload = () => {
        if (audio === null) return;
        const audioRef = ref(storage, `songs/${audio.name + v4()}`);
        uploadBytes(audioRef, audio).then((snapshot) => {
            alert('Upload successfully');
        });
        setAudio('');
    };

    useEffect(() => {
        listAll(audioListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setAudioList((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    // console.log(audioList);

    return (
        <div className="d-flex justify-content-center">
            <div className="mb-3 w-25">
                <label htmlFor="formFile" className="form-label text-light">
                    Upload Music
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) => setAudio(e.target.files[0])}
                />
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

export default TestUpload;
