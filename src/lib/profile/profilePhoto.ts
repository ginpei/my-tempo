import {
  FirebaseStorage,
  UploadMetadata,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

/**
 * @returns URL
 */
export async function uploadProfilePhoto(
  storage: FirebaseStorage,
  userId: string,
  file: File | null
): Promise<string> {
  const refPhoto = ref(storage, `users/${userId}/photo`);

  if (file === null) {
    await deleteObject(refPhoto);
    return "";
  }

  const meta: UploadMetadata = {
    contentType: file.type,
  };
  await uploadBytes(refPhoto, file, meta);
  const url = await getDownloadURL(refPhoto);
  return url;
}
