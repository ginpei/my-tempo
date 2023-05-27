import { Post } from "./Post";
import { PostImageItem } from "./PostImageItem";

export interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps): JSX.Element {
  return (
    <div className="PostItem border">
      <div>{post.body}</div>
      {post.images.length > 0 && (
        <div className="flex items-center flex-wrap">
          {post.images.map((image) => (
            <PostImageItem key={image.id} image={image} postId={post.id} />
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
  );
}
