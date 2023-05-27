import { DataRecord, createDataRecord } from "../db/DataRecord";

export interface Post extends DataRecord {
  body: string;
  images: PostImageMetadata[];
  userId: string;
}

export interface PostImageMetadata {
  id: string;
}

/**
 * Image that user selected to upload in the form.
 */
export type UploadImageData = { file: File; id: string };

export const maxNumImages = 4;

export function createPost(init: Partial<Post> = {}): Post {
  return {
    ...createDataRecord(init),
    body: init.body ?? "",
    createdAt: init.createdAt ?? 0,
    id: init.id ?? "",
    images: init.images ?? [],
    userId: init.userId ?? "",
  };
}

export function isValidPostDraft(post: Post, numImages: number): boolean {
  return post.body !== "" || (0 < numImages && numImages <= maxNumImages);
}
