import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAtcCmV5z-nPcFZ_1pP5J6iYuvXiMrl-4c",
  authDomain: "crwn-db-dbbd3.firebaseapp.com",
  projectId: "crwn-db-dbbd3",
  storageBucket: "crwn-db-dbbd3.appspot.com",
  messagingSenderId: "934276377846",
  appId: "1:934276377846:web:5a34a866a4e861e41690d7",
  measurementId: "G-T8RHV7PTTF",
};

// firebase.initializeApp(config);
const app = initializeApp(config);

export const auth = getAuth();
// export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });

// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
