// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import config from './firebase.config';

const app = initializeApp(config);
const auth = getAuth(app);

export { app, auth };
