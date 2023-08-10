import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyUdA1vAtsBLouQSZqEs0mEv0GllA8FG8",
  authDomain: "crown-apparel-fa8dc.firebaseapp.com",
  projectId: "crown-apparel-fa8dc",
  storageBucket: "crown-apparel-fa8dc.appspot.com",
  messagingSenderId: "411696922045",
  appId: "1:411696922045:web:97f2c8a58e1c2fb1e6e6d4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google auth
const g_provider = new GoogleAuthProvider();

//Google auth provider
g_provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, g_provider);

export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  await signInWithEmailAndPassword(auth, email, password);
};



export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      if (Object.keys(additionalInformation).length > 0) {
        updateProfile(userDocRef, additionalInformation.displayName);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(auth.currentUser);
  return userDocRef;
};
