// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRPZCpgE2F6v-x5mqXn7rYzDSyx7rJUao",
  authDomain: "whatsapp-ebf16.firebaseapp.com",
  projectId: "whatsapp-ebf16",
  storageBucket: "whatsapp-ebf16.appspot.com",
  messagingSenderId: "970210508402",
  appId: "1:970210508402:web:de33855b9b54dd0f840ceb"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, db, auth, provider };



