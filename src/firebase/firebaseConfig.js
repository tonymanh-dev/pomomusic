import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'pomomusic-65e12.firebaseapp.com',
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: 'pomomusic-65e12',
    storageBucket: 'pomomusic-65e12.appspot.com',
    messagingSenderId: '834621943407',
    appId: process.env.REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
