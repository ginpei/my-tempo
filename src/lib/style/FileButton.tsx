import { ReactNode } from "react";
import { FileInput, FileInputProps } from "./FileInput";
import { controlStyleClasses } from "./controls";

export interface FileButtonProps extends FileInputProps {
  children: ReactNode;
}

export function FileButton({
  children,
  ...bareProps
}: FileButtonProps): JSX.Element {
  return (
    <label
      className={`
        FileButton
        flex items-center justify-center cursor-pointer
        bg-gray-100 text-gray-900
        ${controlStyleClasses}
      `}
    >
      {children}
      <FileInput {...bareProps} />
    </label>
  );
}
