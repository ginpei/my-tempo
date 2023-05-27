import Image from "next/image";
import { useEffect, useState } from "react";
import { VStack } from "../../lib/layout/VStack";
import { Working } from "../../lib/misc";
import { PostImageMetadata } from "../../lib/post/Post";
import { useUserPosts } from "../../lib/post/postHooks";
import { getPostImageUrl } from "../../lib/post/postStorage";
import { H2 } from "../../lib/style/H2";

export interface PostsSectionProps {
  userId: string;
  updatedAt: number;
}

export function PostsSection({
  userId,
  updatedAt,
}: PostsSectionProps): JSX.Element {
  const [posts, postError] = useUserPosts(userId, updatedAt);

  return (
    <VStack as="article" className="PostsSection">
      <H2>Your posts</H2>
      {postError ? (
        <p className="text-red-500">{postError.message}</p>
      ) : posts === Working ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="Post border">
            <div>{post.body}</div>
            {post.images.length > 0 && (
              <div>
                {post.images.map((image) => (
                  <PostImage key={image.id} image={image} postId={post.id} />
                ))}
              </div>
            )}
            <div>
              {/* TODO path */}
              <a className="hover:underline" href={`/posts/${post.id}`}>
                <time className="text-sm text-gray-400">
                  {new Date(post.createdAt).toISOString()}
                </time>
              </a>
            </div>
          </div>
        ))
      )}
    </VStack>
  );
}

type PostImageProps = {
  image: PostImageMetadata;
  postId: string;
};

function PostImage({ image, postId }: PostImageProps): JSX.Element {
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
