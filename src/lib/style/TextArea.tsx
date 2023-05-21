import { ComponentPropsWithRef } from "react";

export type TextAreaProps = ComponentPropsWithRef<"textarea">;

export function TextArea({ className, ...props }: TextAreaProps): JSX.Element {
  return (
    <textarea
      className={`
        TextArea ${className ?? ""}
        border p-2
        border-gray-300 rounded-sm
        hover:bg-gray-50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
        active:bg-gray-200
        disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-default
      `}
      {...props}
    />
  );
}
