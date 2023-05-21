import { useState } from "react";
import { H2 } from "../../lib/style/H2";
import { createPost } from "../../lib/post/Post";
import { VStack } from "../../lib/layout/VStack";

const dummyPosts = [
  createPost({
    id: "1",
    body: "This is my first post",
    createdAt: Date.now(),
  }),
  createPost({
    id: "2",
    body: "This is my second post",
    createdAt: Date.now(),
  }),
];

export function PostsSection(): JSX.Element {
  const [posts, setPosts] = useState(dummyPosts);

  return (
    <div className="PostsSection">
      <VStack>
        <H2>Your posts</H2>
        {posts.map((post) => (
          <div key={post.id} className="Post border">
            <div>{post.body}</div>
            <div>
              <time className="text-sm text-gray-400">
                {new Date(post.createdAt).toISOString()}
              </time>
            </div>
          </div>
        ))}
      </VStack>
    </div>
  );
}
