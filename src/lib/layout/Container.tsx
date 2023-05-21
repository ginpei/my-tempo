export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  return (
    <div className="Container w-[min(50rem,100%)] mx-auto px-4">{children}</div>
  );
}
