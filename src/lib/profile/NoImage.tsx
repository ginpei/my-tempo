export interface NoImageProps {
  text?: string;
  width: number | string;
}

export function NoImage({
  text = "No Image",
  width,
}: NoImageProps): JSX.Element {
  return (
    <svg
      height={width}
      viewBox="0 0 512 512"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="100%"
        height="100%"
        fill="#f9f9f9"
        stroke="#999"
        strokeWidth="16"
      />
      <text
        alignmentBaseline="middle"
        fill="#999"
        fontFamily="Arial, sans-serif"
        fontSize="100"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {text}
      </text>
    </svg>
  );
}
