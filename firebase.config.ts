import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  initializeAuth,
  browserLocalPersistence,
  debugErrorMap,
  prodErrorMap,
  browserPopupRedirectResolver,
  connectAuthEmulator,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHA_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEAGING_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage };
export const fbAuth = getAuth(app);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword };
// export const auth = initializeAuth(app, {
//   errorMap:
//     process.env.NODE_ENV === "development" ? debugErrorMap : prodErrorMap,
//   persistence: browserLocalPersistence,
//   popupRedirectResolver: browserPopupRedirectResolver,
// });
