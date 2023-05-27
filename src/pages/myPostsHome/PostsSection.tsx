import { db } from "../../lib/firebase/instances";
import { VStack } from "../../lib/layout/VStack";
import { Working } from "../../lib/misc";
import { PostItem } from "../../lib/post/PostItem";
import { useUserPosts } from "../../lib/post/postHooks";
import { H2 } from "../../lib/style/H2";

export interface PostsSectionProps {
  userId: string;
  updatedAt: number;
}

export function PostsSection({
  userId,
  updatedAt,
}: PostsSectionProps): JSX.Element {
  const [posts, postError] = useUserPosts(db, userId, updatedAt);

  return (
    <VStack as="article" className="PostsSection">
      <H2>Your posts</H2>
      {postError ? (
        <p className="text-red-500">{postError.message}</p>
      ) : posts === Working ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts</p>
      ) : (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </VStack>
  );
}
