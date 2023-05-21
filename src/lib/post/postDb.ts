import { doc, collection, setDoc, Firestore, getDoc } from "firebase/firestore";
import { db } from "../firebase/instances";
import { Post, createPost } from "./Post";

export async function savePost(post: Post): Promise<Post> {
  if (post.id === "") {
    const coll = postCollection(db);
    const ref = doc(coll);
    await setDoc(ref, post);
    const ss = await getDoc(ref);
    const data = createPost(ss.data());
    if (!data) {
      throw new Error(`No data`);
    }
    const newPost = createPost(data);
    return newPost;
  }

  throw new Error(`WIP`);
}

export function postCollection(db: Firestore) {
  return collection(db, "posts");
}
