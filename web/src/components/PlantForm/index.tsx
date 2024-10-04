import styles from "./PlantForm.module.css";
import MinusIcon from "../../assets/icons/MinusIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import { Plant, PlantSize } from "../PlantOverview";
import { useState } from "react";

type PlantFormProps = {
  sizes: Plant["sizes"];
  name: string;
  id: number;
};

type Quantity = {
  name: string;
  id: number;
} & {
  [key in PlantSize]: {
    amount: number;
    id: number;
  };
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
  const [quantity, setQuantity] = useState<Quantity>({
    name,
    id,
    ...initialQuantity(sizes),
  });

  return (
    <form className={styles["form"]}>
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
          <div className={styles["quantity"]}>
            <button
              className={`${styles["button"]} ${styles["quantity-button"]}`}
              type="button"
              disabled={quantity[size].amount <= 0}
              onClick={() => {
                if (quantity[size].amount === 0) return;
                setQuantity((prev) => ({
                  ...prev,
                  [size]: {
                    ...prev[size],
                    amount: prev[size].amount - 1,
                  },
                }));
              }}
            >
              <MinusIcon color="#fff" />
            </button>
            <input
              className={styles["quantity-input"]}
              type="number"
              id={size}
              name={size}
              min="0"
              max={amount}
              value={quantity[size].amount}
              onChange={(event) => {
                setQuantity((prev) => ({
                  ...prev,
                  [size]: {
                    ...prev[size],
                    amount: parseInt(event.target.value),
                  },
                }));
              }}
            />
            <button
              className={`${styles["button"]} ${styles["quantity-button"]}`}
              type="button"
              disabled={quantity[size].amount >= amount}
              onClick={() => {
                setQuantity((prev) => ({
                  ...prev,
                  [size]: {
                    ...prev[size],
                    amount: prev[size].amount + 1,
                  },
                }));
              }}
            >
              <PlusIcon color="white" width={30} height={30} />
            </button>
          </div>
        </div>
      ))}
      <button
        className={`${styles["button"]} ${styles["submit-button"]}`}
        disabled={Object.values(quantity).every((value) => value === 0)}
        type="submit"
      >
        Add to cart
      </button>
    </form>
  );
}
