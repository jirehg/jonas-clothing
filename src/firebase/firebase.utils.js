import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAenQPoXDgsVFJIW7-X5zCP5bHmf5VKcjA",
  authDomain: "jonas-db.firebaseapp.com",
  databaseURL: "https://jonas-db.firebaseio.com",
  projectId: "jonas-db",
  storageBucket: "jonas-db.appspot.com",
  messagingSenderId: "316345362940",
  appId: "1:316345362940:web:d933a785fe938ee5b82a79",
  measurementId: "G-H00P0FVRP4",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exits) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
