import { DetailedHTMLProps, HTMLAttributes } from "react";

export type ElementProps<T extends HTMLElement> = DetailedHTMLProps<HTMLAttributes<T>, T>
