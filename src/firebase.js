// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDI_KX54p0G0cS5Y5X0IbTujg_d0HuvcA4",
  authDomain: "harvardgpt.firebaseapp.com",
  projectId: "harvardgpt",
  storageBucket: "harvardgpt.appspot.com",
  messagingSenderId: "608002154023",
  appId: "1:608002154023:web:663faea8d93023e0a37802",
  measurementId: "G-BH5QMJP1RK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
