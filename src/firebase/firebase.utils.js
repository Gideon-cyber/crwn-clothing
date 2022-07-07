import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtcCmV5z-nPcFZ_1pP5J6iYuvXiMrl-4c",
  authDomain: "crwn-db-dbbd3.firebaseapp.com",
  projectId: "crwn-db-dbbd3",
  storageBucket: "crwn-db-dbbd3.appspot.com",
  messagingSenderId: "934276377846",
  appId: "1:934276377846:web:5a34a866a4e861e41690d7",
  measurementId: "G-T8RHV7PTTF",
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const docRef = doc(db, "users", `${userAuth.uid}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Add a new document in collection "users"
      await setDoc(doc(db, "users", `${userAuth.uid}`), {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log("error creating user", e.message);
    }
  }

  return docRef;
};

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

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
