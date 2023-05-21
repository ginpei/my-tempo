import Image from "next/image";
import { FormEventHandler } from "react";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";
import { FileButton } from "../style/FileButton";
import { VInputField } from "../style/VInputField";

export interface ProfilePhotoFormProps {
  disabled?: boolean;
  onChange?: (photo: File | null) => void;
  onSubmit?: (photo: File | null) => void;
  photo: File | null;
}

export function ProfilePhotoForm({
  disabled,
  onChange,
  onSubmit,
  photo,
}: ProfilePhotoFormProps): JSX.Element {
  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit?.(photo);
  };

  const onFormChange = (files: File[] | null) => {
    const file = files?.[0] ?? null;
    onChange?.(file);
  };

  return (
    <form className="ProfilePhotoForm" onSubmit={onFormSubmit}>
      <fieldset disabled={disabled}>
        <VStack>
          <VInputField label="Photo">
            <FileButton accept="image/*" onChange={onFormChange}>
              Choose...
            </FileButton>
          </VInputField>
          {photo && (
            <div>
              <Image
                alt={photo.name}
                src={URL.createObjectURL(photo)}
                width={100}
                height={100}
              />
              {photo.name} ({photo.type}, {photo.size} bytes)
            </div>
          )}
          <Button disabled={!photo}>Upload</Button>
        </VStack>
      </fieldset>
    </form>
  );
}
