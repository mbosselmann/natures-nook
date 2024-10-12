import styles from "./Label.module.css";

import { PlantSize } from "../../../PlantOverview";

type LabelProps = Omit<PlantSize, "id" | "amount">;

export default function Label({ size, height, price, available }: LabelProps) {
  return (
    <label htmlFor={size} className={styles["label"]}>
      <span className={styles["size-name"]}>{size}</span>
      {height}
      <span>€ {price}</span>
      <span className={styles["size-available"]}>
        {available ? available + " available" : "Not available"}
      </span>
    </label>
  );
}
