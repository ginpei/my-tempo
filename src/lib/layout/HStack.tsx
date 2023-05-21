import { StackProps } from "./stack";

export function HStack({
  as = "div",
  children,
  className = "",
  gap = "gap-4",
}: StackProps): JSX.Element {
  const Element = as;
  return (
    <Element className={`HStack ${className} flex ${gap}`}>{children}</Element>
  );
}
