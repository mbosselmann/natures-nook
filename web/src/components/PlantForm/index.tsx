import styles from "./PlantForm.module.css";
import buttonStyles from "../Buttons/Button.module.css";
import { Plant, PlantSize, PlantSizeName } from "../PlantOverview";
import { useState } from "react";
import { Order } from "../../App";
import { QuantityInput } from "..";

type PlantFormProps =
  | {
      type: "new";
      sizes: Plant["sizes"];
      name: string;
      id: number;
      onSubmit: (newOrder: Order) => void;
    }
  | {
      type: "edit";
      sizes: Plant["sizes"];
      onSubmit: (newOrder: Order) => void;
      order: Order;
    };

const initialQuantity = (sizes: Plant["sizes"]) => {
  return sizes.reduce(
    (
      acc: {
        [key in PlantSizeName]: PlantSize;
      },
      { size, id, height, price }
    ) => {
      acc[size] = {
        amount: 0,
        id,
        height,
        price,
        size,
      };
      return acc;
    },
    {
      Small: { amount: 0, id: 0, height: "", price: 0, size: "Small" },
      Medium: { amount: 0, id: 0, height: "", price: 0, size: "Medium" },
      Large: { amount: 0, id: 0, height: "", price: 0, size: "Large" },
      "Hanging Basket": {
        amount: 0,
        id: 0,
        height: "",
        price: 0,
        size: "Hanging Basket",
      },
    }
  );
};

export default function PlantForm(props: PlantFormProps) {
  const [newOrder, setNewOrder] = useState<Order>(
    props.type === "new"
      ? {
          plantName: props.name,
          catalogId: props.id,
          ...initialQuantity(props.sizes),
        }
      : props.order
  );

  function handleDecrease(size: PlantSizeName) {
    if (newOrder[size].amount === 0) return;
    setNewOrder((prev) => ({
      ...prev,
      [size]: {
        ...prev[size],
        amount: prev[size].amount - 1,
      },
    }));
  }

  function handleIncrease(size: PlantSizeName) {
    setNewOrder((prev) => ({
      ...prev,
      [size]: {
        ...prev[size],
        amount: prev[size].amount + 1,
      },
    }));
  }

  function handleChange(size: PlantSizeName, value: string) {
    setNewOrder((prev) => ({
      ...prev,
      [size]: {
        ...prev[size],
        amount: parseInt(value),
      },
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    props.onSubmit(newOrder);
  }

  const hasNewOrderSizesWithAmount = Object.values(newOrder)
    .filter((value) => typeof value === "object")
    .every((value) => value?.amount === 0);

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      {props.sizes.map(({ size, amount, height, price }) => (
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
            onChange={(value) => handleChange(size, value)}
            quantity={newOrder}
            size={size}
            amount={amount}
          />
        </div>
      ))}
      {props.type === "new" && (
        <button
          className={`${buttonStyles["button"]} ${styles["submit-button"]}`}
          disabled={hasNewOrderSizesWithAmount}
          type="submit"
        >
          Add to cart
        </button>
      )}
    </form>
  );
}
