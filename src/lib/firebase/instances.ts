import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { pickEnv } from "./env";

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

function initializeEmulators() {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}
