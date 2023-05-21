import { ComponentPropsWithRef } from "react";
import { controlStyleClasses } from "./controls";

export type ButtonProps = Omit<ComponentPropsWithRef<"button">, "className">;

export function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      className={`
        Button
        bg-gray-100 text-gray-900
        ${controlStyleClasses}
      `}
      {...props}
    />
  );
}
