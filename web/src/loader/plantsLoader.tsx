import { Plant } from "../App";

export async function plantsLoader() {
  const response = await fetch("http://localhost/catalog/plants");
  const plants: Plant[] | null = await response.json();
  return { plants };
}
