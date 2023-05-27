import { FirebaseOptions } from "firebase/app";

export function pickEnv(): {
  apiKey: string;
  config: FirebaseOptions;
  usingRealFb: boolean;
} {
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
