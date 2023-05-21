import { VStack } from "../../lib/layout/VStack";
import { Working } from "../../lib/misc";
import { useUserPosts } from "../../lib/post/postHooks";
import { H2 } from "../../lib/style/H2";

export interface PostsSectionProps {
  userId: string;
}

export function PostsSection({ userId }: PostsSectionProps): JSX.Element {
  const [posts, postError] = useUserPosts(userId);

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
        posts.map((post) => (
          <div key={post.id} className="Post border">
            <div>{post.body}</div>
            <div>
              {/* TODO path */}
              <a className="hover:underline" href={`/posts/${post.id}`}>
                <time className="text-sm text-gray-400">
                  {new Date(post.createdAt).toISOString()}
                </time>
              </a>
            </div>
          </div>
        ))
      )}
    </VStack>
  );
}
