import { DataRecord, createDataRecord } from "../db/DataRecord";

export interface Post extends DataRecord {
  body: string;
  userId: string;
}

export function createPost(init: Partial<Post> = {}): Post {
  return {
    ...createDataRecord(init),
    body: init.body ?? "",
    createdAt: init.createdAt ?? 0,
    id: init.id ?? "",
    userId: init.userId ?? "",
  };
}
