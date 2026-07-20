// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Dán cấu hình của bạn vào đây (thay thế các giá trị bên dưới)
const firebaseConfig = {
  apiKey: "AIzaSyB-xxxx...",
  authDomain: "hic-lms-db.firebaseapp.com",
  projectId: "hic-lms-db",
  storageBucket: "hic-lms-db.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore database và export nó để file App.jsx dùng
export const db = getFirestore(app);
