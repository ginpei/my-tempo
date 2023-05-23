import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const { config, usingRealFb } = pickEnv();
// console.log("# config", config);
// console.log("# usingRealFb", Boolean(usingRealFb));

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (!usingRealFb) {
  // eslint-disable-next-line no-console
  console.info("Using emulators");
  initializeEmulators();
}

function pickEnv() {
  const apiKey = process.env["NEXT_PUBLIC_FIREBASE_API_KEY"];
  if (!apiKey || apiKey === "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    throw new Error("Invalid Firebase API Key. (Did you set `.env`?`)");
  }

  const config: FirebaseOptions = {
    apiKey: apiKey ?? "",
    authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"] ?? "",
    databaseURL: process.env["NEXT_PUBLIC_FIREBASE_DATABASE_URL"] ?? "",
    projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"] ?? "",
    storageBucket: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"] ?? "",
    messagingSenderId:
      process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"] ?? "",
    appId: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"] ?? "",
  };

  const usingRealFb = Boolean(process.env["NEXT_PUBLIC_FIREBASE_USE_REAL"]);

  return {
    apiKey,
    config,
    usingRealFb,
  };
}

function initializeEmulators() {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}
