import { ChangeEventHandler, FormEventHandler } from "react";
import { TextArea } from "../style/TextArea";
import { Post } from "./Post";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";

export interface PostFormProps {
  disabled?: boolean;
  onChange?: (post: Post) => void;
  onSubmit?: (post: Post) => void;
  post: Post;
}

export function PostForm({
  disabled,
  onChange,
  onSubmit,
  post,
}: PostFormProps): JSX.Element {
  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit?.(post);
  };

  const onFormChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "body") {
      onChange?.({ ...post, body: value });
    } else {
      throw new Error(`Unexpected form field: ${name}`);
    }
  };

  return (
    <form className="PostForm" onSubmit={onFormSubmit}>
      <fieldset disabled={disabled}>
        <VStack>
          <TextArea name="body" onChange={onFormChange} value={post.body} />
          <Button>Save</Button>
        </VStack>
      </fieldset>
    </form>
  );
}
