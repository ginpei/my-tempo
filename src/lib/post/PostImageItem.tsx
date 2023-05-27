import Image from "next/image";
import { PostImageMetadata } from "./Post";

export interface PostImageItemProps {
  image: PostImageMetadata;
}

export function PostImageItem({ image }: PostImageItemProps): JSX.Element {
  return (
    <span className="inline-block border w-60 h-60 bg-gray-50">
      <Image
        alt=""
        className="inline-block object-contain w-full h-full"
        height={100}
        src={image.url}
        width={100}
      />
    </span>
  );
}
