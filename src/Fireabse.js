import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBP9iCgMHEhMlkPrg-wMtjFs_TAjPSbvsI",
  authDomain: "react-firebase-1fdd7.firebaseapp.com",
  projectId: "react-firebase-1fdd7",
  storageBucket: "react-firebase-1fdd7.firebasestorage.app",
  messagingSenderId: "474177223170",
  appId: "1:474177223170:web:b69397d3ae37ab84a6c51b",
  measurementId: "G-Z8XWHSNEK1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { app, auth, db };
