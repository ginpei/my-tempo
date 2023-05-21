import { useState } from "react";
import { toError } from "../../lib/error/misc";
import { VStack } from "../../lib/layout/VStack";
import { ImageFilePreview } from "../../lib/post/ImageFilePreview";
import { createPost, Post } from "../../lib/post/Post";
import { savePost } from "../../lib/post/postDb";
import { PostForm } from "../../lib/post/PostForm";
import { H2 } from "../../lib/style/H2";

export interface NewPostSectionProps {
  userId: string;
}

type FileData = { file: File; id: string };

export function NewPostSection({ userId }: NewPostSectionProps): JSX.Element {
  const [post, setPost] = useState(createPost());
  const [working, setWorking] = useState(false);
  const [postError, setPostError] = useState<Error | null>(null);
  const [images, setImages] = useState<FileData[]>([]);

  const onPostChange = (post: Post) => {
    setPost(post);
  };

  const onImagesSelect = (files: File[]) => {
    const additionalImages = files.map((file) => ({
      file,
      id: window.crypto.randomUUID(),
    }));
    setImages([...images, ...additionalImages]);
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

  const onImageRemoveClick = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <VStack as="section" className="NewPostForm">
      <H2>New post</H2>
      {postError && <p className="text-red-500">{postError.message}</p>}
      <PostForm
        disabled={working}
        onChange={onPostChange}
        onImagesSelect={onImagesSelect}
        onSubmit={onPostSubmit}
        post={post}
      />
      <div className="flex flex-wrap gap-4">
        {images.map(({ file, id }) => (
          <ImageFilePreview
            file={file}
            key={id}
            id={id}
            onRemoveClick={onImageRemoveClick}
          />
        ))}
      </div>
    </VStack>
  );
}
