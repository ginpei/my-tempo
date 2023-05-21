import { ComponentPropsWithRef } from "react";
import { controlStyleClasses } from "./controls";

export type ButtonProps = ComponentPropsWithRef<"button">;

export function Button({ className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      className={`Button ${className ?? ""} h-8 ${controlStyleClasses}`}
      {...props}
    />
  );
}
