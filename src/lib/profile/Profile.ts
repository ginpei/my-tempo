import { DataRecord, createDataRecord } from "../db/DataRecord";

export interface Profile extends DataRecord {
  name: string;
  message: string;
}

export function createProfile(init: Partial<Profile> = {}): Profile {
  return {
    ...createDataRecord(init),
    name: init.name ?? "",
    message: init.message ?? "",
  };
}
