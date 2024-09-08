import { useLoaderData } from "react-router-dom";
import { Plant } from "../App";
import PlantDetails from "../PlantDetails";

export default function PlantDetailsPage() {
  const { plant } = useLoaderData() as { plant: Plant };
  console.log(plant);

  return <PlantDetails plant={plant} />;
}
