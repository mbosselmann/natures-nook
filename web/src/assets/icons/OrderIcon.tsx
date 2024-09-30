export default function OrderIcon({
  color = "#000",
  width = 123,
  height = 81,
}: {
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 123 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.9112 20.0705H114.591L96.5898 56.9295H44.055L26.9112 20.0705Z"
        stroke={color}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M22.0486 7.49986L26.6315 5.50063L25.3225 2.49986L22.0486 2.49986L22.0486 7.49986ZM5.36586 2.49986C2.60444 2.49986 0.365861 4.73844 0.365861 7.49986C0.365861 10.2613 2.60444 12.4999 5.36586 12.4999L5.36586 2.49986ZM33.3788 20.9677L26.6315 5.50063L17.4657 9.49909L24.213 24.9662L33.3788 20.9677ZM22.0486 2.49986L5.36586 2.49986L5.36586 12.4999L22.0486 12.4999L22.0486 2.49986Z"
        fill={color}
      />
      <circle cx="52.0362" cy="71.4648" r="9.53526" fill={color} />
      <circle cx="89.087" cy="71.4648" r="9.53526" fill={color} />
    </svg>
  );
}
