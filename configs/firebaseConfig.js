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
  apiKey: "AIzaSyAJtORJVVa_vzUtMH3xArx2y6CaIfCprIc",
  authDomain: "ai-travel-planner-app-39c41.firebaseapp.com",
  projectId: "ai-travel-planner-app-39c41",
  storageBucket: "ai-travel-planner-app-39c41.firebasestorage.app",
  messagingSenderId: "686716730300",
  appId: "1:686716730300:web:f3a383634eb9889ed9c9b9",
  measurementId: "G-1S80MWQZ3M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);