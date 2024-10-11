import { PlantFormProps } from "..";
import { PlantSize } from "../../PlantOverview";
import styles from "./Label.module.css";

type LabelProps = Omit<PlantSize, "id"> & { type: PlantFormProps["type"] };

export default function Label({
  type,
  size,
  height,
  price,
  amount,
}: LabelProps) {
  return (
    <label htmlFor={size} className={styles["label"]}>
      <span className={styles["size-name"]}>{size}</span>
      {height}
      <span>€ {price}</span>
      {type === "new" && (
        <span className={styles["size-available"]}>
          {amount === 0 ? "Not available" : amount + " available"}
        </span>
      )}
    </label>
  );
}
