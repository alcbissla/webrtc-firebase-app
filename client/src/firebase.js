import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOCK4LpE7i6KycJFcBZYMIGbF8omnR8fo",
  authDomain: "video-chat-app-56a55.firebaseapp.com",
  projectId: "video-chat-app-56a55",
  storageBucket: "video-chat-app-56a55.firebasestorage.app",
  messagingSenderId: "585588553011",
  appId: "1:585588553011:web:1968b69a36134325b53a46"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);