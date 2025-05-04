// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBzMYbMSB8OXp7i-cclHXx--OJPfZM6cL4",
    authDomain: "mygoals-922fc.firebaseapp.com",
    projectId: "mygoals-922fc",
    storageBucket: "mygoals-922fc.firebasestorage.app",
    messagingSenderId: "944567444598",
    appId: "1:944567444598:web:c3b44a0079ca89d277eb57",
    measurementId: "G-Y8ZHR3B5VS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;