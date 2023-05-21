export interface VInputFieldProps {
  children: React.ReactNode;
  label: string;
}

export function VInputField({
  children,
  label,
}: VInputFieldProps): JSX.Element {
  return (
    <label className="VInputField flex flex-col gap-0 text-gray-500">
      <span className="text-sm">{label}</span>
      {children}
    </label>
  );
}
