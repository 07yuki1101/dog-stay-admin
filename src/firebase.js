import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB01-MWSZl4Us-XUyXEfeLQjgxUHEUtpQM",
  authDomain: "training-log-app-d219c.firebaseapp.com",
  projectId: "training-log-app-d219c",
  storageBucket: "training-log-app-d219c.firebasestorage.app",
  messagingSenderId: "962315651869",
  appId: "1:962315651869:web:9ed712ea04a815d3d6eff4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);