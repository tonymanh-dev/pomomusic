import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import {
    getDocs,
    setDoc,
    doc,
    collection,
    onSnapshot,
} from 'firebase/firestore';
import {
    signOut,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePlaylist } from '../redux/musicSlice';
import { updateData } from '../redux/timerSlice';
import { updateTasks } from '../redux/taskSlice';
import { ADMIN_UID, initUserData } from '../Utils/constant';

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
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const playlistRef = collection(db, 'songs');
    const usersRef = collection(db, 'users');

    // Get realtime data from Firestore
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

                onSnapshot(doc(db, 'users', user?.uid), (doc) => {
                    const { timer, tasks } = doc.data();
                    dispatch(updateData(timer));
                    dispatch(updateTasks(tasks));
                });
            } catch (error) {
                console.log(error.message);
            }
        };
        getData();
    }, [user]);

    //Handle log in with Provider and email & password
    const handleLogin = async (provider) => {
        const docs = await getDocs(usersRef);
        const userDocs = docs.docs.map((doc) => doc.id);

        if (!user) {
            if (provider) {
                try {
                    const { user } = await signInWithPopup(auth, provider);

                    // Create initial data in firestore (timer, tasks data) for Only new user
                    const isExisted = userDocs.includes(user.uid);
                    if (!isExisted) {
                        await setDoc(doc(db, 'users', user.uid), initUserData);
                    }

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
                    setInvalid('Email or password incorrect!');
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

    const handleLogout = async () => {
        await signOut(auth);
        setUser('');
        window.location.reload();
    };

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
            // Create user initial data in firestore (timer, tasks data)
            await setDoc(doc(db, 'users', user.uid), initUserData);

            setUser(user);
            navigate('/');
        } catch (error) {
            setInvalid(error.message);
            console.log(error.message);
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
                pathname,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
