import NextLink from "next/link";

export type LinkProps = Parameters<typeof NextLink>[0];

export function Link({ className = "", ...props }: LinkProps): JSX.Element {
  return (
    <NextLink
      className={`
        Link ${className}
        text-blue-500 underline
        hover:text-red-700
        focus-visible:text-red-700
      `}
      {...props}
    />
  );
}
