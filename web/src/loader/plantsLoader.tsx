import { LoaderFunction } from "react-router-dom";
import { Plant } from "../App";

export type PlantData = {
  data: Plant[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export const plantsLoader: LoaderFunction = async () => {
  const response = await fetch(
    "http://localhost/catalog/plants?page=1&limit=12"
  );
  const plants: PlantData | null = await response.json();
  return plants;
};
