// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "./firebase.config";

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
