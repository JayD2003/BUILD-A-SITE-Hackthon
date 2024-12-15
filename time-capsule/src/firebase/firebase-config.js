// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq4q4JTSGeXv8_5QxM_oo5TZwQHewaAno",
  authDomain: "time-capsule-45314.firebaseapp.com",
  projectId: "time-capsule-45314",
  storageBucket: "time-capsule-45314.firebasestorage.app",
  messagingSenderId: "917406251328",
  appId: "1:917406251328:web:705e3f8c58f8b98a6ce2a5",
  measurementId: "G-00GFSH1LCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// to get authorization for app
const auth = getAuth(app);
//to get google auth for app
const provider = new GoogleAuthProvider();
//to get database for app
const db = getFirestore(app);

export {app, auth, provider, db}