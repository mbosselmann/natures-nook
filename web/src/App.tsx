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

type Order = {
  plant: Plant;
  size: string;
};

export type ContextType = {
  plants: Catalog;
  setPlants: (plants: Catalog | ((prevPlants: Catalog) => Catalog)) => void;
  order: Order[];
  setOrder: (order: Order[] | ((prevOrder: Order[]) => Order[])) => void;
};

export const App = () => {
  const catalog = useLoaderData() as Catalog;
  const [plants, setPlants] = useState<Catalog>(catalog);
  const [order, setOrder] = useState<Order[]>([]);

  return (
    <>
      <ScrollRestoration />
      <Outlet
        context={{ plants, setPlants, order, setOrder } satisfies ContextType}
      />
    </>
  );
};
