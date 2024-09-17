export default function ArrowLeftIcon({
  width = 48,
  height = 48,
  color = "#000",
}: {
  width: number;
  height: number;
  color: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 95 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M90 42C92.7614 42 95 39.7614 95 37C95 34.2386 92.7614 32 90 32V42ZM1.46447 33.4645C-0.488155 35.4171 -0.488155 38.5829 1.46447 40.5355L33.2843 72.3553C35.2369 74.308 38.4027 74.308 40.3553 72.3553C42.308 70.4027 42.308 67.2369 40.3553 65.2843L12.0711 37L40.3553 8.71573C42.308 6.76311 42.308 3.59728 40.3553 1.64466C38.4027 -0.307961 35.2369 -0.307961 33.2843 1.64466L1.46447 33.4645ZM90 32L5 32V42L90 42V32Z"
        fill={color}
      />
    </svg>
  );
}
