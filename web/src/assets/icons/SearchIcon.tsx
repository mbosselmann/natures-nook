export default function SearchIcon({ color }: { color?: string }) {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 126 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke={color ? color : "black"}
        strokeWidth="10"
      />
      <path
        d="M116.682 118.016C118.597 120.005 121.763 120.065 123.752 118.149C125.741 116.234 125.801 113.069 123.885 111.08L116.682 118.016ZM82 82L116.682 118.016L123.885 111.08L89.2032 75.0636L82 82Z"
        fill={color ? color : "black"}
      />
    </svg>
  );
}
