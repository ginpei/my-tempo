import Image from "next/image";
import { FormEventHandler } from "react";
import { HStack } from "../layout/HStack";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";
import { FileButton } from "../style/FileButton";
import { NoImage } from "./NoImage";
import { Working } from "../misc";

export interface ProfilePhotoFormProps {
  disabled?: boolean;
  onChange?: (photo: File | null) => void;
  onSubmit?: () => void;
  photoUrl: string | Working;
}

export function ProfilePhotoForm({
  disabled,
  onChange,
  onSubmit,
  photoUrl,
}: ProfilePhotoFormProps): JSX.Element {
  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit?.();
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
          {photoUrl === Working ? (
            <span className="inline-block w-32 h-32" />
          ) : photoUrl ? (
            <Image
              alt=""
              className="w-32 h-32 border object-contain bg-gray-50"
              src={photoUrl}
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
            <Button disabled={!photoUrl} onClick={onRemoveClick} type="button">
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
