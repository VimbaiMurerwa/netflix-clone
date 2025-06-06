import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAkkMCpqErzQ8iYziBVPygTsZ2nkhkGVnk",
  authDomain: "netflix-clone-e2da3.firebaseapp.com",
  projectId: "netflix-clone-e2da3",
  storageBucket: "netflix-clone-e2da3.firebasestorage.app",
  messagingSenderId: "141795954036",
  appId: "1:141795954036:web:27d1f14caeee5233eef021"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-up function to create a new user with email and password
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save user info to Firestore
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    throw error;
  }
};

// Login function
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    throw error;
  }
};


const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
