import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { isImageLtMb } from "../../lib/file/file";
import {
  Post,
  PostImageMetadata,
  UploadImageData,
  isValidPostDraft,
} from "../../lib/post/Post";
import { postDoc, savePost } from "../../lib/post/postDb";
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

  const ref = postDoc(db, undefined);
  const postId = ref.id;

  const urls = await Promise.all(
    images.map(({ file }, index) => {
      return uploadPostImage(storage, userId, file, postId, String(index + 1));
    })
  );

  const imagesWithUrl: PostImageMetadata[] = images.map((_image, index) => {
    const url = urls[index];
    if (url === undefined) {
      throw new Error("Something went wrong (URL not found)");
    }

    return {
      id: String(index + 1),
      url,
    };
  });

  const resultPost = await savePost(db, {
    ...post,
    images: imagesWithUrl,
    userId,
  });

  return resultPost;
}
