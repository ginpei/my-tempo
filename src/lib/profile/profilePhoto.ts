import {
  FirebaseStorage,
  UploadMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";

export async function uploadProfilePhoto(
  storage: FirebaseStorage,
  userId: string,
  file: File
): Promise<void> {
  const refPhoto = ref(storage, `users/${userId}/photo`);
  const meta: UploadMetadata = {
    contentType: file.type,
  };
  const result = await uploadBytes(refPhoto, file, meta);
  console.log("# result", result);
}
