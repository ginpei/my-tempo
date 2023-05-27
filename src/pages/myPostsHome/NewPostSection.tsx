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
  onSubmit: () => void;
}

export function NewPostSection({
  userId,
  onSubmit,
}: NewPostSectionProps): JSX.Element {
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

      const resultPost = await savePost({ ...post, userId }, images);

      await Promise.all(
        images.map(({ file, id }) => {
          const postId = resultPost.id;
          return uploadPostImage(file, postId, id);
        })
      );

      setPost(createPost());
      setImages([]);
      onSubmit();
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
