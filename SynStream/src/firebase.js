// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "synstream2-d8075.firebaseapp.com",
  projectId: "synstream2-d8075",
  storageBucket: "synstream2-d8075.appspot.com",
  messagingSenderId: "715534898412",
  appId: "1:715534898412:web:40326571f30dbb139781c9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

