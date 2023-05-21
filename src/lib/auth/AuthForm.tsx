import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useCurrentUser } from "../../lib/auth/currentUserHooks";
import { toError } from '../error/misc';
import { auth } from "../firebase/instances";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";

export interface AuthFormProps {
}

export function AuthForm({}: AuthFormProps): JSX.Element {
  const [currentUser, currentUserError] = useCurrentUser(auth);
  const [signingIn, setSigningIn] = useState(false); // or signing out
  const [signingInError, setSigningInError] = useState<Error | null>(null);

  const error = currentUserError || signingInError;

  const trySigningIn = async (fn: () => Promise<unknown>) => {
    setSigningIn(true);
    setSigningInError(null);

    try {
      await fn();
    } catch (error) {
      console.error(error);
      setSigningInError(toError(error));
    } finally {
      setSigningIn(false);
    }
  }

  const onEmailClick = async () => {
    trySigningIn(async () => {
      const email = prompt('Email', 'user1@example.com');
      if (!email) {
        return;
      }

      const methods = await fetchSignInMethodsForEmail(auth, email);

      // create user if not exists
      if (methods.length === 0) {
        const password = prompt('Password to create your account', 'pass123');
        if (!password) {
          return;
        }
        return createUserWithEmailAndPassword(auth, email, password);
      }

      const password = prompt(`Password for ${email}`, 'pass123');
      if (!password) {
        return;
      }

      return signInWithEmailAndPassword(auth, email, password);
    });
  };
  
  const onGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    trySigningIn(() => signInWithPopup(auth, provider));
  };

  const onGitHubClick = () => {
    const provider = new GithubAuthProvider();
    trySigningIn(() => signInWithPopup(auth, provider));
  };

  const onSignOutClick = async () => {
    setSigningIn(true);
    await signOut(auth);
    setSigningIn(false);
  };

  return (
    <fieldset className="AuthForm w-96 mx-auto" disabled={signingIn}>
      <VStack>
        {error && (
          <p className="text-red-500">{error.message}</p>
        )}
        {currentUser ? (
          <Button onClick={onSignOutClick}>Sign out</Button>
        ) : (
          <>
            <Button onClick={onEmailClick}>EMail</Button>
            <Button onClick={onGoogleClick}>Google</Button>
            <Button onClick={onGitHubClick}>GitHub</Button>
          </>
        )}
      </VStack>
    </fieldset>
  );
}
