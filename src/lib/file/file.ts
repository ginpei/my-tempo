export async function getSha512Hash(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hashBuf = await window.crypto.subtle.digest("SHA-512", buf);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  const hashHex = hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export function isImageLtMb(file: File, mb: number): boolean {
  return isImageFile(file) && isFileSizeLtMb(file.size, mb);
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export function isFileSizeLtMb(size: number, mb: number): boolean {
  return size < mb * 1024 * 1024;
}
