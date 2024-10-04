export default function PlusIcon({
  color = "black",
  width = 80,
  height = 80,
}: {
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="7"
        y1="39"
        x2="72"
        y2="39"
        stroke={color}
        strokeWidth="15"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="72"
        x2="40"
        y2="7"
        stroke={color}
        strokeWidth="15"
        strokeLinecap="round"
      />
    </svg>
  );
}
