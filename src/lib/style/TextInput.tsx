import { ComponentPropsWithRef } from "react";
import { controlStyleClasses } from "./controls";

export type TextInputProps = Omit<ComponentPropsWithRef<"input">, "type">;

export function TextInput({
  className = "",
  ...props
}: TextInputProps): JSX.Element {
  return (
    <input
      className={`TextInput ${className} ${controlStyleClasses}`}
      type="text"
      {...props}
    />
  );
}
