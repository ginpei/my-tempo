import { ChangeEventHandler, FormEventHandler } from "react";
import { TextArea } from "../style/TextArea";
import { Post } from "./Post";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";
import { FileInput } from "../style/FileInput";

export interface PostFormProps {
  disabled?: boolean;
  onChange?: (post: Post) => void;
  onImagesSelect?: (files: File[]) => void;
  onSubmit?: (post: Post) => void;
  post: Post;
}

export function PostForm({
  disabled,
  onChange,
  onImagesSelect,
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

  const onFileChange = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length < 1) {
      return;
    }

    onImagesSelect?.(imageFiles);
  };

  return (
    <form className="PostForm" onSubmit={onFormSubmit}>
      <fieldset disabled={disabled}>
        <VStack>
          <TextArea name="body" onChange={onFormChange} value={post.body} />
          <div className="flex gap-4 [&>*]:flex-1">
            <FileInput accept="image/*" multiple onChange={onFileChange} />
            <Button>Save</Button>
          </div>
        </VStack>
      </fieldset>
    </form>
  );
}
