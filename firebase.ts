// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTYIKnyQt1kqt_AA58dPH0KIuhmGm5wGE",
  authDomain: "fir-stripe-bootstrap.firebaseapp.com",
  projectId: "fir-stripe-bootstrap",
  storageBucket: "fir-stripe-bootstrap.appspot.com",
  messagingSenderId: "1001374518533",
  appId: "1:1001374518533:web:a69ce37e20f4a716627b6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
export const initFirebase = () => {
    console.log("Hello from Firebase!");
    return app
};

