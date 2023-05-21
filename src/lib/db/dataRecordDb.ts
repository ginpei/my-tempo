import {
  DocumentData,
  DocumentSnapshot,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { DataRecord } from "./DataRecord";

export function toDocumentData<T extends DataRecord>(data: T): DocumentData {
  const { createdAt, id, ...fields } = data;
  return {
    ...fields,
    createdAt:
      createdAt === 0 ? serverTimestamp() : Timestamp.fromMillis(createdAt),
  };
}

export function ssToDataRecord<T extends DataRecord>(ss: DocumentSnapshot): T {
  const data = ss.data();
  if (data === undefined) {
    throw new Error(`Failed to get data for ID: ${ss.id}`);
  }

  return {
    ...data,
    createdAt: data["createdAt"].toMillis(),
    id: ss.id,
  } as T;
}
