import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Plant, PlantSizeName } from "./components/PlantOverview";

export type Catalog = {
  data: Plant[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
};

export type Order = {
  plantName: Plant["name"];
  catalogId: Plant["id"];
} & {
  [key in PlantSizeName]: {
    amount: number;
    id: number;
  };
};

export type ContextType = {
  plants: Catalog;
  setPlants: (plants: Catalog | ((prevPlants: Catalog) => Catalog)) => void;
  orders: Order[];
  setOrders: (order: Order[] | ((prevOrder: Order[]) => Order[])) => void;
};

export const App = () => {
  const catalog = useLoaderData() as Catalog;
  const [plants, setPlants] = useState<Catalog>(catalog);
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <>
      <ScrollRestoration />
      <Outlet
        context={{ plants, setPlants, orders, setOrders } satisfies ContextType}
      />
    </>
  );
};
