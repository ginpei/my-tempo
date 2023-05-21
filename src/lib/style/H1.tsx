import { DetailedHTMLProps, HTMLAttributes } from "react";

export type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

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
