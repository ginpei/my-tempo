import { ComponentPropsWithRef } from "react";

export type HeadingProps = ComponentPropsWithRef<"h1">;

export function H1({ className, ...props }: HeadingProps): JSX.Element {
  return (
    <h1
      className={`
        Button ${className ?? ""}
        text-3xl font-bold
      `}
      {...props}
    />
  );
}
