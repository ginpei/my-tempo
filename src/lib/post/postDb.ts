import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ssToDataRecord, toDocumentData } from "../db/dataRecordDb";
import { db } from "../firebase/instances";
import { Post, PostImageMetadata, UploadImageData } from "./Post";

export function postToDocumentData(
  post: Post,
  images: UploadImageData[]
): DocumentData {
  return toDocumentData({
    ...post,
    images: images.map((v): PostImageMetadata => ({ id: v.id })),
  });
}

export function ssToPost(ss: DocumentSnapshot): Post {
  return ssToDataRecord<Post>(ss);
}

export async function savePost(
  post: Post,
  images: UploadImageData[] = []
): Promise<Post> {
  if (post.id === "") {
    const coll = postCollection(db);
    const ref = doc(coll);

    await setDoc(ref, postToDocumentData(post, images));

    const ss = await getDoc(ref);
    const newPost = ssToPost(ss);
    return newPost;
  }

  throw new Error(`WIP`);
}

export async function fetchUserPosts(userId: string): Promise<Post[]> {
  const coll = postCollection(db);
  const q = query(coll, where("userId", "==", userId));
  const ss = await getDocs(q);
  const posts = ss.docs.map((v) => ssToPost(v));
  return posts;
}

export function postCollection(db: Firestore) {
  return collection(db, "posts");
}
