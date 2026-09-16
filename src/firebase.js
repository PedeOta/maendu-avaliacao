import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfCgp39GJaxzwhyyFQHMWlzX-CUoK3XzU",
  authDomain: "maendu-avaliacoes.firebaseapp.com",
  projectId: "maendu-avaliacoes",
  storageBucket: "maendu-avaliacoes.firebasestorage.app",
  messagingSenderId: "428015809253",
  appId: "1:428015809253:web:267a0cd03913f70c9a5a0c",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);