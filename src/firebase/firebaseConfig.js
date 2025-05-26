// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgCEBeD7HnUeD3CZVcyI9YyHcbmFcTtfo",
  authDomain: "pruebaeueea.firebaseapp.com",
  projectId: "pruebaeueea",
  storageBucket: "pruebaeueea.firebasestorage.app",
  messagingSenderId: "615158413056",
  appId: "1:615158413056:web:7798947f5af453ce54e5e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);