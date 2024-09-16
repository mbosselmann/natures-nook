import { useLoaderData } from "react-router-dom";
import { Plant } from "../App";
import PlantDetails from "../PlantDetails";

export default function PlantDetailsPage() {
  const { plant } = useLoaderData() as { plant: Plant };

  return <PlantDetails plant={plant} />;
}
