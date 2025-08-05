
// Firebase config and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDIkmrgody09qgQTEf7y8wjDCplGz0e1Xo",
  authDomain: "medconnex-34e15.firebaseapp.com",
  projectId: "medconnex-34e15",
  storageBucket: "medconnex-34e15.firebasestorage.app",
  messagingSenderId: "55473464512",
  appId: "1:55473464512:web:bc5b375ac1feb4f8b7b925",
  measurementId: "G-5E2F7VVZ8P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign in anonymously on load
signInAnonymously(auth).catch((error) => {
  console.error("Firebase anonymous sign-in error:", error);
});
