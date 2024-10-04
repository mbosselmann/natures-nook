export default function MinusIcon({
  color = "black",
  width = 80,
  height = 15,
}: {
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="7.5"
        y1="7.5"
        x2="72.5"
        y2="7.5"
        stroke={color}
        strokeWidth="15"
        strokeLinecap="round"
      />
    </svg>
  );
}
