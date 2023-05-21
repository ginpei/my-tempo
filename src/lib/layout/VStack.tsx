import { StackProps } from "./stack";

export function VStack({ as = 'div', children, className = '', gap = 4 }: StackProps): JSX.Element {
  const Element = as;
  return (
    <Element className={`VStack ${className} flex flex-col gap-${gap}`}>
      {children}
    </Element>
  );
}
