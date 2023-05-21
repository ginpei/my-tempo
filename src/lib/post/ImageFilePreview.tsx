import Image from "next/image";
import { controlStyleClasses } from "../style/controls";

export interface ImageFilePreviewProps {
  file: File;
  id: string;
  onRemoveClick?: (id: string) => void;
}

export function ImageFilePreview({
  file,
  id,
  onRemoveClick,
}: ImageFilePreviewProps): JSX.Element {
  const src = URL.createObjectURL(file);
  return (
    <span
      className="ImageFilePreview relative inline-block w-60 h-60 border bg-gray-50"
      title={file.name}
    >
      <Image
        alt={file.name}
        className="inline-block w-full h-full object-contain"
        height={100}
        src={src}
        width={100}
      />
      <button
        className={`
          absolute right-2 top-2 border
          rounded-sm bg-white opacity-0
          ${controlStyleClasses}
          [.ImageFilePreview:hover_&]:opacity-100
        `}
        onClick={() => onRemoveClick?.(id)}
        title="Remove"
      >
        ✖
      </button>
    </span>
  );
}
