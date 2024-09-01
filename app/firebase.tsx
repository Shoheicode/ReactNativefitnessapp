// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpwquTaJN8wU4yzP92bBpXrq-9UuXiwCE",
  authDomain: "astar-fitness.firebaseapp.com",
  projectId: "astar-fitness",
  storageBucket: "astar-fitness.appspot.com",
  messagingSenderId: "112134066142",
  appId: "1:112134066142:web:fb5a6d4e0c44b64b78d74f",
  measurementId: "G-RVRFMPMQ9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getFirestore(app)

export {database}