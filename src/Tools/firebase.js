import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA40Ge9nDpHj0-3ypADsRhdodfEZPJpyKM",
    authDomain: "bibleinayearnotes.firebaseapp.com",
    projectId: "bibleinayearnotes",
    storageBucket: "bibleinayearnotes.appspot.com",
    messagingSenderId: "498542938276",
    appId: "1:498542938276:web:4427cec375c783c287be31",
    measurementId: "G-VEEMWVXQGK"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore(); 