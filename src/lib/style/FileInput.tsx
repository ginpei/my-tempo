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
  };

  return (
    <label
      className={`
        FileInput
        flex items-center
        border px-2 h-8
        border-gray-300 rounded-sm
        [&:hover:not(:disabled,:disabled_&,&.disabled)]:bg-gray-50
        focus-visible:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
        active:bg-gray-200
        [:where(:disabled_&,&.disabled)]:text-gray-400 [:where(:disabled_&,&.disabled)]:bg-gray-200 [:where(:disabled_&,&.disabled)]:cursor-default
        ${disabled ? "disabled" : ""}
      `}
    >
      {label}
      <input
        accept={accept}
        disabled={disabled}
        className="hidden"
        multiple={multiple}
        onChange={onInputChange}
        type="file"
      />
    </label>
  );
}
