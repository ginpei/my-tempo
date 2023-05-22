import { Firestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Working } from "../misc";
import { Profile } from "./Profile";
import { fetchProfile, getProfileDoc, ssToProfile } from "./profileDb";

export function useProfile(
  db: Firestore,
  userId: string
): [Profile | Working | null, Error | null] {
  const [profile, setProfile] = useState<Profile | Working | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setProfile(Working);
    setError(null);

    fetchProfile(db, userId)
      .then((profile) => {
        setProfile(profile);
      })
      .catch((err) => {
        console.error(err);
        setProfile(null);
        setError(err);
      });
  }, [db, userId]);

  return [profile, error];
}

export function useRealtimeProfile(
  db: Firestore,
  userId: string
): [Profile | Working | null, Error | null] {
  const [profile, setProfile] = useState<Profile | Working | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = getProfileDoc(db, userId);
    return onSnapshot(ref, {
      error: (err) => {
        setError(err);
        setProfile(null);
      },
      next: (ss) => {
        setError(null);

        if (!ss.exists()) {
          setProfile(null);
          return;
        }

        const newProfile = ssToProfile(ss);
        setProfile(newProfile);
      },
    });
  }, [db, userId]);

  return [profile, error];
}
