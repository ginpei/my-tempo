import Image from "next/image";
import { FormEventHandler } from "react";
import { HStack } from "../layout/HStack";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";
import { FileButton } from "../style/FileButton";
import { NoImage } from "./NoImage";

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

  const onRemoveClick = () => {
    onChange?.(null);
  };

  return (
    <form className="ProfilePhotoForm" onSubmit={onFormSubmit}>
      <fieldset disabled={disabled}>
        <VStack>
          {photo ? (
            <Image
              alt={photo.name}
              className="w-32 h-32 border object-contain bg-gray-50"
              src={URL.createObjectURL(photo)}
              width={128}
              height={128}
            />
          ) : (
            <NoImage width="128" />
          )}
          <HStack>
            <FileButton accept="image/*" onChange={onFormChange}>
              Choose...
            </FileButton>
            <Button disabled={!photo} onClick={onRemoveClick} type="button">
              Remove
            </Button>
            <small>(* 128x128, &lt;5MB)</small>
          </HStack>
          <Button>Save</Button>
        </VStack>
      </fieldset>
    </form>
  );
}
