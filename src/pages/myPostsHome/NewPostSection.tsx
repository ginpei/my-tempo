import { useState } from "react";
import { toError } from "../../lib/error/misc";
import { VStack } from "../../lib/layout/VStack";
import { createPost, Post, UploadImageData } from "../../lib/post/Post";
import { savePost } from "../../lib/post/postDb";
import { PostForm } from "../../lib/post/PostForm";
import { H2 } from "../../lib/style/H2";
import { uploadPostImage } from "../../lib/post/postStorage";
import { isImageLtMb } from "../../lib/file/file";

export interface NewPostSectionProps {
  userId: string;
}

export function NewPostSection({ userId }: NewPostSectionProps): JSX.Element {
  const [post, setPost] = useState(createPost());
  const [working, setWorking] = useState(false);
  const [postError, setPostError] = useState<Error | null>(null);
  const [images, setImages] = useState<UploadImageData[]>([]);

  const onPostChange = (post: Post) => {
    setPost(post);
  };

  const onImagesChange = (newImages: UploadImageData[]) => {
    setImages(newImages);
  };

  const onPostSubmit = async (post: Post) => {
    setPostError(null);
    setWorking(true);
    try {
      if (!images.every(({ file }) => isImageLtMb(file, 5))) {
        throw new Error("Image must be less than 5MB");
      }

      const dbResult = await savePost({
        ...post,
        userId,
      });

      await Promise.all(
        images.map(({ file }) => {
          const postId = dbResult.id;
          const fileId = window.crypto.randomUUID();
          return uploadPostImage(file, postId, fileId);
        })
      );
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
        images={images}
        onChange={onPostChange}
        onImagesChange={onImagesChange}
        onSubmit={onPostSubmit}
        post={post}
      />
    </VStack>
  );
}
