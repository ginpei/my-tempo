import { ElementProps } from "../dom/types";

export type ButtonProps = ElementProps<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps): JSX.Element {
  return (
    <button className={`
      Button ${className ?? ''}
      border px-2 h-8
      border-gray-300 rounded-sm
      hover:bg-gray-100
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
      active:bg-gray-200
    `} {...props} />
  );
}
