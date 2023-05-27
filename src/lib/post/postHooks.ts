import { Firestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toError } from "../error/misc";
import { Working } from "../misc";
import { Post } from "./Post";
import { fetchUserPosts } from "./postDb";

export function useUserPosts(
  db: Firestore,
  userId: string,
  updatedAt: number
): [Post[] | Working, Error | null] {
  const [posts, setPosts] = useState<Post[] | Working>(Working);
  const [error, setError] = useState<Error | null>(null);
  const [, setLastUpdatedAt] = useState(updatedAt);

  useEffect(() => {
    setPosts(Working);
    setError(null);
    setLastUpdatedAt(updatedAt);

    fetchUserPosts(db, userId)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error(err);
        setPosts([]);
        setError(toError(err));
      });
  }, [db, updatedAt, userId]);

  return [posts, error];
}
