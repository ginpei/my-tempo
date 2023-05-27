import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { isImageLtMb } from "../../lib/file/file";
import { Post, UploadImageData, isValidPostDraft } from "../../lib/post/Post";
import { savePost } from "../../lib/post/postDb";
import { uploadPostImage } from "../../lib/post/postStorage";

export async function createNewPost(
  db: Firestore,
  storage: FirebaseStorage,
  userId: string,
  post: Post,
  images: UploadImageData[]
): Promise<Post> {
  // this should not happen because submit button becomes disabled
  if (!isValidPostDraft(post, images.length)) {
    throw new Error("Invalid post");
  }

  if (!images.every(({ file }) => isImageLtMb(file, 5))) {
    throw new Error("Image must be less than 5MB");
  }

  const resultPost = await savePost(db, {
    ...post,
    images: images.map((_, i) => ({ id: String(i + 1) })),
    userId,
  });

  const postId = resultPost.id;
  await Promise.all(
    images.map(({ file }, index) => {
      return uploadPostImage(userId, file, postId, String(index + 1));
    })
  );

  return resultPost;
}
