import { ComponentPropsWithRef } from "react";
import { controlNoHeightStyleClasses } from "./controls";

export type TextAreaProps = ComponentPropsWithRef<"textarea">;

export function TextArea({
  className = "",
  ...props
}: TextAreaProps): JSX.Element {
  return (
    <textarea
      className={`TextArea ${className} p-2 ${controlNoHeightStyleClasses}`}
      {...props}
    />
  );
}
