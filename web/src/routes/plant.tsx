import { useLoaderData } from "react-router-dom";
import { Plant } from "../components/PlantOverview";
import { PlantDetails } from "../components";

export default function PlantDetailsPage() {
  const { plant } = useLoaderData() as { plant: Plant };

  return <PlantDetails plant={plant} />;
}
