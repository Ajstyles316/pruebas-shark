// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlIM611zEV9Axujl2kIjftKeUznsI8ZXI",
  authDomain: "transacciones-dfde9.firebaseapp.com",
  projectId: "transacciones-dfde9",
  storageBucket: "transacciones-dfde9.appspot.com",
  messagingSenderId: "273000386792",
  appId: "1:273000386792:web:ee0501fdb8ca92dc40395d",
  measurementId: "G-H8NR2V65FS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);