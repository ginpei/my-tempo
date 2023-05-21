import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

type Working = undefined;
const working = undefined;

export function useCurrentUser(auth: Auth): [User | Working | null, Error | null] {
  const [user, setUser] = useState<User | Working | null>(working);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setUser(working);
    setError(null);

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => setUser(user),
      (error) => setError(error)
    );

    return unsubscribe;
  }, [auth]);

  return [user, error];
}