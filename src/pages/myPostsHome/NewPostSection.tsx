import { useState } from "react";
import { toError } from "../../lib/error/misc";
import { isImageLtMb } from "../../lib/file/file";
import { VStack } from "../../lib/layout/VStack";
import {
  createPost,
  isValidPostDraft,
  Post,
  UploadImageData,
} from "../../lib/post/Post";
import { savePost } from "../../lib/post/postDb";
import { PostForm } from "../../lib/post/PostForm";
import { uploadPostImage } from "../../lib/post/postStorage";
import { H2 } from "../../lib/style/H2";
import { db } from "../../lib/firebase/instances";

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
      // this should not happen because submit button becomes disabled
      if (!isValidPostDraft(post, images.length)) {
        throw new Error("Invalid post");
      }

      if (!images.every(({ file }) => isImageLtMb(file, 5))) {
        throw new Error("Image must be less than 5MB");
      }

      const resultPost = await savePost(db, { ...post, userId }, images);

      const postId = resultPost.id;
      await Promise.all(
        images.map(({ file, id }) => {
          return uploadPostImage(userId, file, postId, id);
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
