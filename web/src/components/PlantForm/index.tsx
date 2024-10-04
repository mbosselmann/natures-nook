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
              disabled={quantity[size] <= 0}
              onClick={() => {
                if (quantity[size] === 0) return;
                setQuantity((prev) => ({
                  ...prev,
                  [size]: prev[size] - 1,
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
              value={quantity[size]}
              onChange={(event) => {
                setQuantity((prev) => ({
                  ...prev,
                  [size]: parseInt(event.target.value),
                }));
              }}
            />
            <button
              className={`${styles["button"]} ${styles["quantity-button"]}`}
              type="button"
              disabled={quantity[size] >= amount}
              onClick={() => {
                setQuantity((prev) => ({
                  ...prev,
                  [size]: prev[size] + 1,
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
