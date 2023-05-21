import { ChangeEventHandler } from "react";

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
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target;
    if (files === null) {
      return;
    }

    onChange(Array.from(files));

    // TODO fire again if the same file is selected again
  };

  return (
    <label
      className={`
        FileInput
        flex items-center
        border px-2 h-8
        border-gray-300 rounded-sm
        [&:hover:not(:has(:disabled))]:bg-gray-50
        [&:has(:focus-visible)]:bg-gray-50 [&:has(:focus-visible)]:outline-none [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-gray-300
        active:bg-gray-200
        [&:has(:disabled)]:text-gray-400 [&:has(:disabled)]:bg-gray-200 [&:has(:disabled)]:cursor-default
      `}
    >
      {label}
      <input
        accept={accept}
        disabled={disabled}
        className="w-0 h-0"
        multiple={multiple}
        onChange={onInputChange}
        type="file"
      />
    </label>
  );
}
