export interface DataRecord {
  createdAt: number;
  id: string;
}

export function createDataRecord(init: Partial<DataRecord> = {}): DataRecord {
  return {
    createdAt: init.createdAt ?? 0,
    id: init.id ?? "",
  };
}
