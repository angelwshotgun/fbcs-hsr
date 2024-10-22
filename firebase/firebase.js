// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Nếu dùng Firestore
import { getDatabase } from 'firebase/database'; // Nếu dùng Realtime Database
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgJLsUJXAymwTfh-dKitwaKQRlAYJyO4g",
  authDomain: "fontbard-championship-series.firebaseapp.com",
  databaseURL: "https://fontbard-championship-series-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fontbard-championship-series",
  storageBucket: "fontbard-championship-series.appspot.com",
  messagingSenderId: "617841478015",
  appId: "1:617841478015:web:2471f2cf8849cfa5b6724a",
  measurementId: "G-9LXBK8D7R6"
};

// Khởi tạo Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firestore
export const db1 = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// Realtime Database (nếu cần)
export const db = getDatabase(firebaseApp);
