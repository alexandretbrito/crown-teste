import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs
} from "firebase/firestore";
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
//
export const auth = getAuth();
//
export const signInWithGooglePopup = () => signInWithPopup(auth, g_provider);
//
export const db = getFirestore();

/** 
 *  create bashes to fill and databese elements
 *  USE ONLY ONE TIME!

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

*/
// Start database categories
//
export const getCollectionsAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query (collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};
//
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  await createUserWithEmailAndPassword(auth, email, password);
};
//
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  await signInWithEmailAndPassword(auth, email, password);
};
//
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
        await updateProfile(userDocRef, additionalInformation.displayName);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return userSnapShot;
};
//
export const userSignOut = async () => {
  await signOut(auth);
};
//
export const userAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
//
export const getCurrentUser = () => {
  return new Promise((resolve, reject) =>{
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
} 
