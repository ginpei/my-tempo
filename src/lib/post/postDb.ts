import {
  DocumentSnapshot,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ssToDataRecord, toDocumentData } from "../db/dataRecordDb";
import { Post } from "./Post";

export const postToDocumentData = toDocumentData;

export function ssToPost(ss: DocumentSnapshot): Post {
  return ssToDataRecord<Post>(ss);
}

export async function savePost(db: Firestore, post: Post): Promise<Post> {
  if (post.id === "") {
    const coll = postCollection(db);
    const ref = doc(coll);

    await setDoc(ref, postToDocumentData(post));

    const ss = await getDoc(ref);
    const newPost = ssToPost(ss);
    return newPost;
  }

  throw new Error(`WIP`);
}

export async function fetchUserPosts(
  db: Firestore,
  userId: string
): Promise<Post[]> {
  const coll = postCollection(db);
  const q = query(
    coll,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const ss = await getDocs(q);
  const posts = ss.docs.map((v) => ssToPost(v));
  return posts;
}

export function postCollection(db: Firestore) {
  return collection(db, "posts");
}
