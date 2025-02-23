import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjCsmeWAHF1nLiqGrn0U7DOQdy7sDb1MU",
  authDomain: "crown-clothing-f04b7.firebaseapp.com",
  projectId: "crown-clothing-f04b7",
  storageBucket: "crown-clothing-f04b7.firebasestorage.app",
  messagingSenderId: "387719729118",
  appId: "1:387719729118:web:5f680a20c22b898ffb574f",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log({userDocRef});
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {displayName, email, createdAt});
    }catch(error){
      console.log('error', error);
    }
  }
  return userDocRef;
}