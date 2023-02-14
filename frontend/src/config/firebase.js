import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  // apiKey: import.meta.env.VITE_FIREBASE_PUBLIC_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MESUREMENT_ID,
  apiKey: "AIzaSyDgMhYLFWisi3noRDnl4efSn0azW0D9XvU",
  authDomain: "sovereignhousegh-staff.firebaseapp.com",
  projectId: "sovereignhousegh-staff",
  storageBucket: "sovereignhousegh-staff.appspot.com",
  messagingSenderId: "1016585238702",
  appId: "1:1016585238702:web:57f15fd4152feeec19553f",
  measurementId: "G-XSTHDR3ES1",
});
export const auth = getAuth(app);
