// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAU8d1feyG3inCYF9MZXuANsubZi3HRe6k',
    authDomain: 'pomomusic-65e12.firebaseapp.com',
    databaseURL:
        'https://pomomusic-65e12-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'pomomusic-65e12',
    storageBucket: 'pomomusic-65e12.appspot.com',
    messagingSenderId: '834621943407',
    appId: '1:834621943407:web:b29ca5666e82cd5d1ea79a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
