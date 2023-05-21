import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { DataRecord } from "./DataRecord";

export function toDocumentData<T extends DataRecord>(data: T): DocumentData {
  const { id, ...fields } = data;
  return fields;
}

export function ssToDataRecord<T extends DataRecord>(ss: DocumentSnapshot): T {
  return {
    ...ss.data(),
    id: ss.id,
  } as T;
}
