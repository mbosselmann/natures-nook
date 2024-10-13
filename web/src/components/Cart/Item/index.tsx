import styles from "./Item.module.css";

import { Link } from "react-router-dom";

import QuantityInput from "../../QuantityInput";

import { PlantSize } from "../../PlantOverview";
import { CartItem } from "../../../App";

export default function Item({ item }: { item: CartItem }) {
  const sizes = Array.from(Object.values(item)).filter(
    (size): size is PlantSize =>
      typeof size === "object" &&
      size !== null &&
      "amount" in size &&
      size.amount > 0
  );

  function changeAmount(size: string, action: string, value?: string) {
    console.log(size, action, value);
  }

  return (
    <fieldset className={styles["fieldset"]}>
      <legend className={styles["legend"]}>
        <Link to={`/plant/${item.catalogId}`} className={styles["link"]}>
          {item.plantName}
        </Link>
      </legend>
      <ul>
        {sizes.map(({ size, id, height, price, amount, available }) => (
          <li className={styles["item"]} key={id}>
            <label className={styles["label"]}>
              <ul className={styles["list"]}>
                <li>{size}</li>
                <li>{height}</li>
                <li>{available} available</li>
              </ul>
            </label>
            <div>
              <QuantityInput
                onDecrease={() => changeAmount(size, "decrease")}
                onIncrease={() => changeAmount(size, "increase")}
                size={size}
                amount={amount}
                available={available}
                onChange={(value) => changeAmount(size, "change", value)}
              />
              <p className={styles["price"]}> € {price}</p>
            </div>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
