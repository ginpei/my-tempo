import { useState } from "react";
import { toError } from "../../lib/error/misc";
import { VStack } from "../../lib/layout/VStack";
import { createPost, Post } from "../../lib/post/Post";
import { savePost } from "../../lib/post/postDb";
import { PostForm } from "../../lib/post/PostForm";
import { H2 } from "../../lib/style/H2";

export interface NewPostSectionProps {
  userId: string;
}

export function NewPostSection({ userId }: NewPostSectionProps): JSX.Element {
  const [post, setPost] = useState(createPost());
  const [working, setWorking] = useState(false);
  const [postError, setPostError] = useState<Error | null>(null);

  const onPostChange = (post: Post) => {
    setPost(post);
  };

  const onPostSubmit = async (post: Post) => {
    setPostError(null);
    setWorking(true);
    try {
      const result = await savePost({
        ...post,
        userId,
      });
      console.log("# result", result);
    } catch (error) {
      console.error(error);
      setPostError(toError(error));
    } finally {
      setWorking(false);
    }
  };

  return (
    <VStack as="section" className="NewPostForm">
      <H2>New post</H2>
      {postError && <p className="text-red-500">{postError.message}</p>}
      <PostForm
        disabled={working}
        onChange={onPostChange}
        onSubmit={onPostSubmit}
        post={post}
      />
    </VStack>
  );
}
