import { DataRecord, createDataRecord } from "../db/DataRecord";

export interface Post extends DataRecord {
  body: string;
  userId: string;
}

/**
 * Image that user selected to upload in the form.
 */
export type UploadImageData = { file: File; id: string };

export function createPost(init: Partial<Post> = {}): Post {
  return {
    ...createDataRecord(init),
    body: init.body ?? "",
    createdAt: init.createdAt ?? 0,
    id: init.id ?? "",
    userId: init.userId ?? "",
  };
}
