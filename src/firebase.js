// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyByMIiLRBQy20fFM80rmKP1qv1iCg7jUdo",
//   authDomain: "soft-des-test.firebaseapp.com",
//   projectId: "soft-des-test",
//   storageBucket: "soft-des-test.appspot.com",
//   messagingSenderId: "916903421762",
//   appId: "1:916903421762:web:de1b012dfb5b8e32b0cadb",
//   measurementId: "G-V15MH9604P"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBcWwecFk6JB8Dq9JzvG6ehu1LeMzJKSGc",
//   authDomain: "soft-des-2.firebaseapp.com",
//   projectId: "soft-des-2",
//   storageBucket: "soft-des-2.appspot.com",
//   messagingSenderId: "110885741587",
//   appId: "1:110885741587:web:bf4212ec830501643d8be6",
//   measurementId: "G-N2ZNT0WD2F"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAwl0j8yTlFAaQCHxXEuidzateba9yJbyI",
  authDomain: "soft-des-3.firebaseapp.com",
  projectId: "soft-des-3",
  storageBucket: "soft-des-3.appspot.com",
  messagingSenderId: "677107932027",
  appId: "1:677107932027:web:c9445c980948b51b447bde",
  measurementId: "G-HYSHFPGD1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage, analytics};