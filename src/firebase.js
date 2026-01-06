import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Ganti dengan konfigurasi Firebase project Anda
// Cara dapatkan: Buka Firebase Console -> Project Settings -> General -> Your apps -> SDK setup
const firebaseConfig = {
    apiKey: "AIzaSyC1FmrKlBAnCDCCSyj2J6Q86tUMNUu_KOo",
    authDomain: "lokertracker.firebaseapp.com",
    projectId: "lokertracker",
    storageBucket: "lokertracker.firebasestorage.app",
    messagingSenderId: "74666959648",
    appId: "1:74666959648:web:0770c430a6e6976e3cad45",
    measurementId: "G-89X3J6B1QY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db };
