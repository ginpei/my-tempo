import { ElementProps } from "../dom/types";

export type HeadingProps = ElementProps<HTMLHeadingElement>;

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
