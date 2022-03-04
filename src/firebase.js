import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
const app =  initializeApp({
     apiKey: "AIzaSyCKo_kStjfJZIs5Kv-VsPcSQfPsjtmG4WI",
     authDomain: "messenger-clone-31b16.firebaseapp.com",
     projectId: "messenger-clone-31b16",
     storageBucket: "messenger-clone-31b16.appspot.com",
     messagingSenderId: "888366868749",
     appId: "1:888366868749:web:965f0007b003ea7576a844"
})

const db = getFirestore();
export default db;