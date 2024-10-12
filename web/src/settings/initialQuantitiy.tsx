import { Plant, PlantSize, PlantSizeName } from "../components/PlantOverview";

export const initialQuantity = (sizes: Plant["sizes"]) => {
  return sizes.reduce(
    (
      acc: {
        [key in PlantSizeName]: PlantSize;
      },
      { size, id, height, price, amount }: PlantSize
    ) => {
      acc[size] = {
        amount: 0,
        id,
        height,
        price,
        size,
        available: amount,
      };
      return acc;
    },
    {
      Small: {
        amount: 0,
        id: 0,
        height: "",
        price: 0,
        size: "Small",
        available: 0,
      },
      Medium: {
        amount: 0,
        id: 0,
        height: "",
        price: 0,
        size: "Medium",
        available: 0,
      },
      Large: {
        amount: 0,
        id: 0,
        height: "",
        price: 0,
        size: "Large",
        available: 0,
      },
      "Hanging Basket": {
        amount: 0,
        id: 0,
        height: "",
        price: 0,
        size: "Hanging Basket",
        available: 0,
      },
    }
  );
};
