import { useState } from "react";
import { createPost, Post } from "../../lib/post/Post";
import { PostForm } from "../../lib/post/PostForm";
import { VStack } from "../../lib/layout/VStack";
import { H2 } from "../../lib/style/H2";

export function NewPostSection(): JSX.Element {
  const [post, setPost] = useState(createPost());

  const onPostChange = (post: Post) => {
    setPost(post);
  };

  const onPostSubmit = (post: Post) => {
    console.log("# post", post);
  };

  return (
    <VStack as="section" className="NewPostForm">
      <H2>New post</H2>
      <PostForm onChange={onPostChange} onSubmit={onPostSubmit} post={post} />
    </VStack>
  );
}
