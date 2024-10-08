import styles from "./PlantForm.module.css";
import { Plant, PlantSize } from "../PlantOverview";
import { useState } from "react";
import { usePlants } from "../../hooks/usePlants";
import { Order } from "../../App";
import { QuantityInput } from "..";

type PlantFormProps = {
  sizes: Plant["sizes"];
  name: string;
  id: number;
};

const initialQuantity = (sizes: Plant["sizes"]) => {
  return sizes.reduce(
    (
      acc: { [key in PlantSize]: { amount: number; id: number } },
      { size, id }
    ) => {
      acc[size] = {
        amount: 0,
        id,
      };
      return acc;
    },
    {
      Small: { amount: 0, id: 0 },
      Medium: { amount: 0, id: 0 },
      Large: { amount: 0, id: 0 },
      "Hanging Basket": { amount: 0, id: 0 },
    }
  );
};

export default function PlantForm({ sizes, name, id }: PlantFormProps) {
  const { order, setOrder } = usePlants();
  const [quantity, setQuantity] = useState<Order>({
    name,
    id,
    ...initialQuantity(sizes),
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrder([...order, quantity]);
  }

  function handleDecrease(size: PlantSize) {
    if (quantity[size].amount === 0) return;
    setQuantity((prev) => ({
      ...prev,
      [size]: {
        ...prev[size],
        amount: prev[size].amount - 1,
      },
    }));
  }

  function handleIncrease(size: PlantSize) {
    setQuantity((prev) => ({
      ...prev,
      [size]: {
        ...prev[size],
        amount: prev[size].amount + 1,
      },
    }));
  }

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      {sizes.map(({ size, amount, height, price }) => (
        <div className={styles["sizes-grid"]} key={size}>
          <label htmlFor={size}>
            <span className={styles["size-name"]}>{size}</span>
            <br />
            {height}
            <br />€ {price}
            <br />
            <span className={styles["size-available"]}>
              {amount === 0 ? "Not available" : amount + " available"}
            </span>
          </label>
          <QuantityInput
            onIncrease={() => handleIncrease(size)}
            onDecrease={() => handleDecrease(size)}
            quantity={quantity}
            size={size}
            amount={amount}
          />
        </div>
      ))}
      <button
        className={`button ${styles["submit-button"]}`}
        disabled={Object.values(quantity).every((value) => value === 0)}
        type="submit"
      >
        Add to cart
      </button>
    </form>
  );
}
