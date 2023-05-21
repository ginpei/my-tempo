import { ComponentPropsWithRef } from "react";

export type HeadingProps = ComponentPropsWithRef<"h2">;

export function H2({ className, ...props }: HeadingProps): JSX.Element {
  return (
    <h2
      className={`
        Button ${className ?? ""}
        text-2xl font-bold
      `}
      {...props}
    />
  );
}
