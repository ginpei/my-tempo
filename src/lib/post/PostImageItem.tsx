import { useEffect, useState } from "react";
import { Working } from "../misc";
import { PostImageMetadata } from "./Post";
import { getPostImageUrl } from "./postStorage";
import Image from "next/image";

export interface PostImageItemProps {
  image: PostImageMetadata;
  postId: string;
}

export function PostImageItem({
  image,
  postId,
}: PostImageItemProps): JSX.Element {
  const [src, setSrc] = useState<string | Working>(Working);

  useEffect(() => {
    getPostImageUrl(postId, image.id).then(setSrc);
  }, [image.id, postId]);

  return (
    <span className="inline-block border w-60 h-60 bg-gray-50">
      {src !== Working ? (
        <Image
          alt=""
          className="inline-block object-contain w-full h-full"
          height={100}
          src={src}
          width={100}
        />
      ) : (
        "…"
      )}
    </span>
  );
}
