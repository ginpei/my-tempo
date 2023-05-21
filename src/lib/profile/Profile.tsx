import { DataRecord, createDataRecord } from "../db/DataRecord";

export interface Profile extends DataRecord {
  name: string;
}

export function createProfile(init: Partial<Profile> = {}): Profile {
  return {
    ...createDataRecord(init),
    name: "",
  };
}
