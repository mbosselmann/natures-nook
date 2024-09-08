import { Plant } from "../App";

export async function plantLoader({ params }: { params: { id: string } }) {
  const response = await fetch("http://localhost/catalog/plant/" + params.id);
  console.log(params);
  const plant: Plant = await response.json();
  return { plant };
}
