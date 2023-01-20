// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpjM84404ex_4O9JaQByz_BltMe_HulV8",
  authDomain: "projectmanager-9d1e6.firebaseapp.com",
  projectId: "projectmanager-9d1e6",
  storageBucket: "projectmanager-9d1e6.appspot.com",
  messagingSenderId: "798725188533",
  appId: "1:798725188533:web:19db3e02a3f7ee0a7007fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()
const auth = getAuth()

export {db, auth}