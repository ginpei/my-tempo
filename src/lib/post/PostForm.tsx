import { ChangeEventHandler, FormEventHandler } from "react";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";
import { FileButton } from "../style/FileButton";
import { TextArea } from "../style/TextArea";
import { ImageFilePreview } from "./ImageFilePreview";
import { Post, UploadImageData } from "./Post";

export interface PostFormProps {
  disabled?: boolean;
  images: UploadImageData[];
  onChange?: (post: Post) => void;
  onImagesChange?: (files: UploadImageData[]) => void;
  onSubmit?: (post: Post) => void;
  post: Post;
}

export function PostForm({
  disabled,
  images,
  onChange,
  onImagesChange,
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

    const newImages = [
      ...images,
      ...files.map((file) => ({
        file,
        id: window.crypto.randomUUID(),
      })),
    ];
    onImagesChange?.(newImages);
  };

  const onImageRemoveClick = (id: string) => {
    const newImages = images.filter((image) => image.id !== id);
    onImagesChange?.(newImages);
  };

  return (
    <form className="PostForm" onSubmit={onFormSubmit}>
      <fieldset disabled={disabled}>
        <VStack>
          <TextArea name="body" onChange={onFormChange} value={post.body} />
          <div className="flex gap-4 [&>*]:flex-1">
            <FileButton accept="image/*" multiple onChange={onFileChange}>
              Add Images...
            </FileButton>
            <Button>Save</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            {images.map(({ file, id }) => (
              <ImageFilePreview
                file={file}
                key={id}
                id={id}
                onRemoveClick={onImageRemoveClick}
              />
            ))}
          </div>
        </VStack>
      </fieldset>
    </form>
  );
}
