import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import { Plant } from "../App";

export const plantLoader: LoaderFunction = async ({
  params: { id },
}: LoaderFunctionArgs) => {
  const response = await fetch("http://localhost/catalog/plant/" + id);
  const plant: Plant = await response.json();
  return { plant };
};
