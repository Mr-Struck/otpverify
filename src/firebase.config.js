import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2cd6xryuQFaJx3PE_x0zx2ibK-AViTao",
  authDomain: "otpver-d72ad.firebaseapp.com",
  projectId: "otpver-d72ad",
  storageBucket: "otpver-d72ad.appspot.com",
  messagingSenderId: "420974916049",
  appId: "1:420974916049:web:5b43def7289a3c829fb0f0",
  measurementId: "G-1FRRZH3V5H",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
