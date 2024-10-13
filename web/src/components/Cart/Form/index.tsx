import styles from "./Form.module.css";

import Item from "../Item";

import { PlantSize } from "../../PlantOverview";
import { CartItem } from "../../../App";
import { SubmitButton } from "../../Buttons";

export default function Form({ cartItems }: { cartItems: CartItem[] }) {
  const totalAmount = cartItems.reduce((acc, item) => {
    const sizes = Object.values(item).filter(
      (size) =>
        typeof size === "object" &&
        size !== null &&
        "amount" in size &&
        size.amount > 0
    ) as PlantSize[];

    return (
      acc + sizes.reduce((acc, { price, amount }) => acc + price * amount, 0)
    );
  }, 0);
  return (
    <form className={styles["form"]}>
      <ul className={styles["list"]}>
        {cartItems.map((item) => (
          <li key={item.catalogId} className={styles["item"]}>
            <Item item={item} />
          </li>
        ))}
      </ul>
      <div className={styles["grid"]}>
        <p className={styles["price"]}>Total: € {totalAmount}</p>
        <SubmitButton isDisabled={false} text="Checkout" />
      </div>
    </form>
  );
}
