export function isImageLtMb(file: File, mb: number): boolean {
  return isImageFile(file) && isFileSizeLtMb(file.size, mb);
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export function isFileSizeLtMb(size: number, mb: number): boolean {
  return size < mb * 1024 * 1024;
}
