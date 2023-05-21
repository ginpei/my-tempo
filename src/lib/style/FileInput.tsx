import { ChangeEventHandler, PointerEventHandler } from "react";

export interface FileInputProps {
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}

export function FileInput({
  accept,
  disabled,
  multiple,
  onChange,
}: FileInputProps): JSX.Element {
  const onInputClick: PointerEventHandler<HTMLInputElement> = (event) => {
    // clear selection once so that user can select the same file again
    event.currentTarget.value = "";
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target;
    if (files === null) {
      return;
    }

    onChange(Array.from(files));
  };

  return (
    <input
      accept={accept}
      disabled={disabled}
      className="FileInput w-0 h-0"
      multiple={multiple}
      onClick={onInputClick}
      onChange={onInputChange}
      type="file"
    />
  );
}
