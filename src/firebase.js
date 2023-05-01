// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByMIiLRBQy20fFM80rmKP1qv1iCg7jUdo",
  authDomain: "soft-des-test.firebaseapp.com",
  projectId: "soft-des-test",
  storageBucket: "soft-des-test.appspot.com",
  messagingSenderId: "916903421762",
  appId: "1:916903421762:web:de1b012dfb5b8e32b0cadb",
  measurementId: "G-V15MH9604P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);