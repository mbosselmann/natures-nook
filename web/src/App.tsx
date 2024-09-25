import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Plant } from "./components/PlantOverview";

export type Catalog = {
  data: Plant[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
};

export type ContextType = [
  plants: Catalog,
  setPlants: (plants: Catalog | ((prevPlants: Catalog) => Catalog)) => void
];

export const App = () => {
  const catalog = useLoaderData() as Catalog;
  const [plants, setPlants] = useState<Catalog>(catalog);

  return (
    <>
      <ScrollRestoration />
      <Outlet context={[plants, setPlants] satisfies ContextType} />
    </>
  );
};
