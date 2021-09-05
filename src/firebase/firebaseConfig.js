import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDU_Z3k5H1ruyL-BLiH7y-UuoY6ZKJ06Rg",
    authDomain: "pg-wines-frontend.firebaseapp.com",
    projectId: "pg-wines-frontend",
    storageBucket: "pg-wines-frontend.appspot.com",
    messagingSenderId: "1062531664553",
    appId: "1:1062531664553:web:dc1f0066c38c27888837b8"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}