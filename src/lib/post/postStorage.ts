import {
  UploadMetadata,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getSha512Hash, isImageLtMb } from "../file/file";
import { storage } from "../firebase/instances";

export function getPostImageRef(postId: string, fileId: string) {
  return ref(storage, `posts/${postId}/${fileId}`);
}

export async function getPostImageUrl(
  postId: string,
  fileId: string
): Promise<string> {
  try {
    const refImage = getPostImageRef(postId, fileId);
    return await getDownloadURL(refImage);
  } catch (error) {
    console.error(error);
    return "";
  }
}

export async function uploadPostImage(
  file: File,
  postId: string,
  fileId: string
): Promise<string> {
  if (!isImageLtMb(file, 5)) {
    throw new Error("File must be an image and less than 5MB");
  }

  const metadata: UploadMetadata = {
    contentType: file.type,
    customMetadata: {
      sha512: await getSha512Hash(file),
      visibility: "public",
    },
  };

  const refFile = getPostImageRef(postId, fileId);
  const result = await uploadBytes(refFile, file, metadata);

  const url = await getDownloadURL(result.ref);
  return url;
}
