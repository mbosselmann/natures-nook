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

export type CartItem = {
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
  cartItems: CartItem[];
  setCartItems: (
    cartItem: CartItem[] | ((prevCartItems: CartItem[]) => CartItem[])
  ) => void;
};

export const App = () => {
  const catalog = useLoaderData() as Catalog;
  const [plants, setPlants] = useState<Catalog>(catalog);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <>
      <ScrollRestoration />
      <Outlet
        context={
          { plants, setPlants, cartItems, setCartItems } satisfies ContextType
        }
      />
    </>
  );
};
