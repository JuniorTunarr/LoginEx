// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDbpAhN2d1aS5Qpl93IQ_FIV4JpfiLFXQ",
  authDomain: "codecamp-3499e.firebaseapp.com",
  projectId: "codecamp-3499e",
  storageBucket: "codecamp-3499e.appspot.com",
  messagingSenderId: "236081898442",
  appId: "1:236081898442:web:8eab86d8d1fdaf51ed2533",
  measurementId: "G-QLSN4EBDQ6",
};

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
