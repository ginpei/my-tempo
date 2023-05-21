import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const apiKey = process.env["NEXT_PUBLIC_FIREBASE_API_KEY"];
if (!apiKey || apiKey === "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
  throw new Error("Invalid Firebase API Key. (Did you set `.env`?`)");
}

const config: FirebaseOptions = {
  apiKey: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"] ?? "",
  authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"] ?? "",
  databaseURL: process.env["NEXT_PUBLIC_FIREBASE_DATABASE_URL"] ?? "",
  projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"] ?? "",
  storageBucket: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"] ?? "",
  messagingSenderId:
    process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"] ?? "",
  appId: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"] ?? "",
};
// console.log('# config', config);

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

const usingRealFb = process.env["NEXT_PUBLIC_FIREBASE_USE_REAL"];
if (!usingRealFb) {
  // eslint-disable-next-line no-console
  console.info("Using emulators");
  initializeEmulators();
}

function initializeEmulators() {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
