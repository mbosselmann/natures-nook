import styles from "./PlantForm.module.css";
import buttonStyles from "../Buttons/Button.module.css";
import { Plant, PlantSize, PlantSizeName } from "../PlantOverview";
import { useState } from "react";
import { Order } from "../../App";
import { QuantityInput } from "..";
import Label from "./Label";

type ActionType = "increase" | "decrease" | "change";

export type PlantFormProps =
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

  function handleAmountChange(
    size: PlantSizeName,
    action: ActionType,
    value?: string
  ) {
    setNewOrder((prev) => {
      const currentAmount = prev[size].amount;
      let newAmount = currentAmount;

      if (action === "increase") {
        newAmount = currentAmount + 1;
      }

      if (action === "decrease") {
        if (currentAmount === 0) return prev;
        newAmount = currentAmount - 1;
      }

      if (action === "change" && value !== undefined) {
        newAmount = parseInt(value);
      }

      return {
        ...prev,
        [size]: {
          ...prev[size],
          amount: newAmount,
        },
      };
    });
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
          <Label
            type={props.type}
            size={size}
            amount={amount}
            height={height}
            price={price}
          />
          <QuantityInput
            onIncrease={() => handleAmountChange(size, "increase")}
            onDecrease={() => handleAmountChange(size, "decrease")}
            onChange={(value) => handleAmountChange(size, "change", value)}
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
