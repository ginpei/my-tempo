export interface StackProps {
  as?: StackElementType;
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

export type StackElementType = 'div' | 'span' | 'article' | 'label';
