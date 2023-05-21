import { ComponentPropsWithRef } from "react";

export type ButtonProps = ComponentPropsWithRef<"button">;

export function Button({ className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      className={`
        Button ${className ?? ""}
        border px-2 h-8
        border-gray-300 rounded-sm
        hover:bg-gray-50
        focus-visible:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
        active:bg-gray-200
        disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-default
      `}
      {...props}
    />
  );
}
