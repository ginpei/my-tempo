import { useEffect, useState } from "react";
import { Working } from "../misc";
import { Post } from "./Post";
import { fetchUserPosts } from "./postDb";
import { toError } from "../error/misc";

export function useUserPosts(
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

    fetchUserPosts(userId)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error(err);
        setPosts([]);
        setError(toError(err));
      });
  }, [updatedAt, userId]);

  return [posts, error];
}
