import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { ssToDataRecord, toDocumentData } from "../db/dataRecordDb";
import { Profile } from "./Profile";

export function ssToProfile(ss: DocumentSnapshot): Profile {
  return ssToDataRecord<Profile>(ss);
}

export async function saveProfile(
  db: Firestore,
  profile: Profile
): Promise<Profile> {
  const ref = getProfileDoc(db, profile.id);
  await setDoc(ref, toDocumentData(profile));
  return profile;
}

export async function fetchProfile(
  db: Firestore,
  userId: string
): Promise<Profile | null> {
  const ref = getProfileDoc(db, userId);
  const ss = await getDoc(ref);
  if (!ss.exists()) {
    return null;
  }
  const profiles = ssToProfile(ss);
  return profiles;
}

export function getProfileCollection(db: Firestore): CollectionReference {
  return collection(db, "profiles");
}

export function getProfileDoc(
  db: Firestore,
  userId: string
): DocumentReference {
  return doc(getProfileCollection(db), userId);
}
