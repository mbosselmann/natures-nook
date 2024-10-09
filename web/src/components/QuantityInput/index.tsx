import { Order } from "../../App";
import MinusIcon from "../../assets/icons/MinusIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import { PlantSizeName } from "../PlantOverview";
import styles from "./QuantityInput.module.css";

type QuantityInputProps = {
  onDecrease: () => void;
  onIncrease: () => void;
  quantity: Order;
  size: PlantSizeName;
  amount: number;
  onChange: (value: string) => void;
};

export default function QuantityInput({
  onDecrease,
  onIncrease,
  quantity,
  size,
  amount,
  onChange,
}: QuantityInputProps) {
  return (
    <div className={styles["quantity"]}>
      <button
        className={`button ${styles["quantity-button"]}`}
        type="button"
        disabled={quantity[size].amount <= 0}
        onClick={onDecrease}
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
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        className={`button ${styles["quantity-button"]}`}
        type="button"
        disabled={quantity[size].amount >= amount}
        onClick={onIncrease}
      >
        <PlusIcon color="white" width={30} height={30} />
      </button>
    </div>
  );
}
