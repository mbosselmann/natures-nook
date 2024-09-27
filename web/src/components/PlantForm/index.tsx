import styles from "./PlantForm.module.css";
import MinusIcon from "../../assets/icons/MinusIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import { Plant } from "../PlantOverview";
import { useState } from "react";

type PlantFormProps = {
  sizes: Plant["sizes"];
};

type Quantity = {
  [key: string]: number;
};

export default function PlantForm({ sizes }: PlantFormProps) {
  const initialQuantity: Quantity = sizes.reduce((acc: Quantity, { size }) => {
    acc[size] = 0;
    return acc;
  }, {});

  const [quantity, setQuantity] = useState<Quantity>(initialQuantity);
  console.log(quantity);
  return (
    <form className={styles["form"]}>
      {sizes.map(({ size, amount }, index) => (
        <div key={index} className={styles["quantity"]}>
          <label className={"sr-only"} htmlFor={size}>
            Amount {size}:
          </label>
          <button
            className={styles["quantity-button"]}
            type="button"
            disabled={quantity[size] <= 0}
            onClick={() => {
              if (quantity[size] === 0) return;
              setQuantity((prev) => ({
                ...prev,
                [size]: prev[size] - 1,
              }));
            }}
          >
            <MinusIcon />
          </button>
          <input
            className={styles["quantity-input"]}
            type="number"
            id={size}
            name={size}
            min="1"
            max={amount}
            value={quantity[size]}
            onChange={(event) => {
              setQuantity((prev) => ({
                ...prev,
                [size]: parseInt(event.target.value),
              }));
            }}
          />
          <button
            className={styles["quantity-button"]}
            type="button"
            disabled={quantity[size] > amount}
            onClick={() => {
              setQuantity((prev) => ({
                ...prev,
                [size]: prev[size] + 1,
              }));
            }}
          >
            <PlusIcon />
          </button>
        </div>
      ))}
      <button className={styles["quantity-submit-button"]} type="submit">
        Add to cart
      </button>
    </form>
  );
}
