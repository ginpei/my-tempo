import { ChangeEventHandler, PointerEventHandler } from "react";
import { controlStyleClasses } from "./controls";

export interface FileInputProps {
  accept?: string;
  disabled?: boolean;
  label?: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}

export function FileInput({
  accept,
  disabled,
  label = "File...",
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
    <label className={`FileInput flex items-center ${controlStyleClasses}`}>
      {label}
      <input
        accept={accept}
        disabled={disabled}
        className="w-0 h-0"
        multiple={multiple}
        onClick={onInputClick}
        onChange={onInputChange}
        type="file"
      />
    </label>
  );
}
