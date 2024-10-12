import styles from "./QuantityInput.module.css";
import buttonStyles from "../Buttons/Button.module.css";

import MinusIcon from "../../assets/icons/MinusIcon";
import PlusIcon from "../../assets/icons/PlusIcon";

import { PlantSizeName } from "../PlantOverview";

type QuantityInputProps = {
  onDecrease: () => void;
  onIncrease: () => void;
  size: PlantSizeName;
  amount: number;
  available: number;
  onChange: (value: string) => void;
};

export default function QuantityInput({
  onDecrease,
  onIncrease,
  size,
  amount,
  available,
  onChange,
}: QuantityInputProps) {
  return (
    <div className={styles["quantity"]}>
      <button
        className={`${buttonStyles["button"]} ${styles["quantity-button"]}`}
        type="button"
        disabled={available <= 0}
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
        max={available}
        value={amount}
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        className={`${buttonStyles["button"]} ${styles["quantity-button"]}`}
        type="button"
        disabled={amount >= available}
        onClick={onIncrease}
      >
        <PlusIcon color="white" width={30} height={30} />
      </button>
    </div>
  );
}
