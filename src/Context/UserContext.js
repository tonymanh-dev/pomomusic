import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import {
    signOut,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePlaylist } from '../redux/musicSlice';
import { ADMIN_UID } from '../Utils/constant';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [invalid, setInvalid] = useState('');
    const [user, setUser] = useState({});

    // Login with email
    const [registerByEmail, setRegisterByEmail] = useState({
        displayName: '',
        email: '',
        password: '',
    });
    const [loginByEmail, setLoginByEmail] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlistRef = collection(db, 'songs');

    // Get playlist from Firestore
    useEffect(() => {
        const getData = async () => {
            try {
                onSnapshot(playlistRef, (snapshot) => {
                    const dataFire = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));

                    // Filter playist by current user
                    const userPlaylist = dataFire.filter(
                        (song) =>
                            song.uid === user?.uid || song.uid === ADMIN_UID,
                    );
                    dispatch(updatePlaylist(userPlaylist));
                    setIsLoading(false);
                });
            } catch (error) {
                console.log(error.message);
            }
        };
        getData();
    }, [user]);

    //Handle log in with Provider and email & password
    const handleLogin = async (provider) => {
        if (!user) {
            if (provider) {
                try {
                    const { user } = await signInWithPopup(auth, provider);
                    setUser(user);
                    navigate('/');
                } catch (error) {
                    setInvalid(error.message);
                }
            } else {
                try {
                    const { user } = await signInWithEmailAndPassword(
                        auth,
                        loginByEmail.email,
                        loginByEmail.password,
                    );

                    setUser(user);
                    navigate('/');
                } catch (error) {
                    setInvalid(error.message);
                }
                setLoginByEmail({
                    email: '',
                    password: '',
                });
            }
        } else {
            alert("You have already log in. Let's explore the app now !");
        }
    };

    // Handle log out
    const handleLogout = async () => {
        await signOut(auth);
        setUser('');
        window.location.reload();
    };

    // Handle log in by Email
    const handleRegister = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                registerByEmail.email,
                registerByEmail.password,
            );
            await updateProfile(user, {
                displayName: registerByEmail.displayName,
            });
            const updatedProfile = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            };

            setUser(updatedProfile);
            navigate('/');
        } catch (error) {
            setInvalid(error.message);
        }
        setRegisterByEmail({
            displayName: '',
            email: '',
            password: '',
        });
    };

    // Update user auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // Handle upload data to Firebase
    //
    // Update later

    return (
        <UserContext.Provider
            value={{
                user,
                isLoading,
                handleLogin,
                handleLogout,
                handleRegister,
                registerByEmail,
                setRegisterByEmail,
                loginByEmail,
                setLoginByEmail,
                invalid,
                setInvalid,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
