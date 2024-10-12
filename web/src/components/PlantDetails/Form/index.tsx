import { useState } from "react";

import styles from "./Form.module.css";
import buttonStyles from "../../Buttons/Button.module.css";

import Label from "./Label";
import { QuantityInput } from "../..";

import { CartItem } from "../../../App";
import { Plant, PlantSizeName } from "../../PlantOverview";
import { initialQuantity } from "../../../settings/initialQuantitiy";

type ActionType = "increase" | "decrease" | "change";

type FormProps = {
  sizes: Plant["sizes"];
  name: string;
  id: number;
  onSubmit: (newCartItem: CartItem) => void;
};

export default function Form(props: FormProps) {
  const [newCartItem, setNewCartItem] = useState<CartItem>({
    plantName: props.name,
    catalogId: props.id,
    ...initialQuantity(props.sizes),
  });

  function handleAmountChange(
    size: PlantSizeName,
    action: ActionType,
    value?: string
  ) {
    setNewCartItem((prev) => {
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
    props.onSubmit(newCartItem);
  }

  const hasNewOrderSizesWithAmount = Object.values(newCartItem)
    .filter((value) => typeof value === "object")
    .every((value) => value?.amount === 0);

  console.log(props.sizes);
  console.log(newCartItem);

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <ul>
        {props.sizes.map(({ size, height, price, amount }) => (
          <li className={styles["sizes-grid"]} key={size}>
            <Label
              size={size}
              available={amount}
              height={height}
              price={price}
            />
            <QuantityInput
              onIncrease={() => handleAmountChange(size, "increase")}
              onDecrease={() => handleAmountChange(size, "decrease")}
              onChange={(value) => handleAmountChange(size, "change", value)}
              size={size}
              amount={newCartItem[size].amount}
              available={newCartItem[size].available}
            />
          </li>
        ))}
      </ul>
      <button
        className={`${buttonStyles["button"]} ${styles["submit-button"]}`}
        disabled={hasNewOrderSizesWithAmount}
        type="submit"
      >
        Add to cart
      </button>
    </form>
  );
}
